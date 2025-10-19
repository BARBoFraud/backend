import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MaxLength
} from 'class-validator';

export class UpdateReportDto {
    @ApiProperty({
        example: 1,
        description: 'Nueva categoria del reporte'
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        example: 'Estafa en Facebook',
        description: 'Nuevo titulo del reporte'
    })
    @IsString()
    @MaxLength(64)
    title: string;

    @ApiProperty({
        example: 'Sitio web fraudulento, me robaron 5000 pesos.',
        description: 'Nueva descripcion del reporte'
    })
    @IsString()
    @MaxLength(255)
    description: string;

    @ApiPropertyOptional({
        example: 'www.tennisgratis.com',
        description: 'Nueva url de la pagina web implicada'
    })
    @IsUrl()
    @IsOptional()
    url?: string;

    @ApiPropertyOptional({
        example: 'Tennis Gratis Mx',
        description: 'Nuevo nombre de la pagina web'
    })
    @IsString()
    @MaxLength(256)
    @IsOptional()
    website?: string;

    @ApiPropertyOptional({
        example: 'Instagram',
        description: 'Aplicacion en la que ocurrio la estafa'
    })
    @IsString()
    @MaxLength(30)
    @IsOptional()
    application?: string;

    @ApiPropertyOptional({
        example: '5627452471',
        description: 'Numero telefonico desde el que ocurrio el incidente'
    })
    @MaxLength(16)
    @IsOptional()
    phoneNumber?: string;

    @ApiPropertyOptional({
        example: 'Laura Gomez',
        description: 'username del estafador del incidente'
    })
    @IsString()
    @MaxLength(32)
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({
        example: 'tennisgratis@gmail.com',
        description: 'correo del estafador del incidente'
    })
    @IsEmail()
    @MaxLength(128)
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Si el correo es anonimo o no'
    })
    @IsBoolean()
    @IsOptional()
    anonymous?: boolean;

    @ApiPropertyOptional({
        example: '123132213123.png',
        description: 'Id de la imagen obtenido por el file upload'
    })
    @IsOptional()
    imageId?: string;
}
