import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService {
    constructor(
        @InjectRepository(OrderProductEntity)
        private readonly orderProductRepository: Repository<OrderProductEntity>,
    ) {}

    async createOrderProduct(
        productRef: number,
        quantity: number,
        orderId: number,
        price: number,
    ): Promise<OrderProductEntity | null> {
        const newOrderProduct = this.orderProductRepository.create({
            productRef,
            quantity,
            orderId,
            price,
        });
        
        return newOrderProduct;
    }
}
