import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductMongoDBEntity } from '../entities/product.mongodb-entity';

@Injectable()
export class ProductMongoDBRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private readonly productModel: Model<ProductMongoDBEntity>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return this.toDomain(savedProduct);
  }

  async update(
    product_reference: number,
    product: Partial<Product>,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      product_reference,
      product,
      { new: true },
    );
    if (!updatedProduct) {
      throw new Error(`Product with ref ${product_reference} not found`);
    }
    return this.toDomain(updatedProduct);
  }

  async delete(product_reference: number): Promise<void> {
    await this.productModel.findByIdAndDelete(product_reference);
  }

  async findById(product_reference: number): Promise<Product> {
    const product = await this.productModel.findById(product_reference);
    if (!product) {
      throw new Error(`Product with ref ${product_reference} not found`);
    }
    return this.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map(this.toDomain);
  }

  async getSalesProducts(): Promise<Product[]> {
    const salesProducts = await this.productModel
      .find({ product_status: 'SALES' })
      .exec();
    return salesProducts.map(this.toDomain);
  }

  async getNewProducts(): Promise<Product[]> {
    const newProducts = await this.productModel
      .find({ product_status: 'NEW' })
      .exec();
    return newProducts.map(this.toDomain);
  }

  async getProducts(queryParams: any): Promise<Product[]> {
    const query: any = {};

    if (queryParams.product_type) {
      query.product_type = { $regex: queryParams.product_type, $options: 'i' };
    }

    if (queryParams.product_new) {
      query.product_status = 'NEW';
    }

    if (queryParams.product_sales) {
      query.product_status = 'SALES';
    }

    if (queryParams.product_platform) {
      query.product_platform = {
        $regex: queryParams.product_platform,
        $options: 'i',
      };
    }

    const products = await this.productModel.find(query).exec();
    return products.map(this.toDomain);
  }

  private toDomain(product: ProductMongoDBEntity | null): Product {
    if (!product) {
      throw new Error('Product not found');
    }

    return new Product(
      product.product_reference,
      product.product_name,
      product.product_description,
      product.product_price,
      product.product_quantity,
      product.product_platform,
      product.product_type,
      product.product_img,
      product.product_video,
      product.product_status,
    );
  }
}
