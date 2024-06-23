// domain/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  addressId: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'complement' })
  complement: string;

  @Column({ name: 'number', nullable: false })
  numberAddress: number;

  @Column({ name: 'zip_code', nullable: false })
  zipCode: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'country', nullable: false })
  country: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
