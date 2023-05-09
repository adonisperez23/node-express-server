import { DataSource } from "typeorm"
import {Pedido} from "../entidades/Pedido"
import {Factura} from "../entidades/Factura"
import {Foto} from "../entidades/Foto"
import {Producto} from "../entidades/Producto"
import {Usuario} from "../entidades/Usuario"

export class LocalDataSource extends DataSource {
  constructor(){
    super({
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: "rlcmsdb",
          entities: [Factura,Foto,Pedido,Usuario,Producto],
          migrations:[],
          logging: true,
          synchronize: true,
      })
  }
}
