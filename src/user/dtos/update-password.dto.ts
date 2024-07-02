import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdatePasswordDto {
    @ApiProperty({ example: 'newPassword', description: 'User New password' })
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @ApiProperty({ example: 'lastPassword', description: 'User Last password' })
    @IsNotEmpty()
    @IsString()
    lastPassword: string;
}