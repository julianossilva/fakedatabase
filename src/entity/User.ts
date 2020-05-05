import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @DeleteDateColumn()
    deletedDate: Date
}
