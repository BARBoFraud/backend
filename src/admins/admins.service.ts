import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { genSalt, sha256 } from '../utils/hash/hash.util';
import { AdminDb } from './types/admin.types';

@Injectable()
export class AdminsService {
    constructor(private readonly adminsRepository: AdminsRepository) {}

    async createAdmin(createAdminDto: CreateAdminDto) {
        const existingAdmin = await this.adminsRepository.findByUsername(
            createAdminDto.username
        );

        if (existingAdmin) {
            throw new HttpException(
                { error: 'Admin already exists' },
                HttpStatus.CONFLICT
            );
        }

        const hash = sha256(createAdminDto.password);
        const salt = genSalt();
        const hashed_password = sha256(hash + salt);

        const newId = await this.adminsRepository.createAdmin({
            username: createAdminDto.username,
            password: hashed_password,
            salt
        });

        return { message: `User inserted with id ${newId}` };
    }

    async validateAdmin(
        username: string,
        password: string
    ): Promise<AdminDb | null> {
        const admin = await this.adminsRepository.findByUsername(username);
        if (!admin) return null;
        const hashedPassword = admin.password;
        const salt = admin.salt;
        const hash = sha256(password);
        const newHash = sha256(hash + salt);
        if (newHash !== hashedPassword) return null;
        return admin;
    }

    async findById(id: number) {
        return await this.adminsRepository.findById(id);
    }
}
