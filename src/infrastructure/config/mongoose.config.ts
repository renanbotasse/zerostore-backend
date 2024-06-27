import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductMongoDBEntity,
  ProductMongoDBEntitySchema,
} from '../mongodb/entities/product.mongodb-entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://renanbotasse:Walk1234@zerocluster.vfal5mg.mongodb.net/?retryWrites=true&w=majority&appName=zeroCluster',
    ),
    MongooseModule.forFeature([
      { name: ProductMongoDBEntity.name, schema: ProductMongoDBEntitySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseDatabaseModule {}
