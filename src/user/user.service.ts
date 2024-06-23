/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
            createdAt: new Date,
            updatedAt: new Date,
            deletedAt: null,
            cart: [],
            ordersId: [""],
            //mock
            role: 'user',
            salt: 'cake',
            fiscalNumber: '123-123-123',
            });
}

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}

