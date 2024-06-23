/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
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
        const user = await this.findUserByEmail(createUserDto.email).catch(
            () => undefined,
        );

        if (user) {
            throw new BadGatewayException('email already used');
        }
        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
            createdAt: new Date,
            updatedAt: new Date,
            cart: [],
            ordersId: [""],
            //mock
            typeUser: 1,
            salt: 'cake',
            fiscalNumber: '123-123-123',
            });
}

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity | null > {
        return this.userRepository.findOne({
            where: {
                userId: userId,
            },
            relations: ['address'],
        })
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                userId: userId
            }
        });

        if (!user) {
            throw new NotFoundException('UserId Not Found');
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            throw new NotFoundException(`Email: ${email} Not Found`);
        }

        return user;
    }

}