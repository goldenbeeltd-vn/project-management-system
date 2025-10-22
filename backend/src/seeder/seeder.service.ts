import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Document, DocumentType } from '../entities/document.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    // Check if data already exists
    const userCount = await this.usersRepository.count();
    if (userCount > 0) {
      return;
    }

    // Create sample users
    const users = await Promise.all([
      this.usersRepository.save({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://github.com/shadcn.png',
      }),
      this.usersRepository.save({
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://github.com/shadcn.png',
      }),
      this.usersRepository.save({
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'https://github.com/shadcn.png',
      }),
    ]);

    // Create sample folders
    const documentsFolder = await this.documentsRepository.save({
      name: 'Documents',
      type: DocumentType.FOLDER,
      createdById: users[0].id,
    });

    // Create sample files in Documents folder
    await Promise.all([
      this.documentsRepository.save({
        name: 'presentation.pptx',
        type: DocumentType.FILE,
        size: '5.2MB',
        mimeType:
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        parentId: documentsFolder.id,
        createdById: users[0].id,
      }),
      this.documentsRepository.save({
        name: 'report.pdf',
        type: DocumentType.FILE,
        size: '2.1MB',
        mimeType: 'application/pdf',
        parentId: documentsFolder.id,
        createdById: users[1].id,
      }),
      this.documentsRepository.save({
        name: 'Project Assets',
        type: DocumentType.FOLDER,
        parentId: documentsFolder.id,
        createdById: users[2].id,
      }),
    ]);

    // Create a root level file
    await this.documentsRepository.save({
      name: 'root-report.pdf',
      type: DocumentType.FILE,
      size: '2.5MB',
      mimeType: 'application/pdf',
      createdById: users[2].id,
    });

    console.log('Sample data seeded successfully');
  }
}
