import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmDatabaseModule } from 'src/infrastructure/config/typeorm.config';


@Module({
  imports: [TypeOrmDatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
