import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserData, UserDb } from './types/user.types';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class UsersRepository {
    constructor(private readonly dbService: DbService) {}

    async createUser(user: CreateUserData): Promise<number> {
        const sql = `
            INSERT INTO user (name, last_name1, last_name2, email, password, salt) VALUES
            (?,?,?,?,?,?)
        `;

        try {
            const [result] = await this.dbService
                .getPool()
                .query<ResultSetHeader>(sql, [
                    user.name,
                    user.last_name1,
                    user.last_name2,
                    user.email,
                    user.password,
                    user.salt
                ]);
            return result.insertId;
        } catch {
            throw new HttpException(
                { error: 'Database error' },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async findByEmail(email: string): Promise<UserDb | null> {
        const sql = `SELECT * FROM user WHERE email = ?`;
        const [result] = await this.dbService.getPool().query(sql, [email]);
        const users = result as UserDb[];
        return users[0] || null;
    }

    async findById(id: number): Promise<UserDb | null> {
        const sql = `SELECT * FROM user WHERE id = ?`;
        const [result] = await this.dbService.getPool().query(sql, [id]);
        const users = result as UserDb[];
        return users[0] || null;
    }
}
