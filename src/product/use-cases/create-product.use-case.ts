import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductMongoDBEntity } from '../../infrastructure/mongodb/entities/product.mongodb-entity';

@Injectable()
export class UseProductCreate {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private productModel: Model<ProductMongoDBEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductMongoDBEntity> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }
}
