import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {
    CreateReportData,
    DashboardReport,
    FeedReport,
    HistoryReport,
    SearchQueryReport,
    SearchReport,
    ShortDashboardReport,
    ShortHistoryReport,
    UpdateReportData
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

    async updateReport(updateReportData: UpdateReportData): Promise<void> {
        const sql = `
            UPDATE report SET 
                id_category = ?, 
                id_status = ?, 
                description = ?, 
                url = ?, 
                website = ?,
                social_media = ?, 
                phone_number = ?, 
                image = ?, 
                username = ?, 
                email = ?, 
                anonymous = ?
            WHERE id = ? AND id_user = ?;
        `;
        await this.db
            .getPool()
            .query(sql, [
                updateReportData.categoryId,
                updateReportData.statusId,
                updateReportData.description,
                updateReportData.url,
                updateReportData.website,
                updateReportData.socialMedia,
                updateReportData.phoneNumber,
                updateReportData.imageId,
                updateReportData.username,
                updateReportData.email,
                updateReportData.anonymous,
                updateReportData.reportId,
                updateReportData.userId
            ]);
    }

    async getUserHistory(id: number): Promise<ShortHistoryReport[]> {
        const sql = `
            SELECT r.id,
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
        return rows as ShortHistoryReport[];
    }

    async getCompleteHistoryReport(
        userId: number,
        reportId: number
    ): Promise<HistoryReport> {
        console.log(userId);
        const sql = `
            SELECT 
                r.id,
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

    async getCompleteDashboardReport(reportId: number) {
        const sql = `
            SELECT 
                (IF(r.anonymous = TRUE, NULL, u.name)) AS name,
                (IF(r.anonymous = TRUE, NULL, u.last_name_1)) AS lastName,
                r.id,
                r.description,
                r.url,
                r.website,
                r.social_media as socialMedia,
                r.phone_number AS phoneNumber,
                r.created_at AS createdAt,
                r.username,
                r.email,
                r.image,
                c.name AS category
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN \`user\` u ON r.id_user = u.id
            WHERE r.id = ?
            LIMIT 1;
        `;

        const [rows] = await this.db.getPool().query(sql, [reportId]);
        return rows[0] as DashboardReport;
    }

    async getCompleteSearchReport(
        reportId: number,
        userId: number,
        statusId: number
    ): Promise<SearchReport> {
        const sql = `
           SELECT
                r.id,
                (IF(r.anonymous = TRUE, NULL, u.name)) AS name,
                (IF(r.anonymous = TRUE, NULL, u.last_name_1)) AS lastName,
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
                (IF(l_user.id_user IS NULL, FALSE, TRUE)) AS userLiked,
                COUNT(l_count.id_user) AS likesCount,
                COUNT(com.id) AS commentsCount
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN status s ON r.id_status = s.id
            INNER JOIN \`user\` u ON r.id_user = u.id
            LEFT JOIN \`like\` l_user ON l_user.id_report = r.id AND l_user.id_user = ?
            LEFT JOIN \`like\` l_count ON l_count.id_report = r.id
            LEFT JOIN comment com ON com.id_report = r.id
            WHERE r.id = ? AND r.id_status = ?
            GROUP BY r.id
            LIMIT 1;
        `;

        const [rows] = await this.db
            .getPool()
            .query(sql, [userId, reportId, statusId]);
        return rows[0] as SearchReport;
    }

    async searchReport(
        searchString: string,
        statusId: number
    ): Promise<SearchQueryReport[]> {
        const sql = `
            SELECT
                r.id,
                r.website,
                r.social_media AS socialMedia,
                r.email,
                r.phone_number AS phoneNumber
            FROM report r
            INNER JOIN status s ON r.id_status = s.id
            WHERE s.id = ?
            AND (r.description LIKE ?
            OR r.url LIKE ?
            OR r.website LIKE ?
            OR r.social_media LIKE ?
            OR r.phone_number LIKE ?
            OR r.username LIKE ?
            OR r.email LIKE ?)
            ORDER BY r.id ASC;
        `;
        const [rows] = await this.db
            .getPool()
            .query(sql, [
                statusId,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`,
                `%${searchString}%`
            ]);
        return rows as SearchQueryReport[];
    }

    async getFeedReports(
        statusId: number,
        userId: number
    ): Promise<FeedReport[]> {
        const sql = `
            SELECT
                r.id,
                (IF(r.anonymous = TRUE, NULL, u.name)) AS name,
                (IF(r.anonymous = TRUE, NULL, u.last_name_1)) AS lastName,
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
                (IF(l_user.id_user IS NULL, FALSE, TRUE)) AS userLiked,
                COUNT(l_count.id_user) AS likesCount,
                COUNT(com.id) AS commentsCount
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN status s ON r.id_status = s.id
            INNER JOIN \`user\` u ON r.id_user = u.id
            LEFT JOIN \`like\` l_user ON l_user.id_report = r.id AND l_user.id_user = ?
            LEFT JOIN \`like\` l_count ON l_count.id_report = r.id
            LEFT JOIN comment com ON com.id_report = r.id
            WHERE s.id = ?
            GROUP BY r.id
            ORDER BY r.created_at DESC
        `;
        const [rows] = await this.db.getPool().query(sql, [userId, statusId]);
        return rows as FeedReport[];
    }

    async evaluateReport(reportId: number, statusId: number): Promise<void> {
        const sql = `
            UPDATE report
            SET id_status = ?
            WHERE id = ?;`;
        await this.db.getPool().query(sql, [statusId, reportId]);
    }

    async getForDashboardByStatus(
        statusId: number
    ): Promise<ShortDashboardReport[]> {
        const sql = `
            SELECT 
                r.id,
                (IF(r.anonymous = TRUE, NULL, u.name)) AS name,
                (IF(r.anonymous = TRUE, NULL, u.last_name_1)) AS lastName,
                r.url,
                r.website,
                r.social_media AS socialMedia,
                r.phone_number AS phoneNumber,
                r.created_at AS createdAt,
                r.username,
                r.email,
                c.name AS category
            FROM report r
            INNER JOIN category c ON r.id_category = c.id
            INNER JOIN \`user\` u ON r.id_user = u.id
            WHERE r.id_status = ?
            ORDER BY r.created_at ASC;
        `;

        const [rows] = await this.db.getPool().query(sql, [statusId]);
        return rows as ShortDashboardReport[];
    }
}
