import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { addFirstData } from "./first";
import { addCanais } from "./canais";

createConnection().then(async connection => {

    await addCanais(connection);
    await addFirstData(connection);

}).catch(error => console.log(error));
