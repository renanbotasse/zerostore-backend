import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMongoDBEntity } from '../../infrastructure/mongodb/entities/product.mongodb-entity';

@Injectable()
export class UseProductDelete {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private readonly productModel: Model<ProductMongoDBEntity>,
  ) {}

  async deleteProduct(product_reference: number): Promise<void> {
    const result = await this.productModel
      .findOneAndDelete({ product_reference })
      .exec();

    if (!result) {
      throw new NotFoundException(
        `Product with reference ${product_reference} not found`,
      );
    }
  }
}
