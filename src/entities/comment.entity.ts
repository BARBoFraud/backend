import {
    Entity,
    ManyToOne,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';
import { Report } from './report.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        name: 'id_user'
    })
    idUser: number;

    @Column({
        name: 'id_report'
    })
    idReport: number;

    @Column({
        length: 128
    })
    content: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

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
