import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CrudValidationGroups } from '@nestjsx/crud';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerCategory } from 'src/customer-categories/entities/customer-category.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Exclude()
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Exclude()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt?: Date;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  @Expose()
  name: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  @Expose()
  institution: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumberString({ no_symbols: true }, { always: true })
  @MaxLength(16, { always: true })
  @Column({ type: 'varchar', length: 16, nullable: false })
  @ApiProperty()
  @Expose()
  hp: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiPropertyOptional()
  @Expose()
  discount?: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @Column({ type: 'text', nullable: true })
  @ApiPropertyOptional()
  @Expose()
  description?: string;

  /** RELATIONS */
  @ManyToOne(() => CustomerCategory, (cc) => cc.customers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => CustomerCategory })
  @Expose()
  category: CustomerCategory;
}
