import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToMany, Connection } from "typeorm";
import { Canal } from "./Canal";
import { Campanha } from "./Campanha";
import { Visualizacao } from "./Visualizacao";

@Entity()
export class ConteudoFechado {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    data: Date;

    @Column({
        type: "float",
        default: 0.0
    })
    investimento: number;

    @ManyToOne(type => Campanha, campanha => campanha.conteudosFechados)
    campanha: Campanha;

    @OneToMany(type => Visualizacao, visualizacao => visualizacao.conteudoFechado)
    visualizacoes: Visualizacao[];

    @DeleteDateColumn()
    deletedDate: Date;
}

export async function registraConteudoFechado(connection: Connection, nome: string, data: Date, campanha: Campanha) {

    const ConteudoFechadoRepository = connection.getRepository(ConteudoFechado);

    const conteudoFechado = new ConteudoFechado();

    conteudoFechado.nome = nome;
    conteudoFechado.data = data;
    conteudoFechado.campanha = campanha;

    await ConteudoFechadoRepository.save(conteudoFechado);
    return conteudoFechado
}