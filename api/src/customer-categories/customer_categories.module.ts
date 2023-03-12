import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerCategory } from './entities/customer-category.entity';
import { CustomerCategoriesController } from './customer_categories.controller';
import { CustomerCategoriesService } from './customer_categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerCategory])],
  providers: [CustomerCategoriesService],
  exports: [CustomerCategoriesService],
  controllers: [CustomerCategoriesController],
})
export class CustomerCategoriesModule {}
