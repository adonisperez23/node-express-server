import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity } from "typeorm"
import {Factura} from "./Factura"
import {SoloLetras} from "../validadores/SoloLetras"
import {
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  IsEmail,
  IsString,
  IsHash,
  Validate
  } from "class-validator"

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length:50
        })
    @IsNotEmpty({message:"Debe ingresar su nombre y apellido"})
    @Length(3,50,{message:"Debe tener mas de 3 caracteres y no mas de 50 caracteres"})
    @IsString({message:"Solo debe contener caracteres"})
    @Validate(SoloLetras)
    nombre:string;

    @Column({
        type:"varchar",
        length:13
        })
    @IsNotEmpty({message:"Debe ingresar su numero de telefono"})
    @Length(13)
    @IsPhoneNumber("VE")
    telefono:string;

    @Column({
        type:"varchar",
        length:50,
        unique:true
    })
    @IsNotEmpty({message:"Debe ingresar su Email"})
    @IsEmail()
    email:string;

    @Column({
        type:"varchar",
        length:60
        })
    @IsNotEmpty({message:"Debe ingresar su clave"})
    clave:string;

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
