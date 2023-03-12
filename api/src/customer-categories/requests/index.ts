import { DtoOptions } from '@nestjsx/crud';

import {
  CreateCustomerCategoryRequestDto,
  UpdateCustomerCategoryRequestDto,
} from './customer_category-request.dto';

export * from './customer_category-request.dto';

export const dto: DtoOptions = {
  create: CreateCustomerCategoryRequestDto,
  update: UpdateCustomerCategoryRequestDto,
  replace: UpdateCustomerCategoryRequestDto,
};
