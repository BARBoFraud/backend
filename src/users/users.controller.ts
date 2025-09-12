import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersAuthGuard } from 'src/common/guards/users-auth.guard';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-requests';

@ApiTags('Modulo de usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Endpoint de registro de usuarios' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get('/profile')
    @UseGuards(UsersAuthGuard)
    getProfile(@Req() req: AuthenticatedRequest) {
        return { profile: req.user.profile };
    }
}
