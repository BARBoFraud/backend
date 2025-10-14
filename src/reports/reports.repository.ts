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
            INSERT INTO report
                (id_category,
                id_status,
                title,
                description,
                url,
                website,
                phone_number,
                application,
                id_user,
                image,
                username,
                email,
                anonymous)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;
        await this.db
            .getPool()
            .query(sql, [
                createReportData.categoryId,
                createReportData.statusId,
                createReportData.title,
                createReportData.description,
                createReportData.url,
                createReportData.website,
                createReportData.phoneNumber,
                createReportData.application,
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
                title = ?,
                description = ?, 
                url = ?, 
                website = ?,
                application = ?, 
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
                updateReportData.title,
                updateReportData.description,
                updateReportData.url,
                updateReportData.website,
                updateReportData.application,
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
                r.title,
                r.created_at AS createdAt,
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
        const sql = `
            SELECT 
                r.id,
                r.title,
                r.description,
                r.url,
                r.website,
                r.application,
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

    async getCompleteDashboardReport(
        reportId: number
    ): Promise<DashboardReport> {
        const sql = `
            SELECT 
                (IF(r.anonymous = TRUE, NULL, u.name)) AS name,
                (IF(r.anonymous = TRUE, NULL, u.last_name_1)) AS lastName,
                r.id,
                r.title,
                r.description,
                r.url,
                r.website,
                r.application,
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
                ri.level as riskLevel,
                r.title,
                r.description,
                r.image,
                r.url,
                r.website,
                r.application,
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
            INNER JOIN risk ri on r.id_risk = ri.id
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
                r.created_at as createdAt,
                ri.level as riskLevel,
                r.title,
                c.name as category
            FROM report r
            INNER JOIN category c on r.id_category = c.id
            INNER JOIN risk ri ON r.id_risk = ri.id
            WHERE r.id_status = ?
            AND (r.description LIKE ?
            OR r.title LIKE ?
            OR r.url LIKE ?
            OR r.website LIKE ?
            OR r.application LIKE ?
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
                ri.level as riskLevel,
                r.created_at AS createdAt,
                r.title,
                r.description,
                r.image,
                r.url,
                r.website,
                r.application AS application,
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
            INNER JOIN risk ri ON r.id_risk = ri.id
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

    async evaluateReport(
        reportId: number,
        statusId: number,
        riskId: number
    ): Promise<void> {
        const sql = `
            UPDATE report
            SET 
                id_status = ?,
                id_risk = ?
            WHERE id = ?;`;
        await this.db.getPool().query(sql, [statusId, riskId, reportId]);
    }

    async getForDashboardByStatus(
        statusId: number
    ): Promise<ShortDashboardReport[]> {
        const sql = `
            SELECT 
                r.id,
                r.title,
                (IF(r.anonymous = TRUE, NULL, u.name)) AS name,
                (IF(r.anonymous = TRUE, NULL, u.last_name_1)) AS lastName,
                r.created_at AS createdAt,
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

    async findById(reportId: number): Promise<{ id: number }> {
        const sql = `
            SELECT id 
            FROM report 
            WHERE id = ?;
        `;
        const [rows] = await this.db.getPool().query(sql, [reportId]);
        return rows[0] || null;
    }
}
