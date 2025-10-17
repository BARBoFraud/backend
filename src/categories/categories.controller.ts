import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UsersAuthGuard } from '../common/guards/users-auth.guard';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryData, CategoryId } from './types/categories.types';
import { CountData } from 'src/common/types/graph.types';

@ApiTags('Modulo de utilidades de categorias')
@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('/list')
    @ApiOperation({
        summary: 'Endpoint para obtener las categorias de reportes'
    })
    @ApiResponse({
        status: 200,
        description: 'Categorias obtenidos correctamente',
        example: [
            {
                id: 1,
                name: 'Página de internet'
            },
            {
                id: 2,
                name: 'Red social'
            },
            {
                id: 3,
                name: 'Mensaje'
            },
            {
                id: 4,
                name: 'Llamada'
            },
            {
                id: 5,
                name: 'Correo electrónico'
            }
        ]
    })
    @ApiResponse({ status: 500, description: 'Error en base de datos' })
    async getCategoriesList(): Promise<CategoryData[]> {
        return await this.categoriesService.listCategories();
    }

    @Get('/counts')
    @ApiOperation({
        summary: 'Endpoint para obtener el porcentaje de reportes por categoria'
    })
    @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
    async getCounts(): Promise<CountData[]> {
        return await this.categoriesService.getCounts();
    }

    @Get(':name')
    @UseGuards(UsersAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary:
            'Endpoint para obtener el ID de una categoria mediante el nombre'
    })
    @ApiResponse({
        status: 200,
        description: 'ID obtenido correctamente',
        example: {
            id: 1
        }
    })
    async getId(@Param('name') name: string): Promise<CategoryId> {
        return await this.categoriesService.getId(name);
    }
}
