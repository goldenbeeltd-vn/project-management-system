import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from '../entities/document.entity';
import { User } from '../entities/user.entity';
import { SeederService } from '../seeder/seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User])],
  controllers: [DocumentsController],
  providers: [DocumentsService, SeederService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
