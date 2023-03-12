import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateCustomerCategoryRequestDto {
  @ApiProperty({ example: 'Customer Category Name' })
  readonly name: string;

  @ApiProperty({ example: '10%' })
  readonly discount: string;

  @ApiPropertyOptional({ example: 'Customer Category Description' })
  readonly description?: string;
}

export class UpdateCustomerCategoryRequestDto extends PartialType(
  CreateCustomerCategoryRequestDto,
) {}
