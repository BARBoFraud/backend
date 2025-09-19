import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TokenService } from '../auth/tokens.service';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [AdminsController],
    providers: [AdminsService, TokenService],
    exports: [AdminsService]
})
export class AdminsModule {}
