import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToOne, Connection } from "typeorm";
import { Campanha } from "./Campanha";
import { Venda } from "./Venda";

@Entity()
export class Proposta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "float",
        default: 0.0
    })
    ticket: number;

    @Column({
        type: "float",
        default: 0.0
    })
    investimento: number;

    @ManyToOne(type => Campanha, campanha => campanha.propostas)
    campanha: Campanha;

    @OneToOne(type => Venda, venda => venda.proposta)
    vendas: Venda[];

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraProposta(connection: Connection, investimento: number, ticket: number, campanha: Campanha) {

    const PropostaRepository = connection.getRepository(Proposta);

    const proposta = new Proposta();

    proposta.investimento = investimento;
    proposta.ticket = ticket;
    proposta.campanha = campanha;
    
    await PropostaRepository.save(proposta);

    return proposta;
}