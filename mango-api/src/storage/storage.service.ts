// storage/storage.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
    private client: S3Client;
    private bucket: string;

    constructor(private readonly config: ConfigService) {
        const accountId = this.config.get<string>('R2_ACCOUNT_ID');
        this.bucket = this.config.get<string>('R2_BUCKET_NAME')!;

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

    /** Generează un URL temporar (implicit 5 minute) pt download direct din R2 */
    async getSignedDownloadUrl(key: string, fileName: string, expiresInSeconds = 300) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ResponseContentDisposition: `attachment; filename="${encodeURIComponent(fileName)}"`,
        });
        return getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
    }

    async deleteObject(key: string) {
        await this.client.send(
            new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
        );
    }

    /** Ștergere în masă - utilă la golirea coșului de gunoi / ștergere permanentă de foldere */
    async deleteObjects(keys: string[]) {
        if (keys.length === 0) return;
        // R2/S3 acceptă maxim 1000 de chei per request
        const chunks: string[][] = [];
        for (let i = 0; i < keys.length; i += 1000) {
            chunks.push(keys.slice(i, i + 1000));
        }
        for (const chunk of chunks) {
            await this.client.send(
                new DeleteObjectsCommand({
                    Bucket: this.bucket,
                    Delete: { Objects: chunk.map((Key) => ({ Key })) },
                }),
            );
        }
    }
}