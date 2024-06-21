// src/application/use-cases/update-user.use-case.ts

import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class UseUserUpdate {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userId: number,
    updateUserDto: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
    try {
      const updatedUser = await this.userRepository.updateUser(
        userId,
        updateUserDto,
      );
      if (!updatedUser) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
}
