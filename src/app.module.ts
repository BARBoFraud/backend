import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Admin } from './admins/admin.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './admins/admins.module';
import { Category } from './category/category.entity';
import { Comment } from './comment/comment.entity';
import { Like } from './like/like.entity';
import { Reporte } from './reporte/reporte.entity';
import { Status } from './status/status.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Admin, User, Category, Comment, Like, Reporte, Status],
            synchronize: true
        }),
        UsersModule,
        AuthModule,
        AdminsModule
    ],
    controllers: []
})
export class AppModule {}
