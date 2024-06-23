import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from 'src/application/dto/address/createAddress.dto';
import { AddressEntity } from 'src/infrastructure/orm/entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    return this.addressRepository.save({
      ...createAddress,
      userId,
    });
  }
}
