import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmDatabaseModule } from './../infrastructure/config/typeorm.config';
import { CartController } from 'src/cart/cart.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmDatabaseModule, AuthModule, ProductModule],
  controllers: [UserController, CartController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
