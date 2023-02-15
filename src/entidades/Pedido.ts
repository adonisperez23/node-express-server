import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm"
import {Factura} from "./Factura"
import {Producto} from "./Producto"

@Entity()
export class Pedido extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length:50
    })
    descripcion:string;

    @Column("numeric")
    precio: number;

    @Column("int")
    cantidad:number;

    @ManyToOne(()=>Producto, (producto:any)=>producto.pedido)
    producto:Producto

    @ManyToOne(()=>Factura, (factura:any)=>factura.pedido)
    factura:Factura

}
