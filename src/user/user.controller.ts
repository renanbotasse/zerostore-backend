import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<UserEntity[]> {
    return this.userService.getAllUser();
  }
}
