import {
  Body,
  Controller,
  Get,
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


  @Post('/cart') 
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderPaymentDto: CreateOrderPaymentDto,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderPaymentDto, userId);
  }

  @Get('/neworder')
  @UsePipes(ValidationPipe)
  async getLastOrder(
    @UserId() userId: number,
  ) {
    return this.orderService.getLastOrder(userId);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async getAllOrders(
    @UserId() userId: number,
  ) {
    return this.orderService.getAllOrders(userId);
  }
}