import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Diego' })
    @IsString()
    @MaxLength(64)
    name: string;
    @ApiProperty({ example: 'Herrera' })
    @IsString()
    @MaxLength(64)
    lastName1: string;
    @ApiProperty({ example: 'Olmos' })
    @IsString()
    @MaxLength(64)
    lastName2: string;
    @ApiProperty({ example: 'DiegoOlmos@tec.mx' })
    @IsEmail()
    @MaxLength(128)
    email: string;
    @ApiProperty({ example: 'supersecreta123' })
    password: string;
}
