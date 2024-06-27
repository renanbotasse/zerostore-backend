import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from 'src/address/dtos/createAddress.dto';
import { AddressEntity } from 'src/infrastructure/orm/entities/address.entity';
import { UserService } from 'src/user/user.service';
import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
  ) {}

  async createAddress(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    return this.addressRepository.save({
      ...createAddress,
      userId,
    });
  }

  async findAddressByUserId(userId: number): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: ['user'],
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(`Address not found for userId: ${userId}`);
    }

    return addresses.map((address) => new ReturnAddressDto(address));
  }
}
