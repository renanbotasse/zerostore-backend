import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/controllers/product.controller';
import { MongooseDatabaseModule } from './infrastructure/config/mongoose.config';
import { UseProductCreate } from './application/use-cases/product/create-product.use-case';
import { UseProductDelete } from './application/use-cases/product/delete-product.use-case';
import { UseProductUpdate } from './application/use-cases/product/update-product.use-case';
import { UseProductRead } from './application/use-cases/product/read-product.use-case';
// import { UseUserCreate } from './application/use-cases/user/create-user.use-case';
// import { UseUserUpdate } from './application/use-cases/user/update-user.use-case';
// import { UseUserDelete } from './application/use-cases/user/delete-user.use-case';
// import { UseUserRead } from './application/use-cases/user/read-user.use-case';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './application/dto/auth/auth.module';

@Module({
  //pedir os outros services independentes
  imports: [MongooseDatabaseModule, UserModule, AddressModule, CacheModule, AuthModule],
  controllers: [ProductController],
  //services
  providers: [
    UseProductCreate,
    UseProductDelete,
    UseProductUpdate,
    UseProductRead,
    // UseUserCreate,
    // UseUserUpdate,
    // UseUserDelete,
    // UseUserRead,
  ],
})
export class AppModule {}
