import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMongoDBEntity } from '../../infrastructure/mongodb/entities/product.mongodb-entity';

@Injectable()
export class UseProductRead {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private productModel: Model<ProductMongoDBEntity>,
  ) {}

  async getProductSearch(queryParams: any): Promise<ProductMongoDBEntity[]> {
    const query: any = {};

    // Se houver um parâmetro product_name nos queryParams, filtra por nome do produto
    if (queryParams.product_name) {
      query.product_name = {
        $regex: new RegExp(queryParams.product_name, 'i'),
      };
    }

    return this.productModel.find(query).exec();
  }

  async getProductsById(product_reference: number): Promise<ProductMongoDBEntity> {
    // Busca um único produto pelo número de referência
    const product = await this.productModel.findOne({ product_reference }).exec();
    
    if (!product) {
      throw new NotFoundException(`Product with reference ${product_reference} not found`);
    }

    return product;
  }

  async getProducts(): Promise<ProductMongoDBEntity[]> {
    // Retorna todos os produtos
    return this.productModel.find().exec();
  }

  async getProductCategoryGame(): Promise<ProductMongoDBEntity[]> {
    // Retorna produtos da categoria 'GAME'
    return this.productModel.find({ product_type: 'GAME' }).exec();
  }

  async getProductCategoryAccessories(): Promise<ProductMongoDBEntity[]> {
    // Retorna produtos da categoria 'ACCESSORIES'
    return this.productModel.find({ product_type: 'ACCESSORIES' }).exec();
  }

  async getProductNew(): Promise<ProductMongoDBEntity[]> {
    // Retorna produtos com status 'NEW'
    return this.productModel.find({ product_status: 'NEW' }).exec();
  }

  async getProductSales(): Promise<ProductMongoDBEntity[]> {
    // Retorna produtos com status 'SALES'
    return this.productModel.find({ product_status: 'SALES' }).exec();
  }
}
