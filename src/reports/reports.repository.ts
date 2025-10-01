import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {
    CreateReportData,
    FeedReport,
    HistoryReport,
    ShortReport
} from './types/report.types';

@Injectable()
export class ReportsRepository {
    constructor(private readonly db: DbService) {}

    async createReport(
        userId: number,
        createReportData: CreateReportData
    ): Promise<void> {
        const sql = `INSERT INTO report(id_category, id_status, description, 
        url, website, social_media, phone_number, id_user, image, username, email)
        VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
        await this.db
            .getPool()
            .query(sql, [
                createReportData.categoryId,
                createReportData.statusId,
                createReportData.description,
                createReportData.url,
                createReportData.website,
                createReportData.socialMedia,
                createReportData.phoneNumber,
                userId,
                createReportData.imageId,
                createReportData.username,
                createReportData.email
            ]);
    }

    async getUserHistory(id: number): Promise<ShortReport[]> {
        const sql = `SELECT r.id, r.description, r.url, r.website, r.social_media AS socialMedia,
        r.phone_number AS phoneNumber, r.created_at AS createdAt, r.username, r.email,
        c.name AS category, s.name AS status
        FROM report r
        JOIN category c ON r.id_category = c.id
        JOIN status s ON r.id_status = s.id
        WHERE r.id_user = ?
        ORDER BY r.created_at DESC;`;
        const [rows] = await this.db.getPool().query(sql, [id]);
        return rows as ShortReport[];
    }

    async getById(userId: number, reportId: number): Promise<HistoryReport> {
        const sql = `SELECT r.id, r.description, r.url, r.website, r.social_media AS socialMedia,
        r.phone_number AS phoneNumber, r.created_at AS createdAt, r.username, r.email,
        r.image, c.name AS category, s.name AS status
        FROM report r
        JOIN category c ON r.id_category = c.id
        JOIN status s ON r.id_status = s.id
        WHERE r.id_user = ? AND r.id = ?
        LIMIT 1;`;
        const [rows] = await this.db.getPool().query(sql, [userId, reportId]);
        return rows[0] as HistoryReport;
    }

    async searchReport(searchString: string): Promise<FeedReport[]> {
        const sql = `SELECT r.id, r.description, r.url, r.website, r.social_media AS socialMedia,
        r.phone_number AS phoneNumber, r.created_at AS createdAt, r.username, r.email,
        r.image, c.name AS category
        FROM report r
        JOIN category c ON r.id_category = c.id
        JOIN status s ON r.id_status = s.id
        WHERE s.name = 'aprobado' 
        AND (r.description LIKE ? OR r.url LIKE ? OR r.website LIKE ? OR r.social_media LIKE ?
        OR r.phone_number LIKE ? OR r.username LIKE ? OR r.email LIKE ?)`;
        const [rows] = await this.db
            .getPool()
            .query(sql, [
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`
            ]);
        return rows as FeedReport[];
    }

    async getFeedReports(): Promise<FeedReport[]> {
        const sql = `SELECT r.id, r.description, r.url, r.website, r.social_media AS socialMedia,
        r.phone_number AS phoneNumber, r.created_at AS createdAt, r.username, r.email,
        r.image, c.name AS category
        FROM report r
        JOIN category c ON r.id_category = c.id
        JOIN status s ON r.id_status = s.id
        WHERE s.name = 'aprobado'
        ORDER BY r.created_at DESC;`;
        const [rows] = await this.db.getPool().query(sql);
        return rows as FeedReport[];
    }
}
