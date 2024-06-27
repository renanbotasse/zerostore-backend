import { Column } from 'typeorm';

export class UserCartEntity {
  @Column({ name: 'product_reference' })
  product_ref: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price' })
  price: number;
}
