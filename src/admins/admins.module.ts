import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TokenService } from '../auth/tokens.service';
import { AdminsRepository } from './admins.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [AdminsController],
    providers: [AdminsService, TokenService, AdminsRepository],
    exports: [AdminsService, AdminsRepository]
})
export class AdminsModule {}
