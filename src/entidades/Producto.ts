import { Entity, PrimaryGeneratedColumn, Column, OneToMany,BaseEntity } from "typeorm";
import {Foto} from "./Foto";
import {Pedido} from "./Pedido";
import {
  Validate,
  IsNotEmpty,
  IsString,
  Length,
  IsAlpha,
  IsPhoneNumber,
  IsEmail,
  MaxLength,
  Max,
  IsInt,
  IsBoolean
  } from "class-validator"

@Entity()
export class Producto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length:30
    })
    @IsNotEmpty({message:"El producto debe tener un nombre"})
    @Length(3,30,{message:"El nombre del producto debe contener mas de 3 caracteres y no mas de 30"})
    @IsString()
    nombreProducto:string;

    @Column({
        type:"varchar",
        length:15
    })
    @IsNotEmpty({message:"El producto debe estar en una categoria"})
    @Length(4,15,{message:"El nombre de la categoria debe contener mas de 4 caracteres y no mas de 15"})
    @IsAlpha()
    categoria:string;

    @Column({
        type:"varchar",
        length:255
    })
    @MaxLength(255,{message:"Descripcion no debe tener mas de 255 caracteres"})
    descripcion:string;

    @Column("numeric")
    @IsNotEmpty({message:"Ingrese precio del producto"})
    @Max(15,{message:"El precio no debe exceder de mas 15 dolares"})
    precio:number;

    @Column("boolean")
    @IsNotEmpty({message:"Indique si es esta o no disponible el producto"})
    @IsBoolean({message:"Dato ingresado no es de tipo boleano"})
    disponible:boolean;

    @OneToMany(()=>Foto, (foto:any) => foto.producto)
    foto: Foto[];

    @OneToMany(()=>Pedido, (pedido:any) => pedido.producto)
    pedido: Pedido[];
}
