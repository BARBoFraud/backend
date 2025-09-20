import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities//user.entity';
import { Admin } from './entities/admin.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './admins/admins.module';
import { Category } from './entities//category.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Reporte } from './entities/reporte.entity';
import { Status } from './entities/status.entity';
import { InitializationService } from './common/services/initialization.service';

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
    controllers: [],
    providers: [InitializationService]
})
export class AppModule {}
