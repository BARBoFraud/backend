import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reporte } from 'src/reporte/reporte.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 32
    })
    name: string;

    @OneToMany(() => Reporte, (reporte) => reporte.category)
    reportes: Reporte[];
}
