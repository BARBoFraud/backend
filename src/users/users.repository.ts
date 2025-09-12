import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserData } from './types/user.types';
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
}
