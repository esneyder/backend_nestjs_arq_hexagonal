import { Module } from '@nestjs/common';
import { ProductInMemory } from './adapters/driven/ProductInMemory';
import { ProductController } from './adapters/driving/product.controller';
import { ProductService } from './domain/inboudPorts/ProductService';
import { IProductRepository } from './domain/outboundPorts/IProductRepository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IProductRepository,
      useClass: ProductInMemory,
    },
  ],
})
export class ProductModule {}
