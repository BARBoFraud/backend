import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiProperty({
        example: 1,
        description: 'Categoria del reporte'
    })
    categoryId: number;
    @ApiProperty({
        example: 'Sitio web fraudulento, me robaron 4000 pesos.',
        description: 'Descripcion del reporte'
    })
    description: string;
    @ApiPropertyOptional({
        example: 'www.tennisgratis.com',
        description: 'Url de la pagina web implicada'
    })
    url: string;
    @ApiPropertyOptional({
        example: 'Tennis Gratis Mexico',
        description: 'Nombre de la pagina web'
    })
    website: string;
    @ApiPropertyOptional({
        example: 'Instagram',
        description: 'Red social en la que ocurrio el incidente'
    })
    socialMedia: string;
    @ApiPropertyOptional({
        example: '5627452471',
        description: 'Numero telefonico desde el que ocurrio el incidente'
    })
    phoneNumber: string;
    @ApiPropertyOptional({
        example: 'Juan Perez',
        description: 'username del estafador del incidente'
    })
    username: string;
    @ApiPropertyOptional({
        example: 'tennisgratismx@gmail.com',
        description: 'correo del estafador del incidente'
    })
    email: string;
    @ApiPropertyOptional({
        example: true,
        description: 'Si el correo es anonimo o no, el default es false'
    })
    anonymous: boolean;
    @ApiPropertyOptional({
        example: '123132213123.png',
        description: 'Id de la imagen obtenido por el file upload'
    })
    imageId: string;
}
