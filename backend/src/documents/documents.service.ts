import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentType } from '../entities/document.entity';
import { User } from '../entities/user.entity';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(parentId?: string): Promise<Document[]> {
    const queryBuilder = this.documentsRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.createdBy', 'user')
      .orderBy('document.createdAt', 'DESC');

    if (parentId) {
      queryBuilder.where('document.parentId = :parentId', { parentId });
    } else {
      queryBuilder.where('document.parentId IS NULL');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: ['createdBy', 'children'],
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async create(
    createDocumentDto: CreateDocumentDto,
    userId: string,
    filePath?: string,
  ): Promise<Document> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (createDocumentDto.parentId) {
      const parent = await this.documentsRepository.findOne({
        where: { id: createDocumentDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          `Parent folder with ID ${createDocumentDto.parentId} not found`,
        );
      }
      if (parent.type !== DocumentType.FOLDER) {
        throw new Error('Parent must be a folder');
      }
    }

    const document = this.documentsRepository.create({
      ...createDocumentDto,
      createdById: userId,
      filePath,
    });

    const savedDocument = await this.documentsRepository.save(document);

    // Return document with relations
    const documentWithRelations = await this.documentsRepository.findOne({
      where: { id: savedDocument.id },
      relations: ['createdBy'],
    });

    if (!documentWithRelations) {
      throw new NotFoundException('Document not found after creation');
    }

    return documentWithRelations;
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.findOne(id);

    if (updateDocumentDto.parentId) {
      const parent = await this.documentsRepository.findOne({
        where: { id: updateDocumentDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          `Parent folder with ID ${updateDocumentDto.parentId} not found`,
        );
      }
      if (parent.type !== DocumentType.FOLDER) {
        throw new Error('Parent must be a folder');
      }
    }

    Object.assign(document, updateDocumentDto);
    document.updatedAt = new Date();

    await this.documentsRepository.save(document);

    // Return updated document with relations
    const updatedDocument = await this.documentsRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!updatedDocument) {
      throw new NotFoundException('Document not found after update');
    }

    return updatedDocument;
  }

  async remove(id: string): Promise<void> {
    const document = await this.findOne(id);

    // If it's a folder, delete all children first
    if (document.type === DocumentType.FOLDER) {
      const children = await this.documentsRepository.find({
        where: { parentId: id },
      });

      for (const child of children) {
        await this.remove(child.id);
      }
    }

    await this.documentsRepository.remove(document);
  }

  async search(searchTerm: string, parentId?: string): Promise<Document[]> {
    const queryBuilder = this.documentsRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.createdBy', 'user')
      .where('document.name LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });

    if (parentId) {
      queryBuilder.andWhere('document.parentId = :parentId', { parentId });
    } else {
      queryBuilder.andWhere('document.parentId IS NULL');
    }

    return queryBuilder.orderBy('document.createdAt', 'DESC').getMany();
  }
}
