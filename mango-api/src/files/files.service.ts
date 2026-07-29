// files/files.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import { lookup } from 'mime-types';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class FilesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) { }

    async uploadFile(
        userId: string,
        file: Express.Multer.File,
        parentId: string | null,
    ) {
        if (parentId) {
            const parent = await this.prisma.node.findUnique({ where: { id: parentId } });
            if (!parent || parent.ownerId !== userId) {
                throw new ForbiddenException('Folder destinație invalid');
            }
        }

        const mimeType =
            !file.mimetype || file.mimetype === 'application/octet-stream'
                ? lookup(file.originalname) || 'application/octet-stream'
                : file.mimetype;

        const checksum = createHash('sha256').update(file.buffer).digest('hex');
        const storageKey = `${userId}/${randomUUID()}-${file.originalname}`;

        await this.storage.uploadBuffer(storageKey, file.buffer, mimeType);

        const node = await this.prisma.$transaction(async (tx) => {
            const createdNode = await tx.node.create({
                data: {
                    type: 'FILE',
                    name: file.originalname,
                    ownerId: userId,
                    parentId,
                    mimeType,
                    sizeBytes: BigInt(file.size),
                },
            });

            await tx.fileVersion.create({
                data: {
                    nodeId: createdNode.id,
                    versionNumber: 1,
                    storageKey,
                    sizeBytes: BigInt(file.size),
                    checksum,
                    mimeType,
                    createdById: userId,
                },
            });

            return createdNode;
        });

        return {
            id: node.id,
            name: node.name,
            mimeType: node.mimeType,
            sizeBytes: node.sizeBytes.toString(),
            parentId: node.parentId,
            createdAt: node.createdAt,
        };
    }

    async getDownloadUrl(userId: string, nodeId: string) {
        const node = await this.prisma.node.findUnique({ where: { id: nodeId } });
        if (!node) throw new NotFoundException('Fișier negăsit');
        if (node.ownerId !== userId) throw new ForbiddenException('Nu ai acces la acest fișier');
        if (node.type !== 'FILE') throw new NotFoundException('Elementul nu este un fișier');

        const latestVersion = await this.prisma.fileVersion.findFirst({
            where: { nodeId },
            orderBy: { versionNumber: 'desc' },
        });
        if (!latestVersion) throw new NotFoundException('Nu există o versiune a fișierului');

        const url = await this.storage.getSignedDownloadUrl(
            latestVersion.storageKey,
            node.name,
        );

        return { url, expiresIn: 300 };
    }
}