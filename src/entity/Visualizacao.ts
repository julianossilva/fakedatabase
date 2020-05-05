import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToMany, OneToOne, Connection } from "typeorm";
import { Canal } from "./Canal";
import { Campanha } from "./Campanha";
import { Lead } from "./Lead";
import { ConteudoFechado } from "./ConteudoFechado";

@Entity()
export class Visualizacao {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ConteudoFechado, conteudoFechado => conteudoFechado.visualizacoes)
    conteudoFechado: ConteudoFechado;

    @ManyToOne(type => Lead, lead => lead.visualizacoes)
    lead: Lead

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraVisualizacao(connection: Connection, lead: Lead, conteudoFechado: ConteudoFechado) {
    
    const VisualizacaoRepository = connection.getRepository(Visualizacao);

    const visualizacao = new Visualizacao();
    visualizacao.lead = lead;
    visualizacao.conteudoFechado = conteudoFechado;

    await VisualizacaoRepository.save(visualizacao);

    return visualizacao;
}
