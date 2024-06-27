import { AddressEntity } from 'src/user/entities/user.address.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderProductEntity } from 'src/order-products/entities/order-product.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'order_id' })
    orderId: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'address_id', nullable: false })
    addressId: number;

    @Column({ name: 'payment_id', nullable: false })
    paymentId: number;

    @CreateDateColumn({ name: 'date' })
    date: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => UserEntity, (user) => user.orders)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id'})
    user?: UserEntity;

    @ManyToMany(() => AddressEntity, (address) => address.orders)
    @JoinColumn({ name: 'address_id', referencedColumnName: 'user_id'})
    address?: AddressEntity;

    @ManyToMany(() => PaymentEntity, (payment) => payment.orders)
    @JoinColumn({ name: 'payment_id', referencedColumnName: 'user_id'})
    payment?: PaymentEntity;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
    ordersProduct?: OrderProductEntity[];
    
}
