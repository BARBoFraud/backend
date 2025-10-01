import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { FeedReport, HistoryReport, ShortReport } from './types/report.types';
import { StatusRepository } from 'src/status/status.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService {
    constructor(
        private reportsRepository: ReportsRepository,
        private statusRepository: StatusRepository,
        private categoryRepository: CategoriesRepository
    ) {}

    async createReport(
        userId: number,
        createReportDto: CreateReportDto
    ): Promise<void> {
        const status = await this.statusRepository.findByName('Pendiente');

        if (!status) {
            throw new NotFoundException('No existe un estatus con ese nombre');
        }

        await this.reportsRepository.createReport(userId, {
            ...createReportDto,
            statusId: status.id
        });
    }

    async getUserHistory(id: number): Promise<ShortReport[]> {
        return await this.reportsRepository.getUserHistory(id);
    }

    async getById(userId: number, reportId: number): Promise<HistoryReport> {
        const report = await this.reportsRepository.getById(userId, reportId);

        if (!report) {
            throw new NotFoundException('Reporte no encontrado');
        }

        if (report.image) {
            const baseUrl = process.env.BASE_URL;
            report.image = `${baseUrl}/public/uploads/${report.image}`;
        }

        return {
            ...report,
            category: report.category,
            status: report.status
        };
    }

    async searchReport(searchString: string): Promise<any[]> {
        const reports = await this.reportsRepository.searchReport(searchString);

        return reports;
    }
}
