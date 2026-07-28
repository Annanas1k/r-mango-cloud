import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private resend: Resend

    constructor(private readonly config: ConfigService) {
        this.resend = new Resend(this.config.get<string>('RESEND_API_KEY'))
    }

    async sendOtpEmail(to: string, code: string) {
        await this.resend.emails.send({
            from: this.config.get<string>('RESEND_FROM_EMAIL')!,
            to,
            subject: 'rMango Cloud activation code ',
            html: `
        <div style="font-family: sans-serif; padding: 24px;">
          <h2>🥭 rMangoCloud</h2>
          <p>Your Activation Code:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px;">${code}</p>
          <p style="color: #888; font-size: 13px;">Codul expiră în 10 minute.</p>
        </div>
      `,
        });
    }
}
