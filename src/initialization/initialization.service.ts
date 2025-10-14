import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { StatusRepository } from 'src/status/status.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { RiskRepository } from 'src/risk/risk.repository';
import { ApplicationRepository } from 'src/application/application.repository';

@Injectable()
export class InitializationService implements OnModuleInit {
    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly statusRepository: StatusRepository,
        private readonly adminsService: AdminsService,
        private readonly riskRepository: RiskRepository,
        private readonly applicationRepository: ApplicationRepository
    ) {}

    async onModuleInit(): Promise<void> {
        await this.initializeConstants();
    }

    private async initializeConstants(): Promise<void> {
        const categories = [
            'Página de internet',
            'Red social',
            'Mensaje',
            'Llamada',
            'Correo electrónico'
        ];
        const status = ['Pendiente', 'Aceptado', 'Rechazado'];
        const risks = ['Alto', 'Medio', 'Bajo'];
        const applications = [
            'Instagram',
            'Facebook',
            'Tiktok',
            'AliExpress',
            'X',
            'Whatsapp'
        ];

        for (const categoryName of categories) {
            const exists =
                await this.categoriesRepository.findByName(categoryName);
            if (!exists) {
                await this.categoriesRepository.createCategory(categoryName);
            }
        }

        for (const statusName of status) {
            const exists = await this.statusRepository.findByName(statusName);

            if (!exists) {
                await this.statusRepository.createStatus(statusName);
            }
        }

        for (const riskName of risks) {
            const exists = await this.riskRepository.findByName(riskName);

            if (!exists) {
                await this.riskRepository.createRisk(riskName);
            }
        }

        for (const appName of applications) {
            const exists = await this.applicationRepository.findByName(appName);

            if (!exists) {
                await this.applicationRepository.createApplication(appName);
            }
        }

        const adminCount = await this.adminsService.countAdmins();
        if (adminCount === 0) {
            await this.adminsService.createDefaultAdmin();
        }
    }
}
