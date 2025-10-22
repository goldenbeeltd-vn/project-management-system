import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { DocumentType } from '../../entities/document.entity';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class DocumentResponseDto {
  id: string;
  name: string;
  type: DocumentType;
  size?: string;
  mimeType?: string;
  parentId?: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
