import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { genSalt, sha256 } from '../utils/hash/hash.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>
    ) {}

    async createAdmin(createAdminDto: CreateAdminDto): Promise<void> {
        const existingAdmin = await this.adminsRepository.findOneBy({
            username: createAdminDto.username
        });

        if (existingAdmin) {
            throw new ConflictException('Username already in use');
        }

        const hash = sha256(createAdminDto.password);
        const salt = genSalt();
        const hashed_password = sha256(hash + salt);

        const newAdmin = this.adminsRepository.create({
            username: createAdminDto.username,
            password: hashed_password,
            salt
        });

        await this.adminsRepository.save(newAdmin);
    }

    async validateAdmin(
        username: string,
        password: string
    ): Promise<Admin | null> {
        const admin = await this.adminsRepository.findOneByOrFail({
            username: username
        });
        if (!admin) return null;
        const hashedPassword = admin.password;
        const salt = admin.salt;
        const hash = sha256(password);
        const newHash = sha256(hash + salt);
        if (newHash !== hashedPassword) return null;
        return admin;
    }

    async deleteAdmin(username: string): Promise<void> {
        const admin = await this.adminsRepository.findOneByOrFail({
            username: username
        });

        await this.adminsRepository.delete(admin.id);
    }

    async findById(id: number): Promise<Admin> {
        return await this.adminsRepository.findOneByOrFail({ id: id });
    }
}
