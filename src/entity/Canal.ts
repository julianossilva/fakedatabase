import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from "typeorm";
import { Chamada } from "./Chamada";

@Entity()
export class Canal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToMany(type => Chamada, chamada  => chamada.canal)
    chamadas: Chamada[];

    @DeleteDateColumn()
    deletedDate: Date;
}
