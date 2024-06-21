import { Column } from 'typeorm';

export class UserCartEntity {
  @Column({ name: 'product_reference' })
  productReference: number;

  @Column({ name: 'quantity' })
  quantity: number;
}
