import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenService } from '../auth/tokens.service';
import { UsersRepository } from './users.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, TokenService, UsersRepository],
    exports: [UsersService]
})
export class UsersModule {}
