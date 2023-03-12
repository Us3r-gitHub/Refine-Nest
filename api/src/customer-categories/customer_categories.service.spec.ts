import { Test, TestingModule } from '@nestjs/testing';

import { CustomerCategoriesService } from './customer_categories.service';

describe('CustomerCategoriesService', () => {
  let service: CustomerCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerCategoriesService],
    }).compile();

    service = module.get<CustomerCategoriesService>(CustomerCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
