import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity({ name: 'order_products' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn({ name: 'order_products_id' })
  orderProductsId: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'product_ref', nullable: false })
  product_ref: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.ordersProduct)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
