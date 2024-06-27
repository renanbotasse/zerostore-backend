import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../orm/entities/users.entity';
import { AddressEntity } from '../orm/entities/address.entity';
import { CartEntity } from '../orm/entities/cart.entity';
import { CreateTableAddress1719130700982 } from './../orm/migration/1719130700982-create_table_address';
import { CreateUserTable1718973625959 } from './../orm/migration/1718973625959-create_table_user';
import { AlterTableUser1719173451120 } from '../orm/migration/1719173451120-alter-table-user';
import { CreateTableStatus1719322268293 } from '../orm/migration/1719322268293-create_table_status';
import { CreateTablePayment1719323156828 } from '../orm/migration/1719323156828-create_table_payment';
import { CreateTableOrder1719324530695 } from '../orm/migration/1719324530695-create_table_orders';
import { CreateTableOrderProduct1719325567987 } from '../orm/migration/1719325567987-create_table_order_product';
import { PaymentStatusEntity } from 'src/payment-status/entities/payment-status.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { InsertStatus1719334262749 } from '../orm/migration/1719334262749-insert-status';
import { AlterTablePayment1719334275148 } from '../orm/migration/1719334275148-alter-table-payment';

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
      entities: [UserEntity, AddressEntity, CartEntity, PaymentEntity, PaymentStatusEntity],
      migrations: [
        CreateUserTable1718973625959,
        CreateTableAddress1719130700982,
        AlterTableUser1719173451120,
        CreateTableStatus1719322268293,
        CreateTablePayment1719323156828,
        CreateTableOrder1719324530695,
        CreateTableOrderProduct1719325567987,
        InsertStatus1719334262749,
        AlterTablePayment1719334275148
      ],
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmDatabaseModule {}
