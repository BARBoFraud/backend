import { Module } from '@nestjs/common';
import { InitializationService } from './initialization.service';
import { AdminsService } from '../admins/admins.service';
import { AdminsModule } from '../admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '../entities/status.entity';
import { Category } from '../entities/category.entity';
import { Admin } from '../entities/admin.entity';

@Module({
    providers: [InitializationService, AdminsService],
    imports: [
        AdminsModule,
        TypeOrmModule.forFeature([Admin, Status, Category])
    ],
    exports: [InitializationService]
})
export class InitializationModule {}
