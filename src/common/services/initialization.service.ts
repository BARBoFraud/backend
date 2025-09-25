import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminsService } from '../../admins/admins.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/entities/status.entity';

@Injectable()
export class InitializationService implements OnModuleInit {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
        private readonly adminsService: AdminsService
    ) {}

    async onModuleInit(): Promise<void> {
        await this.initializeConstants();
    }

    private async initializeConstants(): Promise<void> {
        const categories = [
            'Pagina de internet',
            'Red social',
            'Mensaje',
            'Llamada',
            'Correo electronico'
        ];
        const status = ['Pendiente', 'Aceptado', 'Rechazado'];

        for (const categoryName of categories) {
            const exists = await this.categoriesRepository.findOneBy({
                name: categoryName
            });
            if (!exists) {
                await this.categoriesRepository.save(
                    this.categoriesRepository.create({ name: categoryName })
                );
            }
        }

        for (const statusName of status) {
            const exists = await this.statusRepository.findOneBy({
                name: statusName
            });

            if (!exists) {
                await this.statusRepository.save(
                    this.statusRepository.create({ name: statusName })
                );
            }
        }

        const adminCount = await this.adminsService.countAdmins();
        if (adminCount === 0) {
            await this.adminsService.createDefaultAdmin();
        }
    }
}
