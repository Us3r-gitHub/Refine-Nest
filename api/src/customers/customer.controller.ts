import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Crud, CrudController } from '@nestjsx/crud';

import { CustomersService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { dto } from './requests';

@Crud({
  model: { type: Customer },
  dto,
  query: {
    alwaysPaginate: true,
    softDelete: true,
    exclude: ['id'],
    join: { category: { eager: true } },
    filter: {
      'category.name': { $notnull: true },
    },
    sort: [
      {
        field: 'updatedAt',
        order: 'DESC',
      },
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  },
  params: {
    id: { field: 'id', type: 'uuid', primary: true },
  },
})
@ApiTags('customers')
@Controller('customers')
export class CustomersController implements CrudController<Customer> {
  constructor(public service: CustomersService) {}
}
