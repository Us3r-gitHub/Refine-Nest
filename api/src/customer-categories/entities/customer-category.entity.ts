import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CrudValidationGroups } from '@nestjsx/crud';
import { IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Exclude()
@Entity('customer_categories')
export class CustomerCategory {
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
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @ApiProperty()
  @Expose()
  name: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  @Expose()
  discount: string;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @Column({ type: 'text', nullable: true })
  @ApiPropertyOptional()
  @Expose()
  description?: string;

  /** RELATIONS */
  @OneToMany(() => Customer, (c) => c.category)
  @Type(() => Customer)
  @ApiProperty({ type: () => [Customer] })
  @Expose()
  customers: Customer[];
}
