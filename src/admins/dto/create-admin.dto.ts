import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateAdminDto {
    @ApiProperty({ example: 'JorgeCadenaAdmin' })
    @IsString()
    @MaxLength(32)
    username: string;
    @ApiProperty({ example: 'JorgeCadena123Trabajo' })
    password: string;
}
