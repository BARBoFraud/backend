import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CommentReportDto {
    @ApiProperty({
        example: 'A mi hijo tambien le paso',
        description: 'Contenido del comentario de la publicacion'
    })
    @IsString()
    @MaxLength(128)
    content: string;
}
