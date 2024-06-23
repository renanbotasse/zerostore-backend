import { AddressEntity } from 'src/domain/entities/user.address.entity';

export class ReturnAddressDto {
  street: string;
  numberAddress: number;
  complement: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  constructor(address: AddressEntity) {
    this.street = address.street;
    this.numberAddress = address.numberAddress;
    this.complement = address.complement;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
    this.zipCode = address.zipCode;
  }
}
