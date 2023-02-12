import { Entity, PrimaryGeneratedColumn, Column, OneToMany,BaseEntity } from "typeorm"
import {Foto} from "./Foto"
import {Pedido} from "./Pedido"

@Entity()
export class Producto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type:"varchar",
        length:20
    })
    nombreProducto:string;
    
    @Column({
        type:"varchar",
        length:50
    })
    categoria:string;
    
    @Column({
        type:"varchar",
        length:255
    })
    descripcion:string;
    
    @Column("numeric")
    precio:number;
    
    @Column("boolean")
    disponible:boolean;
    
    @OneToMany(()=>Foto, (foto:any) => foto.producto)
    foto: Foto[];
    
    @OneToMany(()=>Pedido, (pedido:any) => pedido.producto)
    pedido: Pedido[];
}