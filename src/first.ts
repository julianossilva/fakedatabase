import { internet as fkInternet } from 'faker';
import { randomSelect } from './utils/random'
import { registraCampanha } from './entity/Campanha'
import { Connection } from 'typeorm'
import { Canal } from './entity/Canal';
import { registraChamada } from './entity/Chamada';
import { registerLandingPage } from './entity/LandingPage';
import { ConteudoFechado, registraConteudoFechado } from './entity/ConteudoFechado';
import { Proposta, registraProposta } from './entity/Proposta';
import { Lead, registraLead } from './entity/Lead';
import { Visualizacao, registraVisualizacao } from './entity/Visualizacao';
import { Venda, registraVenda } from './entity/Venda';
import { Gasto, registraGasto } from './entity/Gasto';


export const addFirstData = async (connection: Connection) => {

    const CanalRepository = connection.getRepository(Canal);
    const canal1 = await CanalRepository.findOne(1);
    const canal2 = await CanalRepository.findOne(2);
    const canal3 = await CanalRepository.findOne(3);
    const canal4 = await CanalRepository.findOne(4);
    const canal5 = await CanalRepository.findOne(5);
    const canal6 = await CanalRepository.findOne(6);
    const canal7 = await CanalRepository.findOne(7);


    let campanha = await registraCampanha(connection, "Deep Learning e Visão Computacional - 01/20");


    const chamada1 = await registraChamada(
        connection,
        "Chamada 1",
        15000,
        3000.0,
        campanha,
        canal1
    )

    const chamada2 = await registraChamada(
        connection,
        "Chamada 2",
        15000,
        4000.0,
        campanha,
        canal2
    )


    const landingPage1 = await registerLandingPage(
        connection,
        "Landing Page - Campanha 1",
        campanha,
        1000.0
    )


    const ConteudoFechadoRepository = connection.getRepository(ConteudoFechado);

    const conteudoFechado1 = await registraConteudoFechado(
        connection,
        "Redes Neurais vs Deep Learning",
        new Date(2019, 1, 1),
        campanha
    );

    const conteudoFechado2 = await registraConteudoFechado(
        connection,
        "Introdução ao Deep Learning",
        new Date(2019, 1, 1),
        campanha
    );

    const conteudoFechado3 = await registraConteudoFechado(
        connection,
        "Processamento canal2de Imagens Deep Learning",
        new Date(2019, 1, 1),
        campanha
    );

    const PropostaRepository = connection.getRepository(Proposta);

    const proposta1 = await registraProposta(
        connection,
        1000.0,
        490.90,
        campanha
    );


    const LeadRepository = connection.getRepository(Lead);
    const VisualizacaoRepository = connection.getRepository(Visualizacao);
    const VendaRepository = connection.getRepository(Venda);

    const qDias = 30;
    const n = 2300;
    const intervaloDeVendas = 7;

    for (let i = 0; i < n; i++) {

        console.log("iter: ", i)

        const dataInicial = new Date(2019, 2, 1);
        const intervaloDeTempo = (qDias - 1) / n;

        const lead = await registraLead(
            connection,
            fkInternet.email(),
            randomSelect([chamada1, chamada1, chamada2, chamada2, chamada2]),
            new Date(dataInicial.valueOf() + i * intervaloDeTempo * 8.64e+7)
        );

        if (Math.random() > 0.93) {
            continue;
        }
        const visualizacao1 = await registraVisualizacao(
            connection,
            lead,
            conteudoFechado1
        );

        if (Math.random() > 0.93) {
            continue;
        }
        const visualizacao2 = await registraVisualizacao(
            connection,
            lead,
            conteudoFechado2
        );

        if (Math.random() > 0.93) {
            continue;
        }
        const visualizacao3 = await registraVisualizacao(
            connection,
            lead,
            conteudoFechado3
        );

        if (Math.random() > 0.05) {
            continue;
        }

        const venda = await registraVenda(
            connection,
            proposta1,
            lead,
            new Date(dataInicial.valueOf() + qDias * 8.64e+7 + Math.random() * intervaloDeVendas * 8.64e+7)
        );

    }


    const GastoRepository = connection.getRepository(Gasto)


    const gasto1 = await registraGasto(
        connection,
        "Extra 1",
        500.0,
        campanha
    )
}