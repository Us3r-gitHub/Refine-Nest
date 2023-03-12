import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService extends TypeOrmCrudService<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {
    super(customersRepository);
  }

  async getBy(
    where: FindOptionsWhere<Customer>,
  ): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findOneBy(where);
    if (customer) return customer;

    const key = Object.keys(where)[0];
    throw new HttpException(
      `Customer with this ${key} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
