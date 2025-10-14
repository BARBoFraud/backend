import { Module } from '@nestjs/common';
import { InitializationService } from './initialization.service';
import { AdminsModule } from '../admins/admins.module';
import { StatusModule } from 'src/status/status.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { RiskModule } from 'src/risk/risk.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
    providers: [InitializationService],
    imports: [
        AdminsModule,
        StatusModule,
        CategoriesModule,
        RiskModule,
        ApplicationModule
    ],
    exports: [InitializationService]
})
export class InitializationModule {}
