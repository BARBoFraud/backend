import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, sha256 } from '../utils/hash/hash.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const existingUser = await this.usersRepository.findOneBy({
            email: createUserDto.email
        });

        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hash = sha256(createUserDto.password);
        const salt = genSalt();
        const hashed_password = sha256(hash + salt);

        const newUser = this.usersRepository.create({
            name: createUserDto.name,
            lastName1: createUserDto.last_name1,
            lastName2: createUserDto.last_name2,
            email: createUserDto.email,
            password: hashed_password,
            salt
        });

        await this.usersRepository.save(newUser);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneByOrFail({ email: email });
    }

    async findById(id: number): Promise<User> {
        return await this.usersRepository.findOneByOrFail({ id: id });
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOneByOrFail({
            email: email
        });
        if (!user) return null;
        const hashedPassword = user.password;
        const salt = user.salt;
        const hash = sha256(password);
        const newHash = sha256(hash + salt);
        if (newHash !== hashedPassword) return null;
        if (!user.active) return null;
        return user;
    }
}
