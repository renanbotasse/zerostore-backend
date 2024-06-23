import { ReturnUserCreateDto } from '../user/returnCreate-user.dto';

export interface ReturnLogin {
  user: ReturnUserCreateDto;
  accessToken: string;
}
