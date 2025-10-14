import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async listCategories() {
        return await this.categoriesRepository.getCategories();
    }

    async getCounts() {
        return await this.categoriesRepository.getCounts();
    }
}
