import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsNumber, IsString, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportDto extends PartialType(CreateReportDto) {
    @ApiProperty({ example: 1, description: 'Categoria del reporte' })
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

    @ApiProperty({ example: true, description: 'Si el correo es anonimo o no' })
    @IsBoolean()
    anonymous: boolean;
}
