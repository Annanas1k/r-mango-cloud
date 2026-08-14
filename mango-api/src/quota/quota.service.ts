/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/quota/quota.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StoragePlan } from '../generated/prisma/client';
import { getQuotaForPlan } from './config/storage-plans.config';
import { QuotaExceededException } from './exceptions/quota-exceeded.exception';
import { StorageUsageResponseDto } from './dto/storage-usage.response.dto';

@Injectable()
export class QuotaService {
    constructor(private readonly prisma: PrismaService) { }

    async reserveSpace(userId: string, fileSizeBytes: bigint): Promise<void> {
        const result = await this.prisma.$executeRaw`
      UPDATE "User"
      SET "storageUsedBytes" = "storageUsedBytes" + ${fileSizeBytes}
      WHERE id = ${userId}
        AND "storageUsedBytes" + ${fileSizeBytes} <= "storageQuotaBytes"
    `;

        if (result === 0) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { storageUsedBytes: true, storageQuotaBytes: true },
            });
            if (!user) throw new NotFoundException('User not found');

            const available = user.storageQuotaBytes - user.storageUsedBytes;
            throw new QuotaExceededException(available, fileSizeBytes);
        }
    }

    async releaseSpace(userId: string, bytes: bigint): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { storageUsedBytes: { decrement: bytes } },
        });

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { storageUsedBytes: true },
        });
        if (user && user.storageUsedBytes < 0n) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { storageUsedBytes: 0n },
            });
        }
    }

    async freeSpace(userId: string, bytes: bigint): Promise<void> {
        return this.releaseSpace(userId, bytes);
    }

    async getUsageSummary(userId: string): Promise<StorageUsageResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { storageUsedBytes: true, storageQuotaBytes: true, storagePlan: true },
        });
        if (!user) throw new NotFoundException('User not found');

        const percentUsed =
            user.storageQuotaBytes === 0n
                ? 0
                : Number((user.storageUsedBytes * 10000n) / user.storageQuotaBytes) / 100;

        return {
            usedBytes: user.storageUsedBytes.toString(),
            quotaBytes: user.storageQuotaBytes.toString(),
            plan: user.storagePlan,
            percentUsed,
        };
    }

    async changePlan(userId: string, newPlan: StoragePlan): Promise<StorageUsageResponseDto> {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                storagePlan: newPlan,
                storageQuotaBytes: getQuotaForPlan(newPlan),
            },
        });
        return this.getUsageSummary(userId);
    }

    async reconcileUsage(userId: string): Promise<void> {
        const result = await this.prisma.node.aggregate({
            where: { ownerId: userId, type: 'FILE', trashedAt: null },
            _sum: { sizeBytes: true },
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: { storageUsedBytes: BigInt(result._sum?.sizeBytes ?? 0) },
        });
    }
}