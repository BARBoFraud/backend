import { Module } from '@nestjs/common';
import { TokenService } from './tokens.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule],
    providers: [TokenService, AuthService],
    controllers: [AuthController],
    exports: [TokenService, AuthService]
})
export class AuthModule {}
