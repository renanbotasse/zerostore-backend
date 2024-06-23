import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ReturnUserCreateDto } from 'src/application/dto/user/returnCreate-user.dto';

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
}
