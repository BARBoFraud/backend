import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RiskData } from './types/risk.types';

@Injectable()
export class RiskRepository {
    constructor(private readonly db: DbService) {}

    async createRisk(level: string): Promise<void> {
        const sql = `
            INSERT INTO risk(level)
            VALUES(?);
        `;

        await this.db.getPool().query(sql, [level]);
    }

    async findByName(level: string): Promise<RiskData | null> {
        const sql = `SELECT * FROM risk WHERE level = ? LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [level]);
        const result = rows as RiskData[];
        return result[0] || null;
    }
}
