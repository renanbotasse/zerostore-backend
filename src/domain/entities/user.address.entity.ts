import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class AddressEntity {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  addressId: number;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'number', nullable: false })
  numberAddress: number;

  @Column({ name: 'complement' })
  complement: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'zipCode', nullable: false })
  zipCode: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
