import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    async listCategories() {
        return await this.categoriesRepository.getCategories();
    }

    async getPercentages() {
        return await this.categoriesRepository.getPercentages();
    }
}
