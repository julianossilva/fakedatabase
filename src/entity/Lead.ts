import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, ManyToOne, OneToOne, Connection } from "typeorm";
import { Chamada } from "./Chamada";
import { Visualizacao } from "./Visualizacao";
import { Venda } from "./Venda";

@Entity()
export class Lead {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    data: Date;

    @ManyToOne(type => Chamada, chamada => chamada.leads)
    chamada: Chamada;

    @OneToMany(type => Visualizacao, visualizacao => visualizacao.lead)
    visualizacoes: Visualizacao[];

    @OneToOne(type => Venda, venda => venda.lead)
    venda: Venda;

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraLead(connection: Connection, email: string, chamada: Chamada, data: Date) {

    const LeadRepository = connection.getRepository(Lead);

    const lead = new Lead();
    lead.email = email;
    lead.chamada = chamada;
    lead.data = data;

    await LeadRepository.save(lead);

    return lead;
}