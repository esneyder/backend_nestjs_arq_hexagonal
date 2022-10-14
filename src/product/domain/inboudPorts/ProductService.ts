import { IProductService } from './IProductService';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../outboundPorts/IProductRepository';
import { Product } from '../model/Product';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  findAvailableProduct(): Product[] {
    return this.productRepository
      .findAll()
      .filter((product) => !product.isClosed);
  }

  create(
    name: string,
    sku: string,
    brand: string,
    price: number,
    stock: number,
  ): Product {
    const product = new Product(name, sku, brand, price, stock);
    if (this.findAvailableProduct().length >= 3) {
      throw new Error('product already exists');
    }
    this.productRepository.create(product);
    return product;
  }

  findAll(): Product[] {
    return this.productRepository.findAll();
  }
  findById(id: string): Product {
    return this.productRepository.findById(id);
  }
}
