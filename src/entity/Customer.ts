import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @DeleteDateColumn()
    deletedDate: Date
}
