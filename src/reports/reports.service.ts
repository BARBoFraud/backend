import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Report } from 'src/entities/report.entity';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { FilteredShortReport } from './types/report.types';

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

    async getUserHistory(id: number): Promise<FilteredShortReport[]> {
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

        return reports.map((r) => {
            const filtered: FilteredShortReport = {
                id: r.id,
                description: r.description,
                category: r.category.name,
                status: r.status.name,
                ...(r.url && { url: r.url }),
                ...(r.website && { website: r.website }),
                ...(r.socialMedia && { socialMedia: r.socialMedia }),
                ...(r.phoneNumber && { phoneNumber: r.phoneNumber }),
                ...(r.createdAt && { createdAt: r.createdAt.toISOString() }),
                ...(r.username && { username: r.username }),
                ...(r.email && { email: r.email })
            };

            return filtered;
        });
    }

    // TODO: Editar un reporte
}
