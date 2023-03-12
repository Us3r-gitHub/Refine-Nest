import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Crud, CrudController } from '@nestjsx/crud';

import { CustomerCategoriesService } from './customer_categories.service';
import { CustomerCategory } from './entities/customer-category.entity';
import { dto } from './requests';

@Crud({
  model: { type: CustomerCategory },
  dto,
  query: {
    alwaysPaginate: true,
    softDelete: true,
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
@ApiTags('customer categories')
// @Controller('customers/categories')
@Controller('categories')
export class CustomerCategoriesController
  implements CrudController<CustomerCategory>
{
  constructor(public service: CustomerCategoriesService) {}
}
