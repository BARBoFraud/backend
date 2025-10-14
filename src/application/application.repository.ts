import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ApplicationData } from './types/application.types';

@Injectable()
export class ApplicationRepository {
    constructor(private readonly db: DbService) {}

    async createApplication(name: string): Promise<void> {
        const sql = `
            INSERT INTO application(name)
            VALUES(?);
        `;

        await this.db.getPool().query(sql, [name]);
    }

    async findByName(level: string): Promise<ApplicationData | null> {
        const sql = `SELECT * FROM application WHERE name = ? LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [level]);
        const result = rows as ApplicationData[];
        return result[0] || null;
    }
}
