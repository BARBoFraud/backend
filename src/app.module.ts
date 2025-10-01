import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './admins/admins.module';
import { ImagesModule } from './files/images.module';
import { ReportsModule } from './reports/reports.module';
import { StatusModule } from './status/status.module';
import { CategoriesModule } from './categories/categories.module';
import { InitializationModule } from './initialization/initialization.module';
import { DbModule } from './db/db.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET
        }),
        UsersModule,
        AuthModule,
        AdminsModule,
        ImagesModule,
        ReportsModule,
        StatusModule,
        CategoriesModule,
        InitializationModule,
        DbModule
    ]
})
export class AppModule {}
