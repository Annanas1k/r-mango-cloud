/* eslint-disable @typescript-eslint/no-unsafe-argument */
// src/sharing/sharing.controller.ts
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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SharingService } from './sharing.service';
import {
  CreateShareLinkDto,
  GrantPermissionDto,
  UpdatePermissionDto,
} from './dto/sharing.dto';

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT 1 — Share Links  (publice, cu token)
// Rute: /api/nodes/:nodeId/share-links
// ─────────────────────────────────────────────────────────────────────────────
@ApiTags('Share Links')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('nodes/:nodeId/share-links')
export class ShareLinksController {
  constructor(private readonly sharingService: SharingService) { }

  @Post()
  @ApiOperation({ summary: 'Creează un link de share pentru un nod' })
  createShareLink(
    @Param('nodeId') nodeId: string,
    @Body() dto: CreateShareLinkDto,
    @Req() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.createShareLink(nodeId, req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listează toate link-urile de share ale nodului' })
  listShareLinks(@Param('nodeId') nodeId: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.listShareLinks(nodeId, req.user.sub);
  }

  @Delete(':linkId')
  @ApiOperation({ summary: 'Revocă (șterge) un link de share' })
  revokeShareLink(
    @Param('nodeId') nodeId: string,
    @Param('linkId') linkId: string,
    @Req() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.revokeShareLink(nodeId, linkId, req.user.sub);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT 1 — Rezolvare token (public, fără auth)
// Rute: /api/share/:token
// ─────────────────────────────────────────────────────────────────────────────
@ApiTags('Share Links')
@Controller('share')
export class ShareResolveController {
  constructor(private readonly sharingService: SharingService) { }

  @Get(':token')
  @ApiOperation({ summary: 'Rezolvă un token de share și returnează metadate nod (rută publică)' })
  @ApiQuery({ name: 'password', required: false, description: 'Parola link-ului dacă este protejat' })
  resolveShareLink(
    @Param('token') token: string,
    @Query('password') password?: string,
  ) {
    return this.sharingService.resolveShareLink(token, password);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT 2 — Permisiuni per utilizator pe nod
// Rute: /api/nodes/:nodeId/permissions
// ─────────────────────────────────────────────────────────────────────────────
@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('nodes/:nodeId/permissions')
export class PermissionsController {
  constructor(private readonly sharingService: SharingService) { }

  @Post()
  @ApiOperation({ summary: 'Acordă acces unui utilizator la un nod (sau actualizează dacă există)' })
  grantPermission(
    @Param('nodeId') nodeId: string,
    @Body() dto: GrantPermissionDto,
    @Req() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.grantPermission(nodeId, req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listează toți utilizatorii cu acces explicit la nod' })
  listPermissions(@Param('nodeId') nodeId: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.listPermissions(nodeId, req.user.sub);
  }

  @Patch(':permissionId')
  @ApiOperation({ summary: 'Actualizează rolul unui utilizator pe nod (VIEWER/COMMENTER/EDITOR)' })
  updatePermission(
    @Param('nodeId') nodeId: string,
    @Param('permissionId') permissionId: string,
    @Body() dto: UpdatePermissionDto,
    @Req() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.updatePermission(nodeId, permissionId, req.user.sub, dto);
  }

  @Delete(':permissionId')
  @ApiOperation({ summary: 'Revocă accesul unui utilizator la nod' })
  revokePermission(
    @Param('nodeId') nodeId: string,
    @Param('permissionId') permissionId: string,
    @Req() req: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.sharingService.revokePermission(nodeId, permissionId, req.user.sub);
  }
}
