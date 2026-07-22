import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('google')
  async googleLogin(
    @Body('idToken') idToken: string,
    @Res({ passthrough: true }) res: any,
  ) {
    const { user, accessToken } = await this.authService.googleLogin(idToken);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // true în producție (HTTPS)
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.getMe(req.user.sub);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false, // true în producție (HTTPS)
      sameSite: 'lax',
    });
    return { success: true };
  }
}
