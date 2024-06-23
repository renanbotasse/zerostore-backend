import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../orm/entities/users.entity';
import { AddressEntity } from '../orm/entities/address.entity';
import { UserCartEntity } from './../orm/entities/users-cart-item.entity';
import { CreateTableAddress1719130700982 } from './../orm/migration/1719130700982-create_table_address';
import { CreateUserTable1718973625959 } from './../orm/migration/1718973625959-create_table_user';
import { AlterTableUser1719173451120 } from '../orm/migration/1719173451120-alter-table-user';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local.postgres'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      entities: [UserEntity, AddressEntity, UserCartEntity],
      migrations: [
        CreateUserTable1718973625959,
        CreateTableAddress1719130700982,
        AlterTableUser1719173451120,
      ],
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([UserEntity]), // Registrar a entidade do usuário
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmDatabaseModule {}
