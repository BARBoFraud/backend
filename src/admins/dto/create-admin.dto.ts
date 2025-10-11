import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
    @ApiProperty({ example: 'JorgeCadenaAdmin' })
    username: string;
    @ApiProperty({ example: 'JorgeCadena123Trabajo' })
    password: string;
}
