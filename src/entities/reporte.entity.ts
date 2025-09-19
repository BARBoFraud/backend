import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Status } from './status.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity()
export class Reporte {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, (user) => user.reportes)
    @JoinColumn({
        name: 'id_user'
    })
    user: User;

    @Column({
        name: 'id_user',
        nullable: true
    })
    idUser: number;

    @ManyToOne(() => Category, (category) => category.reportes)
    @JoinColumn({
        name: 'id_category'
    })
    category: Category;

    @Column({
        name: 'id_category'
    })
    idCategory: number;

    @ManyToOne(() => Status, (status) => status.reportes)
    @JoinColumn({
        name: 'id_status'
    })
    status: Status;

    @Column({
        name: 'id_status'
    })
    idStatus: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    date: Date;

    @Column({
        type: 'tinytext'
    })
    description: string;

    @Column({
        type: 'blob',
        nullable: true
    })
    image: Buffer;

    @Column({
        type: 'text',
        nullable: true
    })
    url: string;

    @Column({
        length: 256,
        nullable: true
    })
    website: string;

    @Column({
        name: 'social_media',
        length: 32,
        nullable: true
    })
    socialMedia: string;

    @Column({
        nullable: true
    })
    username: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        name: 'phone_number',
        length: 16,
        nullable: true
    })
    phoneNumber: string;

    @OneToMany(() => Like, (like) => like.report)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.report)
    comments: Comment[];
}
