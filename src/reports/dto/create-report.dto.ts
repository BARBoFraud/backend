import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiProperty({
        example: 'Red social',
        description: 'Categoria del reporte'
    })
    category: string;
    @ApiProperty({
        example: 'Me estafaron jaja',
        description: 'Descripcion del reporte'
    })
    description: string;
    @ApiProperty({
        example: 'www.estafas.com',
        description: 'Url de la pagina web implicada'
    })
    url: string;
    @ApiProperty({
        example: 'SuperEstafas',
        description: 'Nombre de la pagina web'
    })
    website: string;
    @ApiProperty({
        example: 'Instagram',
        description: 'Red social en la que ocurrio el incidente'
    })
    socialMedia: string;
    @ApiProperty({
        example: '5627452471',
        description: 'Numero telefonico desde el que ocurrio el incidente'
    })
    phoneNumber: string;
    @ApiProperty({
        example: 'superestafadorXx',
        description: 'username del estafador del incidente'
    })
    username: string;
    @ApiProperty({
        example: 'Estafogente@gmail.com',
        description: 'correo del estafador del incidente'
    })
    email: string;
    @ApiProperty({
        example: '123132213123.png',
        description: 'Id de la imagen obtenido por el file upload'
    })
    image_id: string;
}
