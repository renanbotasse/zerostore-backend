import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/controllers/product.controller';
import { DatabaseModule } from './infrastructure/config/database.config';
import { UseProductCreate } from './application/use-cases/product/create-product.use-case';
import { UseProductDelete } from './application/use-cases/product/delete-product.use-case';
import { UseProductUpdate } from './application/use-cases/product/update-product.use-case';
import { UseProductRead } from './application/use-cases/product/read-product.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    UseProductCreate,
    UseProductDelete,
    UseProductUpdate,
    UseProductRead,
  ],
})
export class AppModule {}
