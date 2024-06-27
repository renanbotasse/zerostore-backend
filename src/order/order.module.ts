import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProductEntity } from 'src/order-products/entities/order-product.entity';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { AddressEntity } from 'src/domain/entities/user.address.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { UserModule } from 'src/user/user.module';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderProductsModule } from 'src/order-products/order-products.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderProductEntity,
      UserEntity,
      AddressEntity,
      PaymentEntity,
    ]),
    UserModule,
    PaymentModule,
    OrderProductsModule,
    AddressModule // Importe o UserModule aqui,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}