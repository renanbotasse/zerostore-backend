import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmDatabaseModule } from './../infrastructure/config/typeorm.config';

@Module({
  imports: [TypeOrmDatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
