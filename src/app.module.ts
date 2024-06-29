import { Module } from '@nestjs/common';
import { MongooseDatabaseModule } from './infrastructure/config/mongoose.config';
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
import { ProductModule } from './product/product.module'; // Importe o módulo de produto aqui

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
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
