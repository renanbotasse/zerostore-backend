import { Column } from 'typeorm';

export class UserAddressEntity {
  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'number', nullable: false })
  number: string;

  @Column({ name: 'complement' })
  complement: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'zip_code', nullable: false })
  zipCode: string;
}
