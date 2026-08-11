/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// nodes/nodes.service.ts
import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class NodesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) { }

    // ---------------------------------------------------------------------
    // Helper: verifică că node-ul există, aparține userului, și nu e în trash
    // ---------------------------------------------------------------------
    private async getOwnedNode(nodeId: string, userId: string) {
        const node = await this.prisma.node.findUnique({ where: { id: nodeId } });
        if (!node) throw new NotFoundException('Element negăsit');
        if (node.ownerId !== userId) throw new ForbiddenException('Nu ai acces la acest element');
        return node;
    }

    private serialize(node: {
        id: string;
        type: string;
        name: string;
        parentId: string | null;
        mimeType: string | null;
        sizeBytes: bigint;
        trashedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    },
        isStarred = false) {
        return {
            id: node.id,
            type: node.type,
            name: node.name,
            parentId: node.parentId,
            mimeType: node.mimeType,
            sizeBytes: node.sizeBytes.toString(),
            trashedAt: node.trashedAt,
            createdAt: node.createdAt,
            updatedAt: node.updatedAt,
            isStarred
        };
    }

    // ---------------------------------------------------------------------
    // FOLDERE
    // ---------------------------------------------------------------------
    async createFolder(userId: string, name: string, parentId: string | null) {
        if (parentId) {
            await this.getOwnedNode(parentId, userId); // validează că folderul părinte există și e al userului
        }

        try {
            const folder = await this.prisma.node.create({
                data: { type: 'FOLDER', name, ownerId: userId, parentId },
            });
            return this.serialize(folder);
        } catch (err: any) {
            if (err.code === 'P2002') {
                throw new ConflictException('Există deja un element cu acest nume în acest folder');
            }
            throw err;
        }
    }

    // ---------------------------------------------------------------------
    // LISTARE — conținutul unui folder (sau al rădăcinii, dacă parentId e null)
    // ---------------------------------------------------------------------
    private async getStarredIdsSet(userId: string, nodeIds: string[]): Promise<Set<string>> {
        if (nodeIds.length === 0) return new Set();

        const stars = await this.prisma.star.findMany({
            where: { userId, nodeId: { in: nodeIds } },
            select: { nodeId: true },
        });

        return new Set(stars.map((s) => s.nodeId));
    }
    async listChildren(userId: string, parentId: string | null) {
        if (parentId) {
            await this.getOwnedNode(parentId, userId);
        }

        const nodes = await this.prisma.node.findMany({
            where: { ownerId: userId, parentId, trashedAt: null },
            orderBy: [{ type: 'asc' }, { name: 'asc' }], // foldere înainte de fișiere, apoi alfabetic
        });
        const starredIds = await this.getStarredIdsSet(
            userId,
            nodes.map((n) => n.id),
        );

        return nodes.map((n) => this.serialize(n, starredIds.has(n.id)));
    }

    // ---------------------------------------------------------------------
    // BREADCRUMB — drumul de la rădăcină până la node-ul curent
    // ---------------------------------------------------------------------
    async getBreadcrumb(userId: string, nodeId: string) {
        const path: { id: string; name: string }[] = [];
        let current = await this.getOwnedNode(nodeId, userId);
        path.unshift({ id: current.id, name: current.name });

        while (current.parentId) {
            current = await this.getOwnedNode(current.parentId, userId);
            path.unshift({ id: current.id, name: current.name });
        }

        return path;
    }

    async getNode(userId: string, nodeId: string) {
        const node = await this.getOwnedNode(nodeId, userId);
        const existing = await this.prisma.star.findFirst({
            where: { nodeId, userId },
        });
        return this.serialize(node, !!existing);
    }

    // ---------------------------------------------------------------------
    // REDENUMIRE
    // ---------------------------------------------------------------------
    async rename(userId: string, nodeId: string, newName: string) {
        await this.getOwnedNode(nodeId, userId);
        try {
            const updated = await this.prisma.node.update({
                where: { id: nodeId },
                data: { name: newName },
            });
            return this.serialize(updated);
        } catch (err: any) {
            if (err.code === 'P2002') {
                throw new ConflictException('Există deja un element cu acest nume în acest folder');
            }
            throw err;
        }
    }

    // ---------------------------------------------------------------------
    // MUTARE
    // ---------------------------------------------------------------------
    async move(userId: string, nodeId: string, newParentId: string | null) {
        const node = await this.getOwnedNode(nodeId, userId);

        if (newParentId) {
            await this.getOwnedNode(newParentId, userId);
            if (newParentId === nodeId) {
                throw new ConflictException('Un folder nu poate fi mutat în el însuși');
            }
            // previne mutarea unui folder în interiorul propriului subfolder
            if (node.type === 'FOLDER') {
                const descendants = await this.collectDescendantIds(nodeId);
                if (descendants.includes(newParentId)) {
                    throw new ConflictException('Nu poți muta un folder într-un subfolder al lui');
                }
            }
        }

        try {
            const updated = await this.prisma.node.update({
                where: { id: nodeId },
                data: { parentId: newParentId },
            });
            return this.serialize(updated);
        } catch (err: any) {
            if (err.code === 'P2002') {
                throw new ConflictException('Există deja un element cu acest nume în folderul destinație');
            }
            throw err;
        }
    }

    // ---------------------------------------------------------------------
    // STAR / FAVORITE (toggle)
    // ---------------------------------------------------------------------
    async toggleStar(userId: string, nodeId: string) {
        await this.getOwnedNode(nodeId, userId);

        const existing = await this.prisma.star.findFirst({
            where: { nodeId, userId },
        });

        if (existing) {
            await this.prisma.star.delete({ where: { id: existing.id } });
            return { starred: false };
        }

        await this.prisma.star.create({ data: { nodeId, userId } });
        return { starred: true };
    }

    async listStarred(userId: string) {
        const stars = await this.prisma.star.findMany({
            where: { userId },
            include: { node: true },
            orderBy: { id: 'desc' },
        });
        return stars
            .filter((s) => !s.node.trashedAt)
            .map((s) => this.serialize(s.node, true));
    }

    // ---------------------------------------------------------------------
    // TRASH — mutare în coș (soft delete, recursiv pt foldere)
    // ---------------------------------------------------------------------
    private async collectDescendantIds(nodeId: string): Promise<string[]> {
        const result: string[] = [];
        let queue = [nodeId];

        while (queue.length > 0) {
            const children = await this.prisma.node.findMany({
                where: { parentId: { in: queue } },
                select: { id: true },
            });
            const childIds = children.map((c) => c.id);
            result.push(...childIds);
            queue = childIds;
        }

        return result;
    }

    async trash(userId: string, nodeId: string) {
        const node = await this.getOwnedNode(nodeId, userId);
        const descendantIds =
            node.type === 'FOLDER' ? await this.collectDescendantIds(nodeId) : [];

        await this.prisma.node.updateMany({
            where: { id: { in: [nodeId, ...descendantIds] } },
            data: { trashedAt: new Date(), trashedById: userId },
        });

        return { success: true, trashedCount: descendantIds.length + 1 };
    }

    async listTrash(userId: string) {
        // afișăm doar elementele "de top" din trash (al căror părinte NU e și el trashed),
        // ca să nu vezi duplicat un folder + tot conținutul lui
        const trashed = await this.prisma.node.findMany({
            where: { ownerId: userId, trashedAt: { not: null } },
            orderBy: { trashedAt: 'desc' },
        });

        const trashedIds = new Set(trashed.map((n) => n.id));
        const topLevel = trashed.filter(
            (n) => !n.parentId || !trashedIds.has(n.parentId),
        );

        return topLevel.map((n) => this.serialize(n));
    }

    async restore(userId: string, nodeId: string) {
        const node = await this.getOwnedNode(nodeId, userId);
        const descendantIds =
            node.type === 'FOLDER' ? await this.collectDescendantIds(nodeId) : [];

        await this.prisma.node.updateMany({
            where: { id: { in: [nodeId, ...descendantIds] } },
            data: { trashedAt: null, trashedById: null },
        });

        return { success: true };
    }

    // ---------------------------------------------------------------------
    // ȘTERGERE PERMANENTĂ — elimină și obiectele din R2
    // ---------------------------------------------------------------------
    async deletePermanently(userId: string, nodeId: string) {
        const node = await this.getOwnedNode(nodeId, userId);
        const descendantIds =
            node.type === 'FOLDER' ? await this.collectDescendantIds(nodeId) : [];
        const allIds = [nodeId, ...descendantIds];

        // colectăm toate storageKey-urile fișierelor (din toate versiunile) care vor fi șterse
        const versions = await this.prisma.fileVersion.findMany({
            where: { nodeId: { in: allIds } },
            select: { storageKey: true },
        });

        if (versions.length > 0) {
            await this.storage.deleteObjects(versions.map((v) => v.storageKey));
        }

        // ștergerea node-ului rădăcină cascadează automat spre copii + FileVersion,
        // datorită onDelete: Cascade din schema Prisma
        await this.prisma.node.delete({ where: { id: nodeId } });

        return { success: true, deletedCount: allIds.length };
    }

    async emptyTrash(userId: string) {
        const trashed = await this.prisma.node.findMany({
            where: { ownerId: userId, trashedAt: { not: null } },
            select: { id: true },
        });

        const versions = await this.prisma.fileVersion.findMany({
            where: { nodeId: { in: trashed.map((n) => n.id) } },
            select: { storageKey: true },
        });

        if (versions.length > 0) {
            await this.storage.deleteObjects(versions.map((v) => v.storageKey));
        }

        await this.prisma.node.deleteMany({
            where: { ownerId: userId, trashedAt: { not: null } },
        });

        return { success: true, deletedCount: trashed.length };
    }
}