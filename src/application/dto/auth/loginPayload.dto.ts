import { UserEntity } from 'src/domain/entities/user.entity';

export class LoginPayload {
  id: number;
  typeUser: string;
  constructor(user: UserEntity) {
    this.id = user.userId;
    this.typeUser = user.role;
  }
}
