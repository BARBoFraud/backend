import { Module } from '@nestjs/common';
import { AdminsModule } from 'src/admins/admins.module';
import { TokenService } from 'src/auth/tokens.service';
import { UsersModule } from 'src/users/users.module';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/entities/report.entity';
import { Status } from 'src/entities/status.entity';
import { Category } from 'src/entities/category.entity';
import { ReportsController } from './reports.controller';

@Module({
    imports: [
        UsersModule,
        AdminsModule,
        TypeOrmModule.forFeature([Report, Status, Category])
    ],
    providers: [TokenService, ReportsService],
    exports: [ReportsService],
    controllers: [ReportsController]
})
export class ReportsModule {}
