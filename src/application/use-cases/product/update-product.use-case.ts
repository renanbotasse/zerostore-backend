// update-product.use-case.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDto } from '../../dto/product/update-product.dto';
import { ProductMongoDBEntity } from '../../../infrastructure/mongodb/entities/product.mongodb-entity';

@Injectable()
export class UseProductUpdate {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private readonly productModel: Model<ProductMongoDBEntity>,
  ) {}

  async updateProduct(
    product_reference: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductMongoDBEntity> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ product_reference }, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(
        `Product with reference ${product_reference} not found`,
      );
    }
    return updatedProduct;
  }
}
