import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admins')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Post('/register')
    async createAdmin(@Body() createAdminDto: CreateAdminDto) {
        console.log(createAdminDto.username);
        return await this.adminsService.createAdmin(createAdminDto);
    }
}
