import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/domain/model/Product';
import { IProductRepository } from 'src/product/domain/outboundPorts/IProductRepository';

@Injectable()
export class ProductInMemory implements IProductRepository {
  private readonly products: Product[] = [];

  delete(id: string): string {
    const index = this.products.findIndex((item) => item.id === id);
    this.products.splice(index, 1);
    return 'record deleted';
  }
  updateProduct(id: string, product: Product): Product {
    const productUpdate = this.findById(id);
    const newProduct = Object.assign(
      productUpdate,
      new Product(
        product.name,
        product.sku,
        product.brand,
        product.price,
        product.stock,
      ),
    );

    return newProduct;
  }

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }
  findAll(): Product[] {
    return this.products;
  }
  findById(id: string): Product {
    return this.products.filter((p) => p.id === id).pop();
  }
}
