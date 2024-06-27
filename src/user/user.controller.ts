import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReturnUserCreateDto } from 'src/user/dtos/returnCreate-user.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { UserCartDto } from './dtos/user-cart.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserCreateDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserCreateDto(userEntity),
    );
  }

  @Get('/:userId')
  async getUserById(
    @Param('userId') userId: number,
  ): Promise<ReturnUserCreateDto | null> {
    const user = await this.userService.getUserByIdUsingRelations(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return new ReturnUserCreateDto(user);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDto, userId);
  }

}
