import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from './../user/dtos/update-password.dto';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { UpdateCartDto } from './../user/dtos/update-cart.dto';
import { validatePassword } from 'src/utils/password';
import { UserCartDto } from './dtos/user-cart.dto';
import { AuthService } from 'src/auth/auth.service';
import { ReturnLogin } from 'src/auth/returnLogin.dto';

import axios from 'axios';
import { LoginDto } from 'src/auth/login.dto';
import { UseProductRead } from 'src/product/use-cases/read-product.use-case';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly authService: AuthService,
        private readonly useProductRead: UseProductRead,

    ) { }

    async createPasswordHashed(password: string): Promise<string> {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

    async createUser(createUserDto: CreateUserDto): Promise<ReturnLogin> {
        const user = await this.findUserByEmail(createUserDto.email).catch(
            () => undefined,
        );

        if (user) {
            throw new BadGatewayException('Email already used');
        }

        const passwordHashed = await this.createPasswordHashed(createUserDto.password);

        const newUser = await this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
            createdAt: new Date(),
            updatedAt: new Date(),
            cart: [],
            ordersId: [""],
            typeUser: 1,
            salt: 'cake',
            fiscalNumber: createUserDto.fiscalNumber,
        });

        const loginDto: LoginDto = {
            email: newUser.email,
            password: createUserDto.password,
        };

        const returnLogin: ReturnLogin = await this.authService.login(loginDto);

        return returnLogin;
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

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        return user || null;
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

    async updateUserInfo(
        updateUserInfoDto: UpdateUserInfoDto,
        userId: number,
    ): Promise<UserEntity> {
        const dtoInstance = plainToClass(UpdateUserInfoDto, updateUserInfoDto);

        const errors = await validate(dtoInstance);

        const hasExtraFields = Object.keys(updateUserInfoDto).some(
            (key) => !['name', 'email', 'fiscalNumber'].includes(key),
        );

        if (errors.length > 0 || hasExtraFields) {
            throw new BadRequestException('Invalid fields in request body');
        }

        const user = await this.findUserById(userId);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (updateUserInfoDto.email && updateUserInfoDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({ where: { email: updateUserInfoDto.email } });
            if (existingUser && existingUser.userId !== userId) {
                throw new BadRequestException('Email already in use');
            }
        }

        return this.userRepository.save({
            ...user,
            ...updateUserInfoDto,
            updatedAt: new Date(),
        });
    }

    async updateUserCart(userId: number, updateCartDto: UpdateCartDto): Promise<UserCartDto> {
        const user = await this.findUserById(userId);

        const updatedCart = await Promise.all(updateCartDto.cart.map(async (item) => {
            const { product_reference, quantity } = item;
            try {
                const response = await axios.get(`http://localhost:3000/products/${product_reference}`);
                const productInfo = response.data;
                return {
                    product_reference,
                    quantity,
                    price: productInfo.product_price,
                };
            } catch (error) {
                console.error(`Failed to fetch product info for product reference: ${product_reference}`, error);
                throw new BadGatewayException(`Failed to fetch product info for product reference: ${product_reference}`);
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

        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const cartWithProducts = await Promise.all(
            user.cart.map(async (item) => {
                const product = await this.useProductRead.getProductsById(item.product_reference);
                return {
                    ...item,
                    product: product
                };
            })
        );

        const userCartDto: UserCartDto = {
            cart: cartWithProducts,
        };

        return userCartDto;
    }

    async clearUserCart(userId: number): Promise<UserCartDto> {
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

