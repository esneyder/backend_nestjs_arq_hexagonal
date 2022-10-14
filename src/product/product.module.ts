import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SengridCustom } from 'src/@common/services/sendgrid.service';
import { ProductInMemory } from './adapters/driven/ProductInMemory';
import { ProductController } from './adapters/driving/product.controller';
import { ProductService } from './domain/inboudPorts/ProductService';
import { IProductRepository } from './domain/outboundPorts/IProductRepository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [
    SengridCustom,

    ProductService,
    {
      provide: IProductRepository,
      useClass: ProductInMemory,
    },
  ],
})
export class ProductModule {}
