import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TokenService } from '../auth/tokens.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, TokenService],
    exports: [UsersService]
})
export class UsersModule {}
