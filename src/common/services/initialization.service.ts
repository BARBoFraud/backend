import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminsService } from '../../admins/admins.service';

@Injectable()
export class InitializationService implements OnModuleInit {
    constructor(private readonly adminsService: AdminsService) {}

    async onModuleInit() {
        await this.initializeDefaultAdmin();
    }

    private async initializeDefaultAdmin(): Promise<void> {
        const adminCount = await this.adminsService.countAdmins();

        if (adminCount === 0) {
            await this.adminsService.createDefaultAdmin();
        }
    }
}
