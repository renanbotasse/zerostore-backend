import { UserEntity } from './../../../domain/entities/user.entity';

export class ReturnUserCreateDto {
  userId: number;
  name: string;
  email: string;
  fiscalNumber: string;

  constructor(userEntity: UserEntity) {
    this.userId = userEntity.userId;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.fiscalNumber = userEntity.fiscalNumber;
  }
}
