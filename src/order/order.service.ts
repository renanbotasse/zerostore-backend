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
    console.log('Iniciando criação do pedido...');

    const cart = await this.userService.getUserCart(userId);
    if (!cart || !cart.cart || cart.cart.length === 0) {
      throw new NotFoundException('Carrinho vazio.');
    }

    console.log('Carrinho do usuário:', cart);

    const payment: PaymentEntity | null = await this.paymentService.createPayment(createOrderPaymentDto);
    if (!payment) {
      throw new Error('Não foi possível criar o pagamento.');
    }

    console.log('Pagamento criado:', payment);

    const order = await this.orderRepository.save({
      addressId: createOrderPaymentDto.addressId,
      date: new Date(),
      userId,
      paymentId: payment.paymentId,
    });

    console.log('Pedido criado:', order);


    const orderProducts: OrderProductEntity[] = cart.cart.map((item) => {
      if (item.product_ref == null) {
        throw new Error('Referência de produto nula ou indefinida.');
      }

      const orderProduct = new OrderProductEntity();
      orderProduct.orderId = order.orderId;
      orderProduct.product_ref = item.product_ref;
      orderProduct.quantity = item.quantity;
      orderProduct.price = item.price;
      return orderProduct;
    });

    console.log('Produtos do pedido:', orderProducts);

    await this.orderProductsRepository.save(orderProducts);

    console.log('Produtos do pedido salvos.');

    await this.userService.clearUserCart(userId);
    console.log('Limpar o carrinho');


    return { order, orderProducts };
}

}