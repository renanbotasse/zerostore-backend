import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductEntity } from 'src/order-products/entities/order-product.entity';
import { UserCartDto } from '../user/dtos/user-cart.dto';
import { OrderEntity } from './entities/order.entity';
import { PaymentService } from 'src/payment/payment.service';
import { CreateOrderPaymentDto } from './dtos/create-order-payment.dto';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/address/address.service'; 

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductsRepository: Repository<OrderProductEntity>,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
    private readonly addressService: AddressService, 
  ) {}

  async createOrder(createOrderPaymentDto: CreateOrderPaymentDto, userId: number) {
    console.log('Iniciando criação do pedido...');

    const cart = await this.getUserCart(userId);
    const payment = await this.createPayment(createOrderPaymentDto, userId);
    const order = await this.createOrderEntity(createOrderPaymentDto, userId, payment);
    const orderProducts = await this.createOrderProducts(order.orderId, cart);

    await this.saveOrderProducts(orderProducts);
    await this.clearUserCart(userId);

    return { order, orderProducts };
  }

  async getLastOrder(userId: number) {
    const order = await this.orderRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    if (!order) {
      throw new NotFoundException('No orders found for this user');
    }

    const orderProducts = await this.orderProductsRepository.find({
      where: { orderId: order.orderId },
    });

    return { order, orderProducts };
  }

  private async getUserCart(userId: number): Promise<UserCartDto> {
    const cart = await this.userService.getUserCart(userId);
    if (!cart || !cart.cart || cart.cart.length === 0) {
      throw new NotFoundException('Carrinho vazio.');
    }
    console.log('Carrinho do usuário:', cart);
    return cart;
  }

  private async createPayment(createOrderPaymentDto: CreateOrderPaymentDto, userId: number): Promise<PaymentEntity> {
    const payment = await this.paymentService.createPayment(createOrderPaymentDto, userId);
    if (!payment) {
      throw new Error('Não foi possível criar o pagamento.');
    }
    console.log('Pagamento criado:', payment);
    return payment;
  }

  private async createOrderEntity(
    createOrderPaymentDto: CreateOrderPaymentDto,
    userId: number,
    payment: PaymentEntity
  ): Promise<OrderEntity> {

    const addresses = await this.addressService.findAddressByUserId(userId);
    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('Nenhum endereço encontrado para o usuário.');
    }
    const addressId = addresses[0].addressId;

    const order = await this.orderRepository.save({
      addressId: addressId,
      date: new Date(),
      userId,
      paymentId: payment.paymentId,
    });
    console.log('Pedido criado:', order);
    return order;
  }

  private createOrderProducts(orderId: number, cart: UserCartDto): OrderProductEntity[] {
    const orderProducts = cart.cart.map((item) => {
      if (item.product_reference == null) {
        throw new Error('Referência de produto nula ou indefinida.');
      }
      const orderProduct = new OrderProductEntity();
      orderProduct.orderId = orderId;
      orderProduct.product_reference = item.product_reference;
      orderProduct.quantity = item.quantity;
      orderProduct.price = item.price;
      return orderProduct;
    });
    console.log('Produtos do pedido:', orderProducts);
    return orderProducts;
  }

  private async saveOrderProducts(orderProducts: OrderProductEntity[]): Promise<void> {
    await this.orderProductsRepository.save(orderProducts);
    console.log('Produtos do pedido salvos.');
  }

  private async clearUserCart(userId: number): Promise<void> {
    await this.userService.clearUserCart(userId);
    console.log('Carrinho do usuário limpo.');
  }




}
