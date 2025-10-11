import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
    @ApiProperty({ example: 'DiegoOlmosAdmin' })
    username: string;
    @ApiProperty({ example: 'password123secret' })
    password: string;
}
