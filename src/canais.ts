import { Connection } from "typeorm";
import { Canal } from "./entity/Canal";

export async function addCanais(connection: Connection) {
    
    const CanalRepository = connection.getRepository(Canal);

    const canal1 = new Canal();
    canal1.nome = 'Facebook Ads';
    await CanalRepository.save(canal1);

    const canal2 = new Canal();
    canal2.nome = 'Google Ads';
    await CanalRepository.save(canal2);

    const canal3 = new Canal();
    canal3.nome = 'Youtube Ads';
    await CanalRepository.save(canal3);

    const canal4 = new Canal();
    canal4.nome = 'Instagram Ads';
    await CanalRepository.save(canal4);

    const canal5 = new Canal();
    canal5.nome = 'Site';
    await CanalRepository.save(canal5);

    const canal6 = new Canal();
    canal6.nome = 'Youtube Parceiro 1';
    await CanalRepository.save(canal6);

    const canal7 = new Canal();
    canal7.nome = 'Youtube Parceiro 2';
    await CanalRepository.save(canal7);

}