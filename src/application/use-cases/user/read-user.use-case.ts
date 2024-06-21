// src/application/use-cases/read-user.use-case.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { ReadUserDto } from '../../dto/user/read-user.dto';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UseUserRead {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    query: ReadUserDto,
  ): Promise<UserEntity | UserEntity[] | undefined> {
    if (query.userId) {
      return this.userRepository.findUserById(query.userId);
    } else {
      return this.userRepository.findAllUsers();
    }
  }
}
