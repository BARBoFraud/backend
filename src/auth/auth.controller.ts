import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/users/login')
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        return await this.authService.loginUser(userLoginDto);
    }
}
