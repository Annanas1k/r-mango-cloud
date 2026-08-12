import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AdminSessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!req.session?.isAdmin) {
            throw new UnauthorizedException()
        }
        return true
    }
}