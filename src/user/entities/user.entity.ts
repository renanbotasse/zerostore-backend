import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserCartEntity } from './user.cart-item.entity';
import { AddressEntity } from './user.address.entity';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'salt', nullable: false })
  salt: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'fiscal_number', nullable: false })
  fiscalNumber: string;

  @Column('jsonb', { name: 'cart', array: false, default: () => "'[]'" })
  cart: UserCartEntity[];

  @Column('text', { name: 'orders_id', array: true })
  ordersId: string[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  address?: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders?: OrderEntity[];
}
