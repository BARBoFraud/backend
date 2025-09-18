import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Reporte } from '../reporte/reporte.entity';

@Entity()
export class Comment {
    @PrimaryColumn({
        name: 'id_user'
    })
    idUser: number;

    @PrimaryColumn({
        name: 'id_report'
    })
    idReport: number;

    @Column({
        length: 128
    })
    content: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({
        name: 'id_user'
    })
    user: User;

    @ManyToOne(() => Reporte, (reporte) => reporte.comments)
    @JoinColumn({
        name: 'id_report'
    })
    report: Reporte;
}
