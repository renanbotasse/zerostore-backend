import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductMongoDBEntity, ProductMongoDBEntitySchema } from 'src/infrastructure/mongodb/entities/product.mongodb-entity'; // Verifique o caminho correto aqui
import { MongooseModule } from '@nestjs/mongoose';
import { UseProductCreate } from './use-cases/create-product.use-case';
import { UseProductDelete } from './use-cases/delete-product.use-case';
import { UseProductUpdate } from './use-cases/update-product.use-case';
import { UseProductRead } from './use-cases/read-product.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductMongoDBEntity.name, schema: ProductMongoDBEntitySchema }]),
  ],
  controllers: [ProductController],
  providers: [
    UseProductCreate,
    UseProductDelete,
    UseProductUpdate,
    UseProductRead,
  ],
  exports: [UseProductRead, UseProductCreate, UseProductDelete, UseProductUpdate, UseProductRead], // Exporte se necessário para outros módulos
})
export class ProductModule {}
