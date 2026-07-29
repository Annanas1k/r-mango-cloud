// nodes/dto/nodes.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}

export class RenameNodeDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}

export class MoveNodeDto {
    @IsOptional()
    @IsUUID()
    parentId?: string; // lipsă/null = mutare în rădăcină
}