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
export class Report {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, (user) => user.reports)
    @JoinColumn({
        name: 'id_user'
    })
    user: User;

    @Column({
        name: 'id_user'
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
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'tinytext'
    })
    description: string;

    @Column({
        type: 'mediumtext',
        nullable: true
    })
    image: string;

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
