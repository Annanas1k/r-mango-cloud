// src/modules/quota/quota.module.ts
import { Module } from '@nestjs/common';
import { QuotaService } from './quota.service';
import { QuotaController } from './quota.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuotaController],
  providers: [QuotaService],
  exports: [QuotaService],
})
export class QuotaModule { }