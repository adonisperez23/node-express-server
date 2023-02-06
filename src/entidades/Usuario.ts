import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}