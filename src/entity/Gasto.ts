import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, ManyToOne, Connection } from "typeorm";
import { Chamada } from "./Chamada";
import { Campanha } from "./Campanha";

@Entity()
export class Gasto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    valor: number;

    @ManyToOne(type => Campanha, campanha => campanha.gastos)
    campanha: Campanha;

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraGasto(connection: Connection, nome: string, valor: number, campanha: Campanha) {

    const GastoRepository = connection.getRepository(Gasto)

    const gasto = new Gasto();
    gasto.nome = nome;
    gasto.valor = valor;
    gasto.campanha = campanha;
    GastoRepository.save(gasto);

    return gasto;
}