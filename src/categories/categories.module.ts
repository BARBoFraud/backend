import { Module } from '@nestjs/common';
import { TokenService } from '../auth/tokens.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

@Module({
    controllers: [CategoriesController],
    providers: [TokenService, CategoriesService, CategoriesRepository],
    exports: [CategoriesRepository]
})
export class CategoriesModule {}
