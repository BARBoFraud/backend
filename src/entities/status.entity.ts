import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 32
    })
    name: string;

    @OneToMany(() => Report, (reporte) => reporte.status)
    reportes: Report[];
}
