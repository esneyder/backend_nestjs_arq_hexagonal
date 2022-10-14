import { Product } from '../model/Product';

export interface IProductRepository {
  create(product: Product): Product;
  findAll(): Product[];
  findById(id: string): Product;
  updateProduct(id: string, product: Product): Product;
  delete(id: string): string;
}

export const IProductRepository = Symbol('IProductRepository');
