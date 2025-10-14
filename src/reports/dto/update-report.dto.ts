import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReportDto {
    @ApiProperty({
        example: 1,
        description: 'Nueva categoria del reporte'
    })
    categoryId: number;

    @ApiProperty({
        example: 'Estafa en Facebook',
        description: 'Nuevo titulo del reporte'
    })
    title: string;

    @ApiProperty({
        example: 'Sitio web fraudulento, me robaron 5000 pesos.',
        description: 'Nueva descripcion del reporte'
    })
    description: string;

    @ApiPropertyOptional({
        example: 'www.tennisgratis.com',
        description: 'Nueva url de la pagina web implicada'
    })
    url?: string;

    @ApiPropertyOptional({
        example: 'Tennis Gratis Mx',
        description: 'Nuevo nombre de la pagina web'
    })
    website?: string;

    @ApiPropertyOptional({
        example: 'Instagram',
        description: 'Aplicacion en la que ocurrio la estafa'
    })
    application?: string;

    @ApiPropertyOptional({
        example: '5627452471',
        description: 'Numero telefonico desde el que ocurrio el incidente'
    })
    phoneNumber?: string;

    @ApiPropertyOptional({
        example: 'Laura Gomez',
        description: 'username del estafador del incidente'
    })
    username?: string;

    @ApiPropertyOptional({
        example: 'tennisgratis@gmail.com',
        description: 'correo del estafador del incidente'
    })
    email?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Si el correo es anonimo o no'
    })
    anonymous?: boolean;

    @ApiPropertyOptional({
        example: '123132213123.png',
        description: 'Id de la imagen obtenido por el file upload'
    })
    imageId?: string;
}
