import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
})

export {AppDataSource};

//NOTA: ejemplo de archivo de configuracion para creacion de instancia con la bases de datos a usar