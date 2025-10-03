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
        const sql = `
            INSERT INTO report(id_category, id_status, description, url, website,
                social_media, phone_number, id_user, image, username, email, anonymous)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
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
                createReportData.email,
                createReportData.anonymous
            ]);
    }

    async getUserHistory(id: number): Promise<ShortReport[]> {
        const sql = `
            SELECT r.id,
                r.description,
                r.url,
                r.website,
                r.social_media AS socialMedia,
                r.phone_number AS phoneNumber,
                r.created_at AS createdAt,
                r.username,
                r.email,
                c.name AS category,
                s.name AS status
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN status s ON r.id_status = s.id
            WHERE r.id_user = ?
            ORDER BY r.created_at DESC;
        `;
        const [rows] = await this.db.getPool().query(sql, [id]);
        return rows as ShortReport[];
    }

    async getById(userId: number, reportId: number): Promise<HistoryReport> {
        const sql = `
            SELECT r.id,
                r.description,
                r.url,
                r.website,
                r.social_media AS socialMedia,
                r.phone_number AS phoneNumber,
                r.created_at AS createdAt,
                r.username,
                r.email,
                r.image,
                c.name AS category,
                s.name AS status
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN status s ON r.id_status = s.id
            WHERE r.id_user = ? AND r.id = ?
            LIMIT 1;
        `;
        const [rows] = await this.db.getPool().query(sql, [userId, reportId]);
        return rows[0] as HistoryReport;
    }

    async searchReport(
        searchString: string,
        statusId: number,
        userId: number
    ): Promise<FeedReport[]> {
        const sql = `
        SELECT 
            u.name,
            u.last_name_1 as lastName,
            r.id,
            c.name AS category,
            r.created_at AS createdAt,
            r.description,
            r.image,
            r.url,
            r.website,
            r.social_media AS socialMedia,
            r.username,
            r.email,
            r.phone_number AS phoneNumber,
            (SELECT COUNT(*) 
            FROM \`like\` l 
            WHERE l.id_report = r.id) AS likesCount,
            (SELECT COUNT(*) 
            FROM comment cm 
            WHERE cm.id_report = r.id) AS commentsCount,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM \`like\` ul 
                    WHERE ul.id_report = r.id 
                      AND ul.id_user = ?
                ) THEN TRUE 
                ELSE FALSE 
            END AS userLiked
        FROM report r
        INNER JOIN category c ON r.id_category = c.id
        INNER JOIN status s ON r.id_status = s.id
        INNER JOIN \`user\` u ON r.id_user = u.id
        WHERE s.id = ? 
        AND (r.description LIKE ? 
        OR r.url LIKE ? 
        OR r.website LIKE ? 
        OR r.social_media LIKE ?
        OR r.phone_number LIKE ? 
        OR r.username LIKE ? 
        OR r.email LIKE ?)
        ORDER BY r.created_at DESC;
    `;
        const [rows] = await this.db
            .getPool()
            .query(sql, [
                userId,
                statusId,
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

    async getFeedReports(
        statusId: number,
        userId: number
    ): Promise<FeedReport[]> {
        const sql = `
        SELECT 
            u.name,
            u.last_name_1 as lastName,
            r.id,
            c.name AS category,
            r.created_at AS createdAt,
            r.description,
            r.image,
            r.url,
            r.website,
            r.social_media AS socialMedia,
            r.username,
            r.email,
            r.phone_number AS phoneNumber,
            (SELECT COUNT(*) 
            FROM \`like\` l 
            WHERE l.id_report = r.id) AS likesCount,
            (SELECT COUNT(*) 
            FROM comment cm 
            WHERE cm.id_report = r.id) AS commentsCount,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM \`like\` ul 
                    WHERE ul.id_report = r.id 
                      AND ul.id_user = ?
                ) THEN TRUE 
                ELSE FALSE 
            END AS userLiked
        FROM report r
        INNER JOIN category c ON r.id_category = c.id
        INNER JOIN status s ON r.id_status = s.id
        INNER JOIN \`user\` u ON r.id_user = u.id
        WHERE s.id = ?
        ORDER BY r.created_at DESC;
        `;
        const [rows] = await this.db.getPool().query(sql, [userId, statusId]);
        return rows as FeedReport[];
    }

    async getPendingReports(statusId: number): Promise<FeedReport[]> {
        const sql = `
            SELECT r.id,
                r.description,
                r.url,
                r.website,
                r.social_media AS socialMedia,
                r.phone_number AS phoneNumber,
                r.created_at AS createdAt,
                r.username,
                r.email,
                r.image,
                c.name AS category
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN status s ON r.id_status = s.id
            WHERE s.id = ?
            ORDER BY r.created_at DESC;`;
        const [rows] = await this.db.getPool().query(sql, [statusId]);
        return rows as FeedReport[];
    }

    async evaluateReport(reportId: number, statusId: number): Promise<void> {
        const sql = `
            UPDATE report
            SET id_status = ?
            WHERE id = ?;`;
        await this.db.getPool().query(sql, [statusId, reportId]);
    }

    async likeReport(reportId: number, userId: number): Promise<void> {
        const sql = `
            INSERT INTO \`like\` (id_report, id_user)
            VALUES (?, ?);`;
        await this.db.getPool().query(sql, [reportId, userId]);
    }

    async unlikeReport(reportId: number, userId: number): Promise<void> {
        const sql = `
            DELETE FROM \`like\`
            WHERE id_report = ? AND id_user = ?;`;
        await this.db.getPool().query(sql, [reportId, userId]);
    }
}
