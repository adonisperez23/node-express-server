import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, BaseEntity} from "typeorm"
import {Usuario} from "./Usuario"
import {Pedido} from "./Pedido"

@Entity()
export class Factura extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("date")
    fecha:string;
    
    @Column("time")
    hora:string;
    
    @Column("money")
    montoTotal:number;
    
    @OneToMany(()=>Pedido, (pedido:any)=>pedido.factura)
    pedido:Pedido[];
    
    @ManyToOne(()=>Usuario,(usuario:any)=>usuario.factura)
    usuario:Usuario;
    
}