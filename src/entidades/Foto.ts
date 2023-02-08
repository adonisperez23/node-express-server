import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {Producto} from "./Producto"

@Entity()
export class Foto {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({
        type:"varchar",
        length:20
    })
    nombreFoto:string;
    
    @Column({
        type:"varchar",
        length:100
    })
    direccionUrl:string;
    
    @ManyToOne(()=>Producto, (producto:any)=> producto.foto)
    producto:Producto;
}