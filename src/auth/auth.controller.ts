import { Controller, Post, Body, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body('username') username: string, @Body('password') password: string) {
        try {
            const result = await this.authService.signUp(username, password);
            return result;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException('Username already exists.');
            }
            throw error;
        }
    }

    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        const jwt = await this.authService.login(username, password);

        if (!jwt) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        return jwt;
    }

}
