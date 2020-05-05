import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, ManyToOne, Connection } from "typeorm";
import { Campanha } from "./Campanha";

@Entity()
export class LandingPage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({
        type: "int",
        default: 0
    })
    clicks: number;

    @Column({
        type: "float",
        default: 0.0
    })
    investimento: number;

    @ManyToOne(type => Campanha, campanha => campanha.landingPages)
    campanha: Campanha;

    @DeleteDateColumn()
    deletedDate: Date
}

export async function registerLandingPage(connection: Connection, nome: string, campanha: Campanha, investimento: number) {

    const LandingPageRepository = connection.getRepository(LandingPage);

    const landingPage = new LandingPage()
    landingPage.nome = nome;
    landingPage.campanha = campanha;
    landingPage.investimento = investimento;
    await LandingPageRepository.save(landingPage);

    return landingPage;
}