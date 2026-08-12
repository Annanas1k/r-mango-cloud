import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { AdminService } from './admin.service'
import { AdminSessionGuard } from './admin-session.guard'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('auth/login')
  login(@Body() body: { email: string; password: string }, @Req() req: Request) {
    if (!this.adminService.validateCredentials(body.email, body.password)) {
      throw new UnauthorizedException('Credențiale invalide')
    }
    if (!req.session) {
      throw new UnauthorizedException('Sesiune invalidă')
    }
    req.session.isAdmin = true
    return { success: true }
  }

  @Post('auth/logout')
  logout(@Req() req: Request) {
    req.session = null
    return { success: true }
  }

  @Get('auth/me')
  me(@Req() req: Request) {
    return { isAdmin: !!req.session?.isAdmin }
  }

  @UseGuards(AdminSessionGuard)
  @Get('users')
  getUsers() {
    // aici vei conecta la tabelele existente
    return []
  }
}