import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateOrderPaymentDto {
    @ApiProperty({ example: 'amountPayments', description: 'Payment Key' })
    @IsNumber()
    amountPayments?: number;
}