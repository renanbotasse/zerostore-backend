import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UseUserCreate {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Cria um novo usuário com base nos dados do DTO
    const newUser = new UserEntity();
    //newUser.role = createUserDto.role;
    newUser.password = createUserDto.password; // Aqui você pode aplicar a lógica de criptografia se necessário
    //newUser.isOAuth = createUserDto.isOAuth;
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.fiscalNumber = createUserDto.fiscalNumber;

    // Salva o usuário no banco de dados usando o repositório
    return await this.userRepository.createUser(newUser);
  }
}
