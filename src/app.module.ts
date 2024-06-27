import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { MongooseDatabaseModule } from './infrastructure/config/mongoose.config';
import { UseProductCreate } from './product/use-cases/create-product.use-case';
import { UseProductDelete } from './product/use-cases/delete-product.use-case';
import { UseProductUpdate } from './product/use-cases/update-product.use-case';
import { UseProductRead } from './product/use-cases/read-product.use-case';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { OrderProductsModule } from './order-products/order-products.module';
@Module({
  imports: [
    MongooseDatabaseModule,
    UserModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    PaymentStatusModule,
    PaymentModule,
    OrderModule,
    OrderProductsModule,
  ],
  controllers: [ProductController],
  providers: [
    UseProductCreate,
    UseProductDelete,
    UseProductUpdate,
    UseProductRead,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
