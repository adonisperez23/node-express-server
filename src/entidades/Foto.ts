import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,BaseEntity } from "typeorm"
import {Producto} from "./Producto"
import {
  IsNotEmpty,
  IsAscii,
  Length,
  MaxLength,
  } from "class-validator"

@Entity()
export class Foto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:"varchar",
        length:20
    })
    @IsNotEmpty({message:"Debe ingresar un nombre para la foto"})
    @Length(3,20,{message:"El nombre de la foto debe tener mas de 3 caracteres y no mas de 20"})
    nombreFoto:string;

    @Column({
        type:"varchar",
        length:100
    })
    @IsNotEmpty({message:"Debe ingresar la direccion url de la foto"})
    @MaxLength(100,{message:"La direccion url solo puede contener 100 caracteres"})
    @IsAscii()
    direccionUrl:string;

    @ManyToOne(()=>Producto, (producto:any)=> producto.foto)
    producto:Producto;

}
