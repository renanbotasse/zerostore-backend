import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/Product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  createProduct(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto)
    return newProduct.save();
  }

  getProducts(queryParams: any) {
    const query: any = {};

    if (queryParams.product_type) {
      query.product_type = { $regex: queryParams.product_type, $options: 'i' };
    }

    if (queryParams.product_new) {
      query.product_new = queryParams.product_new === 'true';
    }

    if (queryParams.product_sales) {
      query.product_sales = queryParams.product_sales === 'true';
    }

    if (queryParams.product_platform) {
      query.product_platform = { $regex: queryParams.product_platform, $options: 'i' };
    }

    return this.productModel.find(query).exec();
  }

  getCategoryConsole() {
    return  this.productModel.find({product_type: "console" });
  }

  getCategoryGame() {
    return  this.productModel.find({product_type: "game" });
  }


  getCategoryAccessories() {
    return  this.productModel.find({product_type: "accessories" });
  }

  getNewProducts() {
    return this.productModel.find({ product_new: true });
  }

  getSalesProducts() {
    return this.productModel.find({ product_sales: true });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
