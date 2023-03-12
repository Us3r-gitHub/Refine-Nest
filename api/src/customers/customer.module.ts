import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { CustomersController } from './customer.controller';
import { CustomersService } from './customer.service';
import { CustomerCategoriesModule } from '../customer-categories';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CustomerCategoriesModule],
  providers: [CustomersService],
  exports: [CustomersService, CustomerCategoriesModule],
  controllers: [CustomersController],
})
export class CustomersModule {}
