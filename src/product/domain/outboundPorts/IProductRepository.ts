import { Product } from '../model/Product';

export interface IProductRepository {
  create(product: Product): Product;
  findAll(): Product[];
  findById(id: string): Product;
}

export const IProductRepository = Symbol('IProductRepository');
