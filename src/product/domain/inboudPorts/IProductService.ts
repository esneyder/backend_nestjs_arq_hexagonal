import { Product } from '../model/Product';

export interface IProductService {
  create(
    name: string,
    sku: string,
    brand: string,
    price: number,
    stock: number,
  ): Product;
  findAll(): Product[];
  findById(id: string): Product;
  findAvailableProduct(): Product[];
}
