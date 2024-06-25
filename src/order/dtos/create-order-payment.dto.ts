import { isNumber, IsNumber, IsOptional } from "class-validator";

export class CreateOrderPaymentDto {
    @IsOptional()
    @IsNumber()
    amountPayments?: number;

    @IsNumber()
    addressId: number;
}