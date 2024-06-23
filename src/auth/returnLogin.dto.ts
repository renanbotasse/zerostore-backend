import { ReturnUserCreateDto } from '../application/dto/user/returnCreate-user.dto';

export interface ReturnLogin {
  user: ReturnUserCreateDto;
  accessToken: string;
}
