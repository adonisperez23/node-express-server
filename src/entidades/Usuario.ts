import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity } from "typeorm"
import {Factura} from "./Factura"

@Entity()
export class Usuario extends BaseEntity {
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
        length:50,
        unique:true
    })
    email:string;
    
    @Column({
        type:"boolean",
        default:false})
    esAdmin:boolean;
    
    @Column({
        type:"boolean",
        default:true})
    activo:boolean;
    
    @CreateDateColumn()
    FechaRegistro:string
    
    @OneToMany(()=>Factura,(factura:any)=> factura.usuario)
    factura:Factura[];
}