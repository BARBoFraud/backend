import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AdminData, CreateAdminData, AdminDb } from './types/admin.types';

@Injectable()
export class AdminsRepository {
    constructor(private readonly db: DbService) {}

    async createAdmin(adminData: CreateAdminData): Promise<void> {
        const sql = `INSERT INTO admin(username, password, salt)
        VALUES(?,?,?);`;

        await this.db
            .getPool()
            .query(sql, [
                adminData.username,
                adminData.passwordHash,
                adminData.salt
            ]);
    }

    async count(): Promise<number> {
        const sql = `SELECT count(*) as count from admin;`;
        const [rows] = await this.db.getPool().query(sql);
        return rows[0]['count'];
    }

    async getProfile(id: number): Promise<AdminData> {
        const sql = `SELECT id, username FROM admin WHERE id = ? LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [id]);
        const result = rows as AdminData[];
        return result[0];
    }

    async findById(id: number): Promise<AdminDb | null> {
        const sql = `SELECT * FROM admin WHERE id = ? LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [id]);
        const result = rows as AdminDb[];
        return result[0] || null;
    }

    async findByUsername(username: string): Promise<AdminDb | null> {
        const sql = `SELECT * FROM admin WHERE username = ? LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [username]);
        const result = rows as AdminDb[];
        return result[0] || null;
    }

    async deleteAdmin(id: number): Promise<void> {
        const sql = `DELETE FROM admin WHERE id = ?;`;
        await this.db.getPool().query(sql, [id]);
    }

    async getAdmins(id: number): Promise<AdminData[]> {
        const sql = `SELECT id, username FROM admin WHERE id <> ?;`;
        const [rows] = await this.db.getPool().query(sql, [id]);
        return rows as AdminData[];
    }
}
