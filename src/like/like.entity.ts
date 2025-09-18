import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Reporte } from '../reporte/reporte.entity';

@Entity()
export class Like {
    @PrimaryColumn({
        name: 'id_user'
    })
    idUser: number;

    @PrimaryColumn({
        name: 'id_report'
    })
    idReport: number;

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({
        name: 'id_user'
    })
    user: User;

    @ManyToOne(() => Reporte, (reporte) => reporte.likes)
    @JoinColumn({
        name: 'id_report'
    })
    report: Reporte;
}
