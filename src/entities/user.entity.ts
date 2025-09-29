import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Report } from './report.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @Column({
        name: 'last_name_1',
        length: 64
    })
    lastName1: string;

    @Column({
        name: 'last_name_2',
        length: 64
    })
    lastName2: string;

    @Column({
        length: 128,
        unique: true
    })
    email: string;

    @Column({
        length: 64
    })
    password: string;

    @Column({
        length: 32
    })
    salt: string;

    @Column({
        default: true
    })
    active: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
