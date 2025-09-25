import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Report } from './report.entity';

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

    @ManyToOne(() => Report, (reporte) => reporte.comments)
    @JoinColumn({
        name: 'id_report'
    })
    report: Report;
}
