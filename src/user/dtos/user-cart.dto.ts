import { ProductMongoDBEntity } from "src/infrastructure/mongodb/entities/product.mongodb-entity";

export class UserCartDto {
  cart: {
    product_reference: number;
    quantity: number;
    price: number;
    product?: ProductMongoDBEntity;
  }[];
}
