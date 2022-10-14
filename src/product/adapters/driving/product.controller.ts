import { Controller, Post, Get, Logger, Body } from '@nestjs/common';
import { ProductService } from 'src/product/domain/inboudPorts/ProductService';
import { Product } from 'src/product/domain/model/Product';
import ProductCommand from '../model/ProductCommand';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private productService: ProductService) {}

  @Post('create')
  create(@Body() data: ProductCommand): Product {
    console.log('datos');
    console.log(data);
    const product = this.productService.create(
      data.name,
      data.sku,
      data.brand,
      data.price,
      data.stock,
    );
    this.logger.debug(data);
    this.logger.debug({ product });
    return product;
  }

  @Get('all')
  findAll(): any {
    return this.productService.findAll();
  }
}
