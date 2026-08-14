// src/modules/quota/dto/change-plan.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StoragePlan } from 'src/generated/prisma/enums';
export class ChangePlanDto {
    @ApiProperty({ enum: StoragePlan })
    @IsEnum(StoragePlan)
    plan: StoragePlan;
}