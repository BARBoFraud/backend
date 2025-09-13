import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminsRepository } from './admins.repository';
import { TokenService } from 'src/auth/tokens.service';

@Module({
    controllers: [AdminsController],
    providers: [AdminsService, AdminsRepository, TokenService],
    exports: [AdminsService]
})
export class AdminsModule {}
