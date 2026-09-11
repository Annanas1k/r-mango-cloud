// src/sharing/sharing.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionRole } from '../generated/prisma/client';
import { CreateShareLinkDto, GrantPermissionDto, UpdatePermissionDto } from './dto/sharing.dto';
import * as crypto from 'crypto';

@Injectable()
export class SharingService {
  constructor(private readonly prisma: PrismaService) {}

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Verifică că nodul există și că utilizatorul are cel puțin rolul `OWNER`
   * (adică este proprietarul nodului) pentru a putea gestiona sharing-ul.
   */
  private async assertOwner(nodeId: string, userId: string) {
    const node = await this.prisma.node.findUnique({ where: { id: nodeId } });
    if (!node) throw new NotFoundException('Nodul nu a fost găsit');
    if (node.ownerId !== userId)
      throw new ForbiddenException('Doar proprietarul poate gestiona accesul la acest element');
    return node;
  }

  /**
   * Hash simplu SHA-256 pentru parola link-ului de share.
   * Nu stocăm parola în clar niciodată.
   */
  private hashPassword(plain: string): string {
    return crypto.createHash('sha256').update(plain).digest('hex');
  }

  /** Generează un token URL-safe de 32 bytes */
  private generateToken(): string {
    return crypto.randomBytes(32).toString('base64url');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 1 — SHARE LINK (link public/semi-public cu token)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Creează un link de share pentru un nod.
   * Dacă există deja un link activ pentru același nod + rol, îl returnează pe cel existent.
   */
  async createShareLink(nodeId: string, userId: string, dto: CreateShareLinkDto) {
    await this.assertOwner(nodeId, userId);

    const role = dto.role ?? PermissionRole.VIEWER;
    const token = this.generateToken();
    const passwordHash = dto.password ? this.hashPassword(dto.password) : null;
    const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : null;

    if (expiresAt && expiresAt <= new Date()) {
      throw new BadRequestException('Data de expirare trebuie să fie în viitor');
    }

    const link = await this.prisma.shareLink.create({
      data: {
        nodeId,
        token,
        role,
        passwordHash,
        expiresAt,
      },
    });

    return this.serializeShareLink(link);
  }

  /** Listează toate link-urile de share ale unui nod */
  async listShareLinks(nodeId: string, userId: string) {
    await this.assertOwner(nodeId, userId);

    const links = await this.prisma.shareLink.findMany({
      where: { nodeId },
      orderBy: { createdAt: 'desc' },
    });

    return links.map((l) => this.serializeShareLink(l));
  }

  /** Revocă (șterge) un link de share */
  async revokeShareLink(nodeId: string, linkId: string, userId: string) {
    await this.assertOwner(nodeId, userId);

    const link = await this.prisma.shareLink.findUnique({ where: { id: linkId } });
    if (!link || link.nodeId !== nodeId) throw new NotFoundException('Link-ul nu a fost găsit');

    await this.prisma.shareLink.delete({ where: { id: linkId } });
    return { success: true };
  }

  /**
   * Rezolvă un token de share și returnează metadate despre nod (fără conținut).
   * Apelat de oricine (public), fără autentificare JWT.
   * Dacă link-ul are parolă, trebuie furnizată în query.
   */
  async resolveShareLink(token: string, password?: string) {
    const link = await this.prisma.shareLink.findUnique({
      where: { token },
      include: { node: { select: { id: true, type: true, name: true, mimeType: true, sizeBytes: true } } },
    });

    if (!link) throw new NotFoundException('Link-ul nu este valid sau a fost revocat');

    if (link.expiresAt && link.expiresAt < new Date()) {
      throw new BadRequestException('Link-ul a expirat');
    }

    if (link.passwordHash) {
      if (!password) throw new ForbiddenException('Acest link necesită o parolă');
      if (this.hashPassword(password) !== link.passwordHash) {
        throw new ForbiddenException('Parolă incorectă');
      }
    }

    return {
      nodeId: link.nodeId,
      role: link.role,
      expiresAt: link.expiresAt,
      node: {
        ...link.node,
        sizeBytes: link.node.sizeBytes.toString(),
      },
    };
  }

  private serializeShareLink(link: {
    id: string;
    nodeId: string;
    token: string;
    role: PermissionRole;
    passwordHash: string | null;
    expiresAt: Date | null;
    createdAt: Date;
  }) {
    return {
      id: link.id,
      nodeId: link.nodeId,
      token: link.token,
      role: link.role,
      hasPassword: !!link.passwordHash,
      expiresAt: link.expiresAt,
      createdAt: link.createdAt,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 2 — PERMISIUNI PE NOD (grant/update/revoke per user)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Acordă acces unui utilizator specific la un nod.
   * Dacă permisiunea există deja, o actualizează.
   */
  async grantPermission(nodeId: string, ownerId: string, dto: GrantPermissionDto) {
    await this.assertOwner(nodeId, ownerId);

    if (dto.userId === ownerId) {
      throw new BadRequestException('Nu poți modifica permisiunile tale proprii');
    }

    const targetUser = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!targetUser) throw new NotFoundException('Utilizatorul destinatar nu a fost găsit');

    // Verificăm dacă există deja o permisiune pentru acest user pe acest nod
    const existing = await this.prisma.permission.findFirst({
      where: { nodeId, userId: dto.userId, groupId: null },
    });

    const permission = existing
      ? await this.prisma.permission.update({
          where: { id: existing.id },
          data: { role: dto.role },
        })
      : await this.prisma.permission.create({
          data: {
            nodeId,
            userId: dto.userId,
            role: dto.role,
            subjectType: 'USER',
            inherited: false,
          },
        });

    return this.serializePermission(permission, targetUser);
  }

  /**
   * Actualizează rolul unui utilizator existent pe un nod.
   */
  async updatePermission(
    nodeId: string,
    permissionId: string,
    ownerId: string,
    dto: UpdatePermissionDto,
  ) {
    await this.assertOwner(nodeId, ownerId);

    const existing = await this.prisma.permission.findUnique({ where: { id: permissionId } });
    if (!existing || existing.nodeId !== nodeId) {
      throw new NotFoundException('Permisiunea nu a fost găsită');
    }

    const updated = await this.prisma.permission.update({
      where: { id: permissionId },
      data: { role: dto.role },
      include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
    });

    return this.serializePermission(updated, updated.user!);
  }

  /**
   * Revocă accesul unui utilizator la un nod.
   */
  async revokePermission(nodeId: string, permissionId: string, ownerId: string) {
    await this.assertOwner(nodeId, ownerId);

    const existing = await this.prisma.permission.findUnique({ where: { id: permissionId } });
    if (!existing || existing.nodeId !== nodeId) {
      throw new NotFoundException('Permisiunea nu a fost găsită');
    }

    await this.prisma.permission.delete({ where: { id: permissionId } });
    return { success: true };
  }

  /**
   * Listează toate permisiunile explicite ale unui nod (useri cu acces).
   */
  async listPermissions(nodeId: string, userId: string) {
    await this.assertOwner(nodeId, userId);

    const permissions = await this.prisma.permission.findMany({
      where: { nodeId, subjectType: 'USER' },
      include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
      orderBy: { createdAt: 'asc' },
    });

    return permissions.map((p) => this.serializePermission(p, p.user!));
  }

  private serializePermission(
    p: { id: string; nodeId: string; role: PermissionRole; inherited: boolean; createdAt: Date },
    user: { id: string; name: string; email: string; avatarUrl: string | null },
  ) {
    return {
      id: p.id,
      nodeId: p.nodeId,
      role: p.role,
      inherited: p.inherited,
      createdAt: p.createdAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
