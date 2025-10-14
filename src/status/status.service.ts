import { Injectable } from '@nestjs/common';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
    constructor(private readonly statusRepository: StatusRepository) {}

    async listStatuses() {
        return await this.statusRepository.getStatus();
    }

    async getAcceptedStatus() {
        return await this.statusRepository.findByName('Aceptado');
    }

    async getDeclinedStatus() {
        return await this.statusRepository.findByName('Rechazado');
    }
}
