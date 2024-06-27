import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { CreateOrderPaymentDto } from 'src/order/dtos/create-order-payment.dto';
import { PaymentType } from 'src/payment-status/enum/payment-type.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly userService: UserService,
  ) {}

  async createPayment(
    createOrderPaymentDto: CreateOrderPaymentDto,
    userId: number,
  ): Promise<PaymentEntity | null> {
    if (!createOrderPaymentDto.amountPayments) {
      throw new BadRequestException('Amount Payments not found');
    }


    const cart = await this.userService.getUserCart(userId);
    if (!cart || !cart.cart || cart.cart.length === 0) {
      throw new NotFoundException('Carrinho vazio.');
    }


    const finalPrice = cart.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);


    const payment = new PaymentEntity(
      PaymentType.Done,
      finalPrice,
      0,
      0,
      finalPrice,
      createOrderPaymentDto,
    );

    return this.paymentRepository.save(payment);
  }
}
