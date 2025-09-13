import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { genSalt, sha256 } from 'src/utils/hash/hash.util';

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
}
