/* eslint-disable prettier/prettier */
import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/application/dto/user/create-user.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from './../user/dtos/update-password.dto';
import { UpdateCartDto } from './../user/dtos/update-cart.dto';
import { validatePassword } from 'src/utils/password';
import { UserCartDto } from './dtos/user-cart.dto';
import axios from 'axios';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createPasswordHashed(password: string): Promise<string> {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email).catch(
            () => undefined,
        );

        if (user) {
            throw new BadGatewayException('email already used');
        }
        const passwordHashed = await this.createPasswordHashed(createUserDto.password);

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

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity | null> {
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

    async updatePasswordUser(
        updatePasswordDto: UpdatePasswordDto,
        userId: number,
    ): Promise<UserEntity> {
        const user = await this.findUserById(userId);

        const passwordHashed = await this.createPasswordHashed(
            updatePasswordDto.newPassword,
        );

        const isMatch = await validatePassword(
            updatePasswordDto.lastPassword,
            user.password || '',
        );

        if (!isMatch) {
            throw new BadRequestException('Last Password Invalid')
        }

        return this.userRepository.save({
            ...user,
            password: passwordHashed,
        })
    }

    async updateUserCart(userId: number, updateCartDto: UpdateCartDto): Promise<UserCartDto> {
        const user = await this.findUserById(userId);

        const updatedCart = await Promise.all(updateCartDto.cart.map(async (item) => {
            const { product_ref, quantity } = item;
            try {
                const response = await axios.get(`http://localhost:3000/products/${product_ref}`);
                const productInfo = response.data;
                return {
                    product_ref,
                    quantity,
                    price: productInfo.product_price,
                };
            } catch (error) {
                console.error(`Failed to fetch product info for product reference: ${product_ref}`, error);
                throw new BadGatewayException(`Failed to fetch product info for product reference: ${product_ref}`);
            }
        }));

        user.cart = updatedCart;

        await this.userRepository.save(user);

        const userCartDto: UserCartDto = {
            cart: user.cart,
        };

        return userCartDto;
    }

    async getUserCart(userId: number): Promise<UserCartDto | null> {
        const user = await this.findUserById(userId);
        
        const userCartDto: UserCartDto = {
            cart: user.cart,
        };
        return userCartDto;

    }

    async clearUserCart(userId: number): Promise<UserCartDto> {
        // Encontra o usuário pelo ID
        const user = await this.userRepository.findOne({
            where: {
                userId: userId,
            }
        })
    
        if (!user) {
          throw new NotFoundException('Usuário não encontrado');
        }
    
        user.cart = [];
    
        await this.userRepository.save(user);
    
        const userCartDto: UserCartDto = {
          cart: user.cart,
        };
    
        return userCartDto;
      }

}

