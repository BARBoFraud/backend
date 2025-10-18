import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RiskData } from './types/risk.types';
import { CountData } from 'src/common/types/graph.types';

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

    async getCounts(): Promise<CountData[]> {
        const sql = `
            SELECT
                ri.level as name,
                COALESCE(COUNT(r.id), 0) AS count
            FROM risk ri
            LEFT JOIN report r ON ri.id = r.id_risk
            GROUP BY ri.id, ri.level
        `;

        const [rows] = await this.db.getPool().query(sql);
        return rows as CountData[];
    }

    async getRiskList(): Promise<RiskData[]> {
        const sql = `
            SELECT
                id,
                level
            FROM risk;
        `;

        const [rows] = await this.db.getPool().query(sql);
        return rows as RiskData[];
    }
}
