import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, sha256 } from '../utils/hash/hash.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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
            lastName1: createUserDto.lastName1,
            lastName2: createUserDto.lastName2,
            email: createUserDto.email,
            password: hashed_password,
            salt
        });

        await this.usersRepository.save(newUser);
    }

    async findById(id: number): Promise<User> {
        return await this.usersRepository.findOneByOrFail({ id: id });
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({
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

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        const hasUpdates = Object.values(updateUserDto).some(
            (value) => value != null && value != undefined
        );

        if (!hasUpdates) {
            throw new UnprocessableEntityException(
                'Todos los campos estan vacios'
            );
        }
        await this.usersRepository.update(id, updateUserDto);
    }

    async deactivateUser(id: number): Promise<void> {
        await this.usersRepository.update(id, { active: false });
    }
}
