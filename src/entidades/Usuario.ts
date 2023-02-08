import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import {Factura} from "./Factura"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type:"varchar",
        length:50
        })
    nombre:string;
    
    @Column({
        type:"varchar",
        length:20
        })
    telefono:string;
    
    @Column({
        type:"varchar",
        length:50
    })
    email:string;
    
    @Column("boolean")
    esAdmin:boolean;
    
    @Column("boolean")
     activo:boolean;
    
    @CreateDateColumn()
    FechaRegistro:string
    
    @OneToMany(()=>Factura,(factura:any)=> factura.usuario)
    factura:Factura[];
}