import { ReturnUserCreateDto } from '../user/dtos/returnCreate-user.dto';

export interface ReturnLogin {
  user: ReturnUserCreateDto;
  accessToken: string;
}
