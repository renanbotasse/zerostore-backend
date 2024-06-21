// domain/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserCartEntity } from './users-cart-item.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'role', nullable: false })
  role: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'salt', nullable: false })
  salt: string;

  @Column({ name: 'is_o_auth', nullable: false })
  isoAuth: boolean;

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
}
