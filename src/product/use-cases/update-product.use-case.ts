import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductMongoDBEntity } from '../../infrastructure/mongodb/entities/product.mongodb-entity';

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
    // Procura e atualiza o produto pelo número de referência
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ product_reference }, updateProductDto, { new: true })
      .exec();
    
    // Se nenhum produto for encontrado, lança uma NotFoundException
    if (!updatedProduct) {
      throw new NotFoundException(
        `Product with reference ${product_reference} not found`,
      );
    }
    
    // Retorna o produto atualizado
    return updatedProduct;
  }
}
