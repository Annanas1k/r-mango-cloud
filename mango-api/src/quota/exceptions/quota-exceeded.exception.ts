// src/modules/quota/exceptions/quota-exceeded.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class QuotaExceededException extends HttpException {
    constructor(availableBytes: bigint, requestedBytes: bigint) {
        super(
            {
                message: 'Storage quota exceeded',
                availableBytes: availableBytes.toString(),
                requestedBytes: requestedBytes.toString(),
            },
            HttpStatus.PAYLOAD_TOO_LARGE,
        );
    }
}