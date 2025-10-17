import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryData } from './types/categories.types';
import { CountData } from 'src/common/types/graph.types';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async listCategories(): Promise<CategoryData[]> {
        return await this.categoriesRepository.getCategories();
    }

    async getCounts(): Promise<CountData[]> {
        return await this.categoriesRepository.getCounts();
    }

    async getId(name: string) {
        const result = this.categoriesRepository.getId(name);

        if (!result) {
            throw new NotFoundException("Categoria no encontrada");
        }

        return result;
    }
}
