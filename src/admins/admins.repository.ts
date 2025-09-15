import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ResultSetHeader } from 'mysql2';
import { AdminDb, CreateAdminData } from './types/admin.types';

@Injectable()
export class AdminsRepository {
    constructor(private readonly dbService: DbService) {}

    async createAdmin(admin: CreateAdminData): Promise<number> {
        const sql = `
            INSERT INTO admin(username, password, salt) VALUES
                (?,?,?)
        `;
        const [result] = await this.dbService
            .getPool()
            .query<ResultSetHeader>(sql, [
                admin.username,
                admin.password,
                admin.salt
            ]);
        return result.insertId;
    }

    async findByUsername(username: string): Promise<AdminDb | null> {
        const sql = `SELECT * FROM admin WHERE username = ?`;
        const [result] = await this.dbService.getPool().query(sql, [username]);
        const admins = result as AdminDb[];
        return admins[0] || null;
    }

    async findById(id: number): Promise<AdminDb | null> {
        const sql = `SELECT * FROM admin WHERE id = ?`;
        const [result] = await this.dbService.getPool().query(sql, [id]);
        const admins = result as AdminDb[];
        return admins[0] || null;
    }

    async deleteAdmin(id: number): Promise<number> {
        const sql = 'DELETE FROM admin WHERE id = ?';
        const [result] = await this.dbService
            .getPool()
            .query<ResultSetHeader>(sql, [id]);
        return result.affectedRows;
    }
}
