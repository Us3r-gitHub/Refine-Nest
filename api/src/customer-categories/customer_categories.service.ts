import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { CustomerCategory } from './entities/customer-category.entity';

@Injectable()
export class CustomerCategoriesService extends TypeOrmCrudService<CustomerCategory> {
  constructor(
    @InjectRepository(CustomerCategory)
    private readonly customerCategoriesRepository: Repository<CustomerCategory>,
  ) {
    super(customerCategoriesRepository);
  }

  async getBy(
    where: FindOptionsWhere<CustomerCategory>,
  ): Promise<CustomerCategory | undefined> {
    const customerCategory = await this.customerCategoriesRepository.findOneBy(
      where,
    );
    if (customerCategory) return customerCategory;

    const key = Object.keys(where)[0];
    throw new HttpException(
      `Customer Category with this ${key} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
