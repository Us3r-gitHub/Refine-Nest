import { Test, TestingModule } from '@nestjs/testing';

import { CustomerCategoriesController } from './customer_categories.controller';
import { CustomerCategoriesService } from './customer_categories.service';

describe('CustomerCategoriesController', () => {
  let controller: CustomerCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerCategoriesController],
      providers: [CustomerCategoriesService],
    }).compile();

    controller = module.get<CustomerCategoriesController>(
      CustomerCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
