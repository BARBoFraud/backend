import { ApiProperty } from '@nestjs/swagger';

export class DeactivateUserDto {
    @ApiProperty({
        description: 'Contraseña del usuario que va a desactivarse'
    })
    password: string;
}
