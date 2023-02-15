import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, BaseEntity} from "typeorm"
import {Usuario} from "./Usuario"
import {Pedido} from "./Pedido"

@Entity()
export class Factura extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    fechaHora:string

    @Column("numeric")
    montoTotal:number;

    @OneToMany(()=>Pedido, (pedido:any)=>pedido.factura)
    pedido:Pedido[];

    @ManyToOne(()=>Usuario,(usuario:any)=>usuario.factura)
    usuario:Usuario;

}
