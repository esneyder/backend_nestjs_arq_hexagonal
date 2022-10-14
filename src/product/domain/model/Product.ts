import { randomUUID } from 'crypto';

export class Product {
  id: string;
  name: string;
  sku: string;
  brand: string;
  price: number;
  status: ProductStatus;
  createAt: Date;
  updateAt: Date;
  stock: number;
  constructor(
    name: string,
    sku: string,
    brand: string,
    price: number,
    stock: number,
  ) {
    this.id = randomUUID();
    this.name = name;
    this.brand = brand;
    this.sku = sku;
    this.price = price;
    this.stock = stock;
    this.status = ProductStatus.AVAILABLE;
    this.createAt = new Date();
    this.updateAt = new Date();
    this.stock = stock;
  }

  isClosed(): boolean {
    return this.status === ProductStatus.NOT_AVAILABLE;
  }
}

enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  EXHAUSTED = 'EXHAUSTED',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
}
