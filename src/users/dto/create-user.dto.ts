import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Diego' })
    name: string;
    @ApiProperty({ example: 'Herrera' })
    last_name1: string;
    @ApiProperty({ example: 'Olmos' })
    last_name2: string;
    @ApiProperty({ example: 'A01652570@tec.mx' })
    email: string;
    @ApiProperty({ example: 'megustanlosfemboys123' })
    password: string;
}
