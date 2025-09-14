import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminsAuthGuard } from '../common/guards/admins-auth.guard';
import type { UserAuthenticatedRequest } from '../common/interfaces/authenticated-requests';

@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Post('/register')
    async createAdmin(@Body() createAdminDto: CreateAdminDto) {
        return await this.adminsService.createAdmin(createAdminDto);
    }

    @Get('/profile')
    @UseGuards(AdminsAuthGuard)
    getProfile(@Req() req: UserAuthenticatedRequest) {
        return this.adminsService.findById(req.user.id);
    }
}
