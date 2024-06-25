import { CreateOrderPaymentDto } from 'src/order/dtos/create-order-payment.dto';
import { OrderEntity } from 'src/order/entities/order.entity';
import { PaymentStatusEntity } from 'src/payment-status/entities/payment-status.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'payment' })
  @TableInheritance({ column: { type: 'varchar', name: 'type' } })
  export class PaymentEntity {
    @PrimaryGeneratedColumn({ name: 'payment_id' })
    paymentId: number;
  
    @Column({ name: 'status_id', nullable: false })
    statusId: number;
  
    @Column({ name: 'price', nullable: false })
    price: number;
  
    @Column({ name: 'discount', nullable: false })
    discount: number;
  
    @Column({ name: 'final_price', nullable: false })
    finalPrice: number;
  
    @Column({ name: 'type', nullable: false })
    type: string;

    @Column({ name: 'amount_payments', nullable: false })
    amountPayments: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => OrderEntity, (order) => order.payment)
    orders?: OrderEntity[];

    @ManyToMany(() => PaymentStatusEntity, (payment) => payment.payments)
    @JoinColumn({ name: 'status_id', referencedColumnName: 'user_id'})
    paymentStatus?: PaymentStatusEntity;
   
    constructor(statusId: number, price: number, discount: number, finalPrice: number, amountPayments: number, createOrderPaymentDto: CreateOrderPaymentDto) {
      this.statusId = statusId;
      this.price = price;
      this.discount = discount;
      this.finalPrice = finalPrice;
      this.amountPayments = createOrderPaymentDto?.amountPayments || 0;
    }
  }