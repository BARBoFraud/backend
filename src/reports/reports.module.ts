import { Module } from '@nestjs/common';
import { AdminsModule } from '../admins/admins.module';
import { TokenService } from '../auth/tokens.service';
import { UsersModule } from '../users/users.module';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { Status } from '../entities/status.entity';
import { Category } from '../entities/category.entity';
import { ReportsController } from './reports.controller';
import { StatusModule } from 'src/status/status.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ReportsRepository } from './reports.repository';

@Module({
    imports: [
        UsersModule,
        AdminsModule,
        TypeOrmModule.forFeature([Report, Status, Category]),
        StatusModule,
        CategoriesModule
    ],
    providers: [TokenService, ReportsService, ReportsRepository],
    exports: [ReportsService],
    controllers: [ReportsController]
})
export class ReportsModule {}
