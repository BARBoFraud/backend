import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'Diego' })
    @MaxLength(64)
    name: string;
    @ApiPropertyOptional({ example: 'Herrera' })
    @MaxLength(64)
    lastName1: string;
    @ApiPropertyOptional({ example: 'Olmos' })
    @MaxLength(64)
    lastName2: string;
    @ApiPropertyOptional({ example: 'A01652570@tec.mx' })
    @IsEmail()
    @MaxLength(128)
    email: string;
}
