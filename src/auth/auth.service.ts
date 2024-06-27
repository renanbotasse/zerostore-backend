import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import { ReturnLogin } from './returnLogin.dto';
import { ReturnUserCreateDto } from '../user/dtos/returnCreate-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './loginPayload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user || !user.password) {
      throw new NotFoundException('Email or password invalid');
    }

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || '',
    );

    if (!isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserCreateDto(user),
    };
  }
}
