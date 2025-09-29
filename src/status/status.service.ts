import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusRepository: Repository<Status>
    ) {}

    async listStatuses() {
        const statuses = await this.statusRepository.find({
            select: {
                id: true,
                name: true
            }
        });

        return statuses;
    }
}
