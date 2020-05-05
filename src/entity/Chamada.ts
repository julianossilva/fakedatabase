import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToMany, Connection } from "typeorm";
import { Canal } from "./Canal";
import { Campanha } from "./Campanha";
import { Lead } from "./Lead";

@Entity()
export class Chamada {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({
        type: "int",
        default: 0
    })
    clicks: number;

    @Column()
    investimento: number;

    @ManyToOne(type => Campanha, campanha => campanha.chamadas)
    campanha: Campanha;

    @ManyToOne(type => Canal, canal => canal.chamadas)
    canal: Canal;

    @OneToMany(type => Lead, lead => lead.chamada)
    leads: Lead[];

    @DeleteDateColumn()
    deletedDate: Date
}

export async function registraChamada(connection: Connection, nome: string, clicks: number, investimento: number, campanha: Campanha, canal: Canal) {

    const ChamadaRepository = connection.getRepository(Chamada);

    const chamada = new Chamada();
    chamada.nome = nome;
    chamada.clicks = clicks;
    chamada.investimento = investimento;
    chamada.campanha = campanha;
    chamada.canal = canal;
    await ChamadaRepository.save(chamada);

    return chamada;
}