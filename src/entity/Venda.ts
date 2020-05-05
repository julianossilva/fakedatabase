import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, Connection } from "typeorm";
import { Lead } from "./Lead";
import { Proposta } from "./Proposta";
import { type } from "os";

@Entity()
export class Venda {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;

    @ManyToOne(type => Proposta, proposta => proposta.vendas)
    proposta: Proposta;

    @OneToOne(type => Lead, lead => lead.venda)
    @JoinColumn()
    lead: Lead;

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraVenda(connection: Connection, proposta: Proposta, lead: Lead, data: Date) {

    const VendaRepository = connection.getRepository(Venda);

    const venda = new Venda();

    venda.proposta = proposta;
    venda.lead = lead;
    venda.data = data;
    
    await VendaRepository.save(venda);

    return venda;
}