// src/interfaces/controllers/user.controller.ts

import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/user/create-user.dto';
import { UpdateUserDto } from '../../application/dto/user/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UseUserCreate } from '../../application/use-cases/user/create-user.use-case';
import { UseUserUpdate } from '../../application/use-cases/user/update-user.use-case';
import { UseUserDelete } from '../../application/use-cases/user/delete-user.use-case';
import { UseUserRead } from '../../application/use-cases/user/read-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: UseUserCreate,
    private readonly updateUserUseCase: UseUserUpdate,
    private readonly deleteUserUseCase: UseUserDelete,
    private readonly readUserUseCase: UseUserRead,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const createdUser = await this.createUserUseCase.execute(createUserDto);
      return createdUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      const updatedUser = await this.updateUserUseCase.execute(
        userId,
        updateUserDto,
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
}
