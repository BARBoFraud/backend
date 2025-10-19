import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @ApiProperty({ example: 'DiegoOlmos@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'supersecreta123' })
    @IsString()
    password: string;
}
