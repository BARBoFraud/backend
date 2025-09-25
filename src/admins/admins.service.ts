import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { genSalt, sha256 } from '../utils/hash/hash.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>
    ) {}

    async countAdmins(): Promise<number> {
        return await this.adminsRepository.count();
    }

    async createDefaultAdmin(): Promise<void> {
        const defaultUsername = 'admin';
        const defaultPassword = 'admin';

        const existingAdmin = await this.adminsRepository.findOneBy({
            username: defaultUsername
        });

        if (existingAdmin) {
            return;
        }

        const hash = sha256(defaultPassword);
        const salt = genSalt();
        const hashed_password = sha256(hash + salt);

        const defaultAdmin = this.adminsRepository.create({
            username: defaultUsername,
            password: hashed_password,
            salt
        });

        await this.adminsRepository.save(defaultAdmin);
    }

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

    async deleteAdmin(id: number): Promise<void> {
        await this.adminsRepository.delete(id);
    }

    async findById(id: number): Promise<Admin> {
        return await this.adminsRepository.findOneByOrFail({ id: id });
    }

    async getAdminList(id: number): Promise<Admin[]> {
        return await this.adminsRepository.find({
            select: ['id', 'username'],
            where: {
                id: Not(id)
            }
        });
    }
}
