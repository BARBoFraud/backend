import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CategoryData, PercentageData } from './types/categories.types';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly db: DbService) {}

    async createCategory(name: string): Promise<void> {
        const sql = `INSERT INTO category(name)
        VALUES(?);`;

        await this.db.getPool().query(sql, [name]);
    }

    async getCategories(): Promise<CategoryData[]> {
        const sql = `SELECT id, name FROM category;`;
        const [rows] = await this.db.getPool().query(sql);
        return rows as CategoryData[];
    }

    async findByName(name: string): Promise<CategoryData | null> {
        const sql = `SELECT * FROM category WHERE name = ? LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [name]);
        const result = rows as CategoryData[];
        return result[0] || null;
    }

    async getPercentages(): Promise<PercentageData[]> {
        const sql = `
            SELECT
              c.name,
              COALESCE(
                (COUNT(r.id) * 100.0) / (SELECT COUNT(*) FROM report),
                0
              ) AS percentage
            FROM category c
            LEFT JOIN report r ON c.id = r.id_category
            GROUP BY c.id
            ORDER BY percentage DESC;
        `;
        const [rows] = await this.db.getPool().query(sql);
        return rows as PercentageData[];
    }
}
