import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/controllers/product.controller';
import { ProductService } from './domain/services/product.service';
import { DatabaseModule } from './infrastructure/config/database.config';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
