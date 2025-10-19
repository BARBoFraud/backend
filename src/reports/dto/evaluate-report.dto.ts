import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EvaluateReportDto {
    @ApiProperty({
        example: 1,
        description: 'ID del reporte a evaluar'
    })
    @IsNumber()
    reportId: number;

    @ApiProperty({
        example: 1,
        description: 'Id del status al que se quiere cambiar el reporte'
    })
    @IsNumber()
    statusId: number;

    @ApiProperty({
        example: 2,
        description: 'Id del riesgo al que se quiere asignar el reporte'
    })
    @IsNumber()
    riskId: number;
}
