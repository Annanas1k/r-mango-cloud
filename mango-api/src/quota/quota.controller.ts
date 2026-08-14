// src/quota/quota.controller.ts
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuotaService } from './quota.service';
import { StorageUsageResponseDto } from './dto/storage-usage.response.dto';
import { ChangePlanDto } from './dto/change-plan.dto';

@ApiTags('quota')
@UseGuards(JwtAuthGuard)
@Controller('quota')
export class QuotaController {
  constructor(private readonly quotaService: QuotaService) { }

  @Get('usage')
  @ApiOperation({ summary: 'Returnează folosirea curentă de spațiu a userului' })
  @ApiResponse({ status: 200, type: StorageUsageResponseDto })
  getUsage(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return this.quotaService.getUsageSummary(req.user.sub);
  }

  @Patch('plan')
  @ApiOperation({ summary: 'Schimbă planul de storage al userului' })
  @ApiResponse({ status: 200, type: StorageUsageResponseDto })
  changePlan(@Req() req: any, @Body() dto: ChangePlanDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return this.quotaService.changePlan(req.user.sub, dto.plan);
  }
}