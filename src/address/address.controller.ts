import {
  Body,
  Get,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateAddressDto } from 'src/address/dtos/createAddress.dto';
import { AddressService } from './address.service';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Patch()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<ReturnAddressDto> {
    console.log('userId', userId);
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return await this.addressService.findAddressByUserId(userId);
  }
}
