import { Injectable } from '@nestjs/common'

@Injectable()
export class AdminService {
    validateCredentials(email: string, password: string): boolean {
        return email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
    }
}