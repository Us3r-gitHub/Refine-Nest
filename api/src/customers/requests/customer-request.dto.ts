import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class categoryId {
  @ApiProperty({ format: 'uuid' })
  id: string;
}

export class CreateCustomerRequestDto {
  @ApiProperty({ type: () => categoryId })
  readonly category: categoryId;

  @ApiProperty({ example: 'Customer Name' })
  readonly name: string;

  @ApiProperty({ example: 'Institution Name' })
  readonly institution: string;

  @ApiProperty({ example: '0987654321' })
  readonly hp: string;

  @ApiProperty({ example: '' })
  readonly discount: string;

  @ApiPropertyOptional({ example: 'Customer Description' })
  readonly description?: string;
}

export class UpdateCustomerRequestDto extends PartialType(
  CreateCustomerRequestDto,
) {}
