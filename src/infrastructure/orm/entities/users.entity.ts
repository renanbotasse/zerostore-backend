// domain/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { AddressEntity } from './address.entity';

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
  cart?: CartEntity[];

  @Column('text', { name: 'orders_id', array: true })
  ordersId: string[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  address?: AddressEntity[];
}
