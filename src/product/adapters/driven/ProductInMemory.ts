import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/domain/model/Product';
import { IProductRepository } from 'src/product/domain/outboundPorts/IProductRepository';

@Injectable()
export class ProductInMemory implements IProductRepository {
  private readonly products: Product[] = [];

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }
  findAll(): Product[] {
    return this.products;
  }
  findById(id: string): Product {
    throw new Error('Method not implemented.');
  }
}
