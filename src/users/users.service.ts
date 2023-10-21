import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ username })
        if (user) {
            throw new ConflictException('Username already exists.');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password + salt, 10);

        const newUser = this.userRepository.create({
            username,
            salt,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    async findOneByUsername(username: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user || null;
    }

}
