import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import {
  CreateDocumentDto,
  UpdateDocumentDto,
  DocumentResponseDto,
} from './dto/document.dto';
import { DocumentType, Document } from '../entities/document.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async findAll(
    @Query('parentId') parentId?: string,
    @Query('search') search?: string,
  ): Promise<DocumentResponseDto[]> {
    let documents: Document[];

    if (search) {
      documents = await this.documentsService.search(search, parentId);
    } else {
      documents = await this.documentsService.findAll(parentId);
    }

    return documents.map((doc) => this.mapToResponseDto(doc));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DocumentResponseDto> {
    const document = await this.documentsService.findOne(id);
    return this.mapToResponseDto(document);
  }

  @Post('folders')
  async createFolder(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentResponseDto> {
    const userId = '550e8400-e29b-41d4-a716-446655440000';

    const folderDto = {
      ...createDocumentDto,
      type: DocumentType.FOLDER,
    };

    const document = await this.documentsService.create(folderDto, userId);
    return this.mapToResponseDto(document);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { parentId?: string },
  ): Promise<DocumentResponseDto> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const userId = '550e8400-e29b-41d4-a716-446655440000';

    const createDocumentDto: CreateDocumentDto = {
      name: file.originalname,
      type: DocumentType.FILE,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      mimeType: file.mimetype,
      parentId: body.parentId,
    };

    const document = await this.documentsService.create(
      createDocumentDto,
      userId,
      file.filename,
    );
    return this.mapToResponseDto(document);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentResponseDto> {
    const document = await this.documentsService.update(id, updateDocumentDto);
    return this.mapToResponseDto(document);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.documentsService.remove(id);
  }

  @Get(':id/download')
  async downloadFile(@Param('id', ParseUUIDPipe) id: string) {
    const document = await this.documentsService.findOne(id);

    if (document.type !== DocumentType.FILE || !document.filePath) {
      throw new Error('Document is not a downloadable file');
    }

    return {
      filename: document.name,
      filePath: document.filePath,
    };
  }

  private mapToResponseDto(document: Document): DocumentResponseDto {
    return {
      id: document.id,
      name: document.name,
      type: document.type,
      size: document.size,
      mimeType: document.mimeType,
      parentId: document.parentId ?? undefined,
      createdBy: {
        id: document.createdBy.id,
        name: document.createdBy.name || '',
        avatar: document.createdBy.avatar ?? undefined,
      },
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
