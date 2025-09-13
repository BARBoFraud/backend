import { ApiProperty } from '@nestjs/swagger';

export class UserRefreshDto {
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOCIsInR5cGUiOiJh',
        description: 'Refresh token asignado por api'
    })
    refresh_token: string;
}
