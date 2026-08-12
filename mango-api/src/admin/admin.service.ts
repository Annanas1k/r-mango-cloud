import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) { }

    validateCredentials(login: string, password: string): boolean {
        return login === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
    }

    async getUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                provider: true,
                emailVerified: true,
                isActive: true,
                storageQuotaBytes: true,
                storageUsedBytes: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        })
    }

    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                provider: true,
                emailVerified: true,
                isActive: true,
                storageQuotaBytes: true,
                storageUsedBytes: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        if (!user) {
            throw new NotFoundException(`User cu id ${id} nu a fost găsit`)
        }

        return {
            ...user,
            storageQuotaBytes: user.storageQuotaBytes.toString(),
            storageUsedBytes: user.storageUsedBytes.toString(),
        }
    }
}