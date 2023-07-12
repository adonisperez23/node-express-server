import { DataSource } from "typeorm"
import {Pedido} from "../entidades/Pedido"
import {Factura} from "../entidades/Factura"
import {Foto} from "../entidades/Foto"
import {Producto} from "../entidades/Producto"
import {Usuario} from "../entidades/Usuario"
require('dotenv').config()

export class LocalDataSource extends DataSource {
  constructor(){
    super({
          type: "postgres",
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [Factura,Foto,Pedido,Usuario,Producto],
          migrations:[],
          logging: true,
          synchronize: true,
      })
  }
}
