import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { CreateOrderPaymentDto } from 'src/order/dtos/create-order-payment.dto';
import { PaymentType } from 'src/payment-status/enum/payment-type.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(
    createOrderPaymentDTO: CreateOrderPaymentDto): Promise<PaymentEntity | null> {
    if (!createOrderPaymentDTO.amountPayments) {
        throw new BadRequestException(
    'Amount Payments not found')
        } else {
            const payment = new PaymentEntity(PaymentType.Done, 0,0,0,0, createOrderPaymentDTO);
            return this.paymentRepository.save(payment);
        }
  }
}
