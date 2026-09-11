// src/sharing/dto/sharing.dto.ts
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PermissionRole } from '../../generated/prisma/client';

// ─── Share Link DTOs ──────────────────────────────────────────────────────────

export class CreateShareLinkDto {
  /** Rolul maxim permis prin link (default: VIEWER) */
  @IsOptional()
  @IsEnum(PermissionRole)
  role?: PermissionRole;

  /** Parola opțională pentru link (plain-text, va fi hashed pe server) */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  password?: string;

  /** Data de expirare opțională (ISO 8601) */
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

// ─── Permission DTOs ─────────────────────────────────────────────────────────

export class GrantPermissionDto {
  /** ID-ul userului căruia îi acordăm acces */
  @IsUUID()
  userId: string;

  /** Rolul acordat */
  @IsEnum(PermissionRole)
  role: PermissionRole;
}

export class UpdatePermissionDto {
  /** Noul rol */
  @IsEnum(PermissionRole)
  role: PermissionRole;
}
