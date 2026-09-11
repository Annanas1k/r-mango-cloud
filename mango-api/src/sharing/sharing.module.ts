// src/sharing/sharing.module.ts
import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';
import {
  ShareLinksController,
  ShareResolveController,
  PermissionsController,
} from './sharing.controller';

@Module({
  controllers: [ShareLinksController, ShareResolveController, PermissionsController],
  providers: [SharingService],
  exports: [SharingService],
})
export class SharingModule {}
