import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class AdminLoginDto {
    @ApiProperty({ example: 'DiegoOlmosAdmin' })
    @IsString()
    @MaxLength(32)
    username: string;

    @ApiProperty({ example: 'password123secret' })
    @IsString()
    password: string;
}
