import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, BaseEntity} from "typeorm"
import {Usuario} from "./Usuario"
import {Pedido} from "./Pedido"
import {
  IsNotEmpty,
  IsPositive,
  Max,
  IsInt
  } from "class-validator"

@Entity()
export class Factura extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    fechaHora:string

    @Column("numeric")
    @IsNotEmpty({message:"Debe ingresar el monto total de la factura"})
    @IsPositive({message:"Debe ser un numero positivo"})
    @Max(1000,{message:"El monto no puede superar los 1000 dolares"})
    montoTotal:number;

    @OneToMany(()=>Pedido, (pedido:any)=>pedido.factura)
    pedido:Pedido[];

    @ManyToOne(()=>Usuario,(usuario:any)=>usuario.factura)
    usuario:Usuario;

}
