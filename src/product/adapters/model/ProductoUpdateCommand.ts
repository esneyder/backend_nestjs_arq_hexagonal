import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class ProductUpdateCommand {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: `name product`,
    example: 'dron dji fpv',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'sku',
    type: 'string',
    description: `sku product`,
    example: 'abd001',
  })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({
    name: 'brand',
    type: 'string',
    description: `brand name product`,
    example: 'Dji',
  })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({
    name: 'price',
    type: 'number',
    description: `price usd product`,
    example: '2300',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    name: 'stock',
    type: 'number',
    description: `stock  product`,
    example: '10',
  })
  @IsNumber()
  stock: number;
}
