import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../orm/entities/users.entity'; // Importe a entidade do usuário do PostgreSQL
import { AddressEntity } from '../orm/entities/address.entity';
import { UserCartEntity } from './../orm/entities/users-cart-item.entity';
import { CreateTableAddress1675388996374 } from './../orm/migration/1719130700982-create_table_address';
import { CreateUserTable1718973625959 } from './../orm/migration/1718973625959-create_table_user';
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
      autoLoadEntities: true, // Carregar entidades automaticamente
      entities: [UserEntity, AddressEntity, UserCartEntity],
      migrations: [
        CreateTableAddress1675388996374,
        CreateUserTable1718973625959,
      ],
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([UserEntity]), // Registrar a entidade do usuário
  ],
  exports: [TypeOrmModule], // Exportar TypeOrmModule para ser acessível em outros módulos se necessário
})
export class TypeOrmDatabaseModule {}
