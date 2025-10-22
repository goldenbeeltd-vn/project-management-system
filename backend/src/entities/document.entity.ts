import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum DocumentType {
  FILE = 'file',
  FOLDER = 'folder',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: DocumentType,
  })
  type: DocumentType;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  mimeType?: string;

  @Column({ nullable: true })
  filePath?: string;

  @Column({ nullable: true, type: 'uuid' })
  parentId?: string;

  @ManyToOne(() => Document, (document) => document.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent?: Document;

  @OneToMany(() => Document, (document) => document.parent)
  children: Document[];

  @Column({ type: 'uuid' })
  createdById: string;

  @ManyToOne(() => User, (user) => user.documents)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
