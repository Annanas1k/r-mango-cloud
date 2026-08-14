// src/modules/nodes/nodes.module.ts
import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { StorageModule } from 'src/storage/storage.module';
import { QuotaModule } from 'src/quota/quota.module';

@Module({
  imports: [StorageModule, QuotaModule],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService],
})
export class NodesModule { }