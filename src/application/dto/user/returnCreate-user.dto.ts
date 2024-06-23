import { ReturnAddressDto } from '../address/returnAddress.dto';
import { UserEntity } from './../../../domain/entities/user.entity';

export class ReturnUserCreateDto {
  userId: number;
  name: string;
  email: string;
  fiscalNumber: string;
  address?: ReturnAddressDto[];

  constructor(userEntity: UserEntity) {
    this.userId = userEntity.userId;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.fiscalNumber = userEntity.fiscalNumber;

    this.address = userEntity.address
      ? userEntity.address.map((address) => new ReturnAddressDto(address))
      : undefined;
  }
}
