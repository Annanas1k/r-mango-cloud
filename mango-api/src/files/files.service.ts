// files/files.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import { lookup } from 'mime-types';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { QuotaService } from '../quota/quota.service'; // NOU

@Injectable()
export class FilesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
        private readonly quota: QuotaService, // NOU
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

        const fileSize = BigInt(file.size);

        // NOU: verifică ȘI rezervă spațiul ATOMIC, ÎNAINTE de orice upload către R2
        await this.quota.reserveSpace(userId, fileSize);

        const mimeType =
            !file.mimetype || file.mimetype === 'application/octet-stream'
                ? lookup(file.originalname) || 'application/octet-stream'
                : file.mimetype;

        const checksum = createHash('sha256').update(file.buffer).digest('hex');
        const storageKey = `${userId}/${randomUUID()}-${file.originalname}`;

        try {
            await this.storage.uploadBuffer(storageKey, file.buffer, mimeType);

            const node = await this.prisma.$transaction(async (tx) => {
                const createdNode = await tx.node.create({
                    data: {
                        type: 'FILE',
                        name: file.originalname,
                        ownerId: userId,
                        parentId,
                        mimeType,
                        sizeBytes: fileSize,
                    },
                });

                await tx.fileVersion.create({
                    data: {
                        nodeId: createdNode.id,
                        versionNumber: 1,
                        storageKey,
                        sizeBytes: fileSize,
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
        } catch (error) {
            // NOU: rollback pe cotă dacă upload-ul R2 sau tranzacția DB eșuează
            await this.quota.releaseSpace(userId, fileSize);

            // dacă upload-ul R2 a reușit dar tranzacția DB a eșuat, mai rămâne
            // un obiect orfan în bucket — încearcă să-l cureți și pe ăla
            await this.storage.deleteObject(storageKey).catch(() => {
                // ignorăm eroarea de cleanup, ca să nu mascheze eroarea originală
            });

            throw error;
        }
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
        this.prisma.node.update({
            where: { id: nodeId },
            data: { lastAccessedAt: new Date() },
        }).catch(() => { });
        const url = await this.storage.getSignedDownloadUrl(
            latestVersion.storageKey,
            node.name,
        );

        return { url, expiresIn: 300 };
    }
}