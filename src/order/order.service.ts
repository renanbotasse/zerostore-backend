import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductEntity } from 'src/order-products/entities/order-product.entity';
import { UserCartDto } from '../user/dtos/user-cart.dto'; // Import the correct DTO for cart items
import { OrderEntity } from './entities/order.entity';
import { PaymentService } from 'src/payment/payment.service';
import { CreateOrderPaymentDto } from './dtos/create-order-payment.dto';
import { CreateCheckoutDto } from './dtos/create-order.dto';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { UserService } from 'src/user/user.service';
import { OrderProductService } from 'src/order-products/order-products.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductsRepository: Repository<OrderProductEntity>,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
  ) {}

  async createOrder(createOrderPaymentDto: CreateOrderPaymentDto, userId: number) {
    const payment: PaymentEntity | null = await this.paymentService.createPayment(createOrderPaymentDto);

    if (!payment) {
      throw new Error('Não foi possível criar o pagamento.');
    }

    const order = await this.orderRepository.save({
      addressId: createOrderPaymentDto.addressId,
      date: new Date(),
      userId,
      paymentId: payment.paymentId,
    });

    const cart = await this.userService.getUserCart(userId);

    if (!cart || cart.cart.length === 0) {
      throw new NotFoundException('Carrinho vazio.');
    }

    const orderProducts: OrderProductEntity[] = cart.cart.map((item) => {
      const orderProduct = new OrderProductEntity();
      orderProduct.orderId = order.orderId;
      orderProduct.productRef = item.product_reference;
      orderProduct.quantity = item.quantity;
      orderProduct.price = item.price;
      return orderProduct;
    });

    await this.orderProductsRepository.save(orderProducts);

    return { order, orderProducts };
  }
}