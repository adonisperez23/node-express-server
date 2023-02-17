import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm"
import {Factura} from "./Factura"
import {Producto} from "./Producto"
import {
  IsNotEmpty,
  MaxLength,
  IsPositive,
  Max,
  IsInt
  } from "class-validator"

@Entity()
export class Pedido extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length:50
    })
    @MaxLength(50,{message:"La descripcion del pedido no puede tener mas de 50 caracteres"})
    descripcion:string;

    @Column("numeric")
    @IsNotEmpty({message:"Debe ingresarle un precio al pedido"})
    @IsInt({message:"El valor ingresado debe ser un numero entero"})
    @IsPositive({message:"El valor no puede ser un numero negativo"})
    @Max(15,{message:"El precio no puede ser mas de 15 dolares"})
    precio: number;

    @Column("int")
    @IsNotEmpty({message:"Debe ingresar la cantidad del pedido"})
    @IsInt({message:"Debe ser un numero entero"})
    @IsPositive({message:"Debe ser un numero positivo"})
    @Max(5,{message:"La cantidad no puede exceder de 5"})
    cantidad:number;

    @ManyToOne(()=>Producto, (producto:any)=>producto.pedido)
    producto:Producto

    @ManyToOne(()=>Factura, (factura:any)=>factura.pedido)
    factura:Factura

}
