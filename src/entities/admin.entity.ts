import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 32,
        unique: true
    })
    username: string;

    @Column({
        length: 64
    })
    password: string;

    @Column({
        length: 32
    })
    salt: string;
}
