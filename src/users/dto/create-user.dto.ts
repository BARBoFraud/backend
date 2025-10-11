import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Diego' })
    name: string;
    @ApiProperty({ example: 'Herrera' })
    lastName1: string;
    @ApiProperty({ example: 'Olmos' })
    lastName2: string;
    @ApiProperty({ example: 'DiegoOlmos@tec.mx' })
    email: string;
    @ApiProperty({ example: 'supersecreta123' })
    password: string;
}
