import { DtoOptions } from '@nestjsx/crud';

import {
  CreateCustomerRequestDto,
  UpdateCustomerRequestDto,
} from './customer-request.dto';

export * from './customer-request.dto';

export const dto: DtoOptions = {
  create: CreateCustomerRequestDto,
  update: UpdateCustomerRequestDto,
  replace: UpdateCustomerRequestDto,
};
