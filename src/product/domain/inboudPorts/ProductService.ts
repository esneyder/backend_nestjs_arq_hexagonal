import { IProductService } from './IProductService';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from '../outboundPorts/IProductRepository';
import { Product } from '../model/Product';
import {
  SengridCustom,
  Templates,
} from 'src/@common/services/sendgrid.service';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    private sendgridService: SengridCustom,
  ) {}
  delete(id: string): string {
    const existProduct = this.productRepository.findById(id);
    if (existProduct == null) {
      throw new NotFoundException('record id does not exist');
    }
    return this.productRepository.delete(id);
  }
  updateProduct(
    id: string,
    name: string,
    sku: string,
    brand: string,
    price: number,
    stock: number,
  ): Product {
    const antProduct = this.productRepository.findById(id);
    if (antProduct == null) {
      throw new NotFoundException('record id does not exist');
    }

    const updateProduct = this.productRepository.updateProduct(
      id,
      new Product(name, sku, brand, price, stock),
    );

    this.sendgridService.sendEmail(
      'devhackcol@gmail.com',
      Templates.UPDATE_PRODUCT,
      {
        userUpdate: 'esneyder',
        idProduct: id,
        antName: antProduct.name,
        antSku: antProduct.sku,
        antBrand: antProduct.brand,
        antPrice: antProduct.price,
        antStock: antProduct.stock,

        cuName: updateProduct.name,
        cuSku: updateProduct.sku,
        cuBrand: updateProduct.brand,
        cuPrice: updateProduct.price,
        cuStock: updateProduct.stock,
      },
    );
    return updateProduct;
  }

  findAvailableProduct(): Product[] {
    return this.productRepository
      .findAll()
      .filter((product) => !product.isClosed);
  }
  findExitsProduct(name: string): Product[] {
    return this.productRepository
      .findAll()
      .filter((product) => product.name == name);
  }
  create(
    name: string,
    sku: string,
    brand: string,
    price: number,
    stock: number,
  ): Product {
    const product = new Product(name, sku, brand, price, stock);
    if (this.findExitsProduct(name).length > 0) {
      throw new ConflictException('product already exists');
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
