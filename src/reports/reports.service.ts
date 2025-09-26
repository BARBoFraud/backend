import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Report } from 'src/entities/report.entity';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

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
            throw new NotFoundException('No existe un status con ese nombre');
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
}
