import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import {Usuario} from "./Usuario"

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("date")
    fecha:string;
    
    @Column("time")
    hora:string;
    
    @Column("money")
    monto_total:number;
    
    @Column("json")
    pedido:object;
    
    @OneToOne(()=>Usuario)
    @JoinColumn()
    cliente:Usuario;
    
}