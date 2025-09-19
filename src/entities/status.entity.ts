import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reporte } from './reporte.entity';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 32
    })
    name: string;

    @OneToMany(() => Reporte, (reporte) => reporte.status)
    reportes: Reporte[];
}
