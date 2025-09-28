import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Report } from 'src/entities/report.entity';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { HistoryReport, ShortReport } from './types/report.types';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private reportsRepository: Repository<Report>,
        @InjectRepository(Status)
        private statusRepository: Repository<Status>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    async createReport(
        userId: number,
        createReportDto: CreateReportDto
    ): Promise<void> {
        const category = await this.categoryRepository.findOneBy({
            name: createReportDto.category
        });

        if (!category) {
            throw new NotFoundException(
                'No existe una categoria con ese nombre'
            );
        }

        const status = await this.statusRepository.findOneBy({
            name: 'Pendiente'
        });

        if (!status) {
            throw new NotFoundException('No existe un estatus con ese nombre');
        }

        const newReport = this.reportsRepository.create({
            idUser: userId,
            idCategory: category.id,
            idStatus: status.id,
            description: createReportDto.description,
            image: createReportDto.image_id,
            url: createReportDto.url,
            website: createReportDto.website,
            socialMedia: createReportDto.socialMedia,
            username: createReportDto.username,
            email: createReportDto.email,
            phoneNumber: createReportDto.phoneNumber
        });

        await this.reportsRepository.save(newReport);
    }

    async getUserHistory(id: number): Promise<ShortReport[]> {
        const reports = await this.reportsRepository.find({
            relations: ['category', 'status'],
            where: {
                idUser: id
            },
            select: {
                id: true,
                description: true,
                url: true,
                website: true,
                socialMedia: true,
                phoneNumber: true,
                createdAt: true,
                username: true,
                email: true,
                category: { name: true },
                status: { name: true }
            }
        });

        return reports.map((r) => ({
            id: r.id,
            description: r.description,
            category: r.category.name,
            status: r.status.name,
            url: r.url,
            website: r.website,
            socialMedia: r.socialMedia,
            phoneNumber: r.phoneNumber,
            createdAt: r.createdAt,
            username: r.username,
            email: r.email
        }));
    }

    async getById(userId: number, reportId: number): Promise<HistoryReport> {
        const report = await this.reportsRepository.findOne({
            relations: ['category', 'status'],
            where: {
                id: reportId,
                idUser: userId
            },
            select: {
                id: true,
                description: true,
                url: true,
                website: true,
                socialMedia: true,
                phoneNumber: true,
                createdAt: true,
                username: true,
                email: true,
                category: { name: true },
                status: { name: true },
                user: { name: true }
            }
        });

        if (!report) {
            throw new NotFoundException('Reporte no encontrado');
        }

        if (report.image) {
            const baseUrl = 'http://localhost:3000';
            report.image = `${baseUrl}/public/uploads/${report.image}`;
        }

        return {
            ...report,
            category: report.category.name,
            status: report.status.name
        };
    }
}
