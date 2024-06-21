import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../orm/entities/users-postgres.entity'; // Importe a entidade do usuário do PostgreSQL
import { UserAddressEntity } from './../orm/entities/users-address.entity';
import { UserCartEntity } from './../orm/entities/users-cart-item.entity';
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
      entities: [UserEntity, UserAddressEntity, UserCartEntity],
      migrations: [CreateUserTable1718973625959],
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([UserEntity]), // Registrar a entidade do usuário
  ],
  exports: [TypeOrmModule], // Exportar TypeOrmModule para ser acessível em outros módulos se necessário
})
export class TypeOrmDatabaseModule {}
