import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @ApiProperty({ example: 'DiegoOlmos@gmail.com' })
    email: string;
    @ApiProperty({ example: 'supersecreta123' })
    password: string;
}
