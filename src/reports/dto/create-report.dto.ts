import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength
} from 'class-validator';

export class CreateReportDto {
    @ApiProperty({
        example: 1,
        description: 'Categoria del reporte'
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        example: 'Estafa en instagram',
        description: 'Titulo del reporte'
    })
    @IsString()
    @MaxLength(64)
    title: string;

    @ApiProperty({
        example: 'Sitio web fraudulento, me robaron 4000 pesos.',
        description: 'Descripcion del reporte'
    })
    @IsString()
    @MaxLength(255)
    description: string;

    @ApiPropertyOptional({
        example: 'www.tennisgratis.com',
        description: 'Url de la pagina web implicada'
    })
    @IsUrl()
    @IsOptional()
    url?: string;

    @ApiPropertyOptional({
        example: 'Tennis Gratis Mexico',
        description: 'Nombre de la pagina web'
    })
    @IsString()
    @MaxLength(256)
    @IsOptional()
    website?: string;

    @ApiPropertyOptional({
        example: '5627452471',
        description: 'Numero telefonico desde el que ocurrio el incidente'
    })
    @MaxLength(16)
    @IsOptional()
    phoneNumber?: string;

    @ApiPropertyOptional({
        example: 'Juan Perez',
        description: 'username del estafador del incidente'
    })
    @IsString()
    @MaxLength(32)
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({
        example: 'tennisgratismx@gmail.com',
        description: 'correo del estafador del incidente'
    })
    @IsEmail()
    @MaxLength(128)
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({
        example: 'Instagram',
        description: 'Aplicacion en la que ocurrio la estafa'
    })
    @IsString()
    @MaxLength(30)
    @IsOptional()
    application?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Si el correo es anonimo o no, el default es false'
    })
    @IsBoolean()
    anonymous: boolean;

    @ApiPropertyOptional({
        example: '123132213123.png',
        description: 'Id de la imagen obtenido por el file upload'
    })
    @IsOptional()
    imageId?: string;
}
