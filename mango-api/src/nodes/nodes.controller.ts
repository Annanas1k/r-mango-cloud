/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// nodes/nodes.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateFolderDto,
  RenameNodeDto,
  MoveNodeDto,
} from './dto/nodes.dto';

@UseGuards(JwtAuthGuard)
@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) { }

  @Post('folder')
  createFolder(@Body() dto: CreateFolderDto, @Req() req: any) {
    return this.nodesService.createFolder(req.user.sub, dto.name, dto.parentId ?? null);
  }

  @Get()
  listChildren(@Query('parentId') parentId: string | undefined, @Req() req: any) {
    return this.nodesService.listChildren(req.user.sub, parentId ?? null);
  }

  @Get('starred')
  listStarred(@Req() req: any) {
    return this.nodesService.listStarred(req.user.sub);
  }

  @Get('trash')
  listTrash(@Req() req: any) {
    return this.nodesService.listTrash(req.user.sub);
  }

  @Post('trash/empty')
  emptyTrash(@Req() req: any) {
    return this.nodesService.emptyTrash(req.user.sub);
  }

  @Get('recent')
  listRecent(@Req() req: any) {
    return this.nodesService.listRecent(req.user.sub);
  }

  @Get(':id')
  getNode(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.getNode(req.user.sub, id);
  }

  @Get(':id/breadcrumb')
  getBreadcrumb(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.getBreadcrumb(req.user.sub, id);
  }

  @Patch(':id/rename')
  rename(@Param('id') id: string, @Body() dto: RenameNodeDto, @Req() req: any) {
    return this.nodesService.rename(req.user.sub, id, dto.name);
  }

  @Post(':id/touch')
  touchAccess(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.touchLastAccessed(req.user.sub, id);
  }

  @Patch(':id/move')
  move(@Param('id') id: string, @Body() dto: MoveNodeDto, @Req() req: any) {
    return this.nodesService.move(req.user.sub, id, dto.parentId ?? null);
  }

  @Post(':id/star')
  toggleStar(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.toggleStar(req.user.sub, id);
  }

  @Delete(':id')
  trash(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.trash(req.user.sub, id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.restore(req.user.sub, id);
  }

  @Delete(':id/permanent')
  deletePermanently(@Param('id') id: string, @Req() req: any) {
    return this.nodesService.deletePermanently(req.user.sub, id);
  }
}