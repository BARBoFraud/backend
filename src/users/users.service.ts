import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, sha256 } from '../utils/hash/hash.util';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRepository.findByEmail(
            createUserDto.email
        );

        if (existingUser) {
            throw new HttpException(
                { error: 'Email already in use' },
                HttpStatus.CONFLICT
            );
        }

        const hash = sha256(createUserDto.password);
        const salt = genSalt();
        const hashed_password = sha256(hash + salt);

        const newId = await this.usersRepository.createUser({
            name: createUserDto.name,
            last_name1: createUserDto.last_name1,
            last_name2: createUserDto.last_name2,
            email: createUserDto.email,
            password: hashed_password,
            salt
        });

        return { message: `User inserted with id: ${newId}` };
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findByEmail(email);
    }
}
