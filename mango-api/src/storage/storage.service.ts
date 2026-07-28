// storage/storage.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
    private client: S3Client;
    private bucket: string;

    constructor(private readonly config: ConfigService) {
        const accountId = this.config.get<string>('R2_ACCOUNT_ID');
        this.bucket = this.config.get<string>('R2_BUCKET_NAME')!;

        // R2 e compatibil S3 - folosim același SDK, doar cu endpoint custom
        this.client = new S3Client({
            region: 'auto',
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: this.config.get<string>('R2_ACCESS_KEY_ID')!,
                secretAccessKey: this.config.get<string>('R2_SECRET_ACCESS_KEY')!,
            },
        });
    }

    async uploadBuffer(key: string, buffer: Buffer, mimeType: string) {
        await this.client.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: mimeType,
            }),
        );
        return key;
    }
}