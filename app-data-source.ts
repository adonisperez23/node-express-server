import { DataSource } from "typeorm"
// configuracion de conexion a la instancia de bases de datos creada en elephant
const elephantDataSource = new DataSource({
    type: "postgres",
    host: "fanny.db.elephantsql.com",
    port: 5432,
    username: "esxdweyd",
    password: "hzDKV6iHdqTGokIQeT1MU1mqjC24oloV",
    database: "esxdweyd",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})
//configuracion de instancia de bases de datos local
const localDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "rlcmsdb",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})

export {localDataSource, elephantDataSource};