import {
    Body,
    Controller,
    Get,
    Patch,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { UpdateCartDto } from 'src/user/dtos/update-cart.dto';
  import { UserCartDto } from 'src/user/dtos/user-cart.dto';
  import { UserService } from 'src/user/user.service';
  import { UserId } from '../decorators/user-id.decorator';
  
  @Controller('cart')
  export class CartController {
    constructor(private readonly userService: UserService) {}
  
    @Patch()
    @UsePipes(ValidationPipe)
    async updateCart(
      @Body() updateCartDto: UpdateCartDto,
      @UserId() userId: number,
    ): Promise<UserCartDto> {
      return this.userService.updateUserCart(userId, updateCartDto);
    }
  
    @Get()
    @UsePipes(ValidationPipe)
    async getUserCart(@UserId() userId: number): Promise<UserCartDto | null> {
      return this.userService.getUserCart(userId);
    }
  }
  