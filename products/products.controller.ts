/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller('games')
export class ProdutcsController {
    @Get()
    findAll(): string {
        return 'This action returns all products'
    }
}