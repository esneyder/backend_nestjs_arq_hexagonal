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
import { ApiParam } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/adapters/driving/decorators/has-roles.decorator';
import { RolesGuard } from 'src/auth/adapters/driving/passport/roles.guard';
import { Role } from 'src/auth/adapters/model/role.enum';

import { ProductService } from 'src/product/domain/inboudPorts/ProductService';
import { Product } from 'src/product/domain/model/Product';
import ProductCommand from '../model/ProductCommand';
import ProductUpdateCommand from '../model/ProductoUpdateCommand';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private productService: ProductService) {}

  @HasRoles(Role.User, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @ApiParam({
    name: 'id',
    required: false,
    description: ' id producto a actualizar',
    type: String,
  })
  @HasRoles(Role.User, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @ApiParam({
    name: 'id',
    required: false,
    description: ' id producto a eliminar',
    type: String,
  })
  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id/delete')
  delete(@Param('id') id): any {
    return this.productService.delete(id);
  }

  @Get('all')
  findAll(): Product[] {
    return this.productService.findAll();
  }
}
