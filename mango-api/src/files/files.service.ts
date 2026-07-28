/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// files/files.service.ts
import { Injectable } from '@nestjs/common';
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

    async uploadFile(userId: string, file: Express.Multer.File) {
        // 1. dacă clientul (curl, Postman prost configurat, etc.) nu trimite
        //    un mimetype util, îl deducem din extensia fișierului
        const mimeType =
            !file.mimetype || file.mimetype === 'application/octet-stream'
                ? lookup(file.originalname) || 'application/octet-stream'
                : file.mimetype;

        // 2. checksum, pt integritate + detectare duplicate pe viitor
        const checksum = createHash('sha256').update(file.buffer).digest('hex');

        // 3. cheie unică în bucket
        const storageKey = `${userId}/${randomUUID()}-${file.originalname}`;

        // 4. upload efectiv în R2, cu mimeType-ul corectat
        await this.storage.uploadBuffer(storageKey, file.buffer, mimeType);

        // 5. Node + FileVersion, într-o singură tranzacție
        const node = await this.prisma.$transaction(async (tx) => {
            const createdNode = await tx.node.create({
                data: {
                    type: 'FILE',
                    name: file.originalname,
                    ownerId: userId,
                    parentId: null,
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
            createdAt: node.createdAt,
        };
    }

    async listMyFiles(userId: string) {
        const nodes = await this.prisma.node.findMany({
            where: { ownerId: userId, trashedAt: null, parentId: null },
            orderBy: { createdAt: 'desc' },
        });

        return nodes.map((n) => ({
            id: n.id,
            name: n.name,
            type: n.type,
            mimeType: n.mimeType,
            sizeBytes: n.sizeBytes.toString(),
            createdAt: n.createdAt,
        }));
    }
}