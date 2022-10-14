import {
  Controller,
  Post,
  Get,
  Logger,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from 'src/product/domain/inboudPorts/ProductService';
import { Product } from 'src/product/domain/model/Product';
import ProductCommand from '../model/ProductCommand';
import ProductUpdateCommand from '../model/ProductoUpdateCommand';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private productService: ProductService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() data: ProductCommand): Product {
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/update')
  updateProduct(@Param('id') id, @Body() data: ProductUpdateCommand): Product {
    const product = this.productService.updateProduct(
      id,
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

  @Delete(':id/delete')
  delete(@Param('id') id): any {
    return this.productService.delete(id);
  }

  @Get('all')
  findAll(): any {
    return this.productService.findAll();
  }
}
