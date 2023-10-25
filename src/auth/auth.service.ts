import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtResponse } from './interfaces/jwt-response.interface';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signUp(username: string, password: string) {
        const user = await this.usersService.createUser(username, password);
        const payload = { user_id: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async login(username: string, password: string): Promise<JwtResponse | null> {
        const user = await this.usersService.findOneByUsername(username);

        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password + user.salt, user.password);

        if (!isValid) {
            return null;
        }

        const payload: JwtPayload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}