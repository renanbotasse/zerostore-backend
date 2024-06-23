import { UserEntity } from 'src/domain/entities/user.entity';

export class LoginPayload {
  id: number;
  typeUser: number;
  constructor(user: UserEntity) {
    this.id = user.userId;
    this.typeUser = user.typeUser;
  }
}
