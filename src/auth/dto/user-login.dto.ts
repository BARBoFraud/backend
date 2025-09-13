import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @ApiProperty({ example: 'leote@gmail.com' })
    email: string;
    @ApiProperty({ example: 'megustanlosfemboys' })
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty({
        example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOCIsInR5cGUiOiJh
            SonxUrzoWdPbJ_EmI`,
        description: 'Refresh token asignado por api'
    })
    refresh_token: string;
}
