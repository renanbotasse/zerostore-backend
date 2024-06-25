import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCheckoutDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserService } from 'src/user/user.service';
import { CreateOrderPaymentDto } from './dtos/create-order-payment.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService
  ) { }


  @Post('/cart') // Corrigido para usar ':userId'
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderPaymentDto: CreateOrderPaymentDto,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderPaymentDto, userId);
  }
}