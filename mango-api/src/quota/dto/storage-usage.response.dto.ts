// src/modules/quota/dto/storage-usage.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { StoragePlan } from 'src/generated/prisma/enums';

export class StorageUsageResponseDto {
    @ApiProperty({ type: String })
    usedBytes: string;

    @ApiProperty({ type: String })
    quotaBytes: string;

    @ApiProperty({ enum: StoragePlan })
    plan: StoragePlan;

    @ApiProperty()
    percentUsed: number;
}