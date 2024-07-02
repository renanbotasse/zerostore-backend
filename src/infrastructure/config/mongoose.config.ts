import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductMongoDBEntity,
  ProductMongoDBEntitySchema,
} from '../mongodb/entities/product.mongodb-entity';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.products.db' });


const { MONGODB_USER, MONGODB_PASSWORD } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@zerocluster.vfal5mg.mongodb.net/?retryWrites=true&w=majority&appName=zeroCluster`
    ),
    MongooseModule.forFeature([
      { name: ProductMongoDBEntity.name, schema: ProductMongoDBEntitySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseDatabaseModule {}
