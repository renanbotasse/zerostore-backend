// src/application/use-cases/delete-user.use-case.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { DeleteUserDto } from '../../dto/user/delete-user.dto';

@Injectable()
export class UseUserDelete {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<void> {
    const { userId } = deleteUserDto;

    // Verifica se o usuário existe antes de tentar deletar
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Remove o usuário usando o repositório
    await this.userRepository.deleteUser(userId);
  }
}
