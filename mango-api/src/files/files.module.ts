import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { StorageModule } from '../storage/storage.module';
import { QuotaModule } from 'src/quota/quota.module';

@Module({
  imports: [StorageModule, QuotaModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }
