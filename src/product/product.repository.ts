import { Product } from './product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(
    product_reference: number,
    product: Partial<Product>,
  ): Promise<Product>;
  delete(product_reference: number): Promise<void>;
  findById(product_reference: number): Promise<Product>;
  findAll(): Promise<Product[]>;
  getSalesProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  getProducts(queryParams: any): Promise<Product[]>;
}
