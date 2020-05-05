import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToMany, Connection } from "typeorm";
import { Chamada } from "./Chamada";
import { LandingPage } from "./LandingPage";
import { ConteudoFechado } from "./ConteudoFechado";
import { Proposta } from "./Proposta";
import { Gasto } from "./Gasto";

@Entity()
export class Campanha {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToMany(type => Chamada, chamada => chamada.campanha)
    chamadas: Chamada[];

    @OneToMany(type => LandingPage, landingPage => landingPage.campanha)
    landingPages: LandingPage[];

    @OneToMany(type => ConteudoFechado, conteudoFechado => conteudoFechado.campanha)
    conteudosFechados: ConteudoFechado[];

    @OneToMany(type => Proposta, proposta => proposta.campanha)
    propostas: Proposta[];

    @OneToMany(type => Gasto, gasto => gasto.campanha)
    gastos: Gasto[];

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraCampanha(connection: Connection, nome: string) {

    const CampanhaRepository = connection.getRepository(Campanha);

    const campanha = new Campanha();
    campanha.nome = nome;
    await CampanhaRepository.save(campanha);

    return campanha;
}