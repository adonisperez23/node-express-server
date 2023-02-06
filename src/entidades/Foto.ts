import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import {Menu} from "./Menu"

@Entity()
export class Foto {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({
        type:"varchar",
        length:20
    })
    nombre:string;
    
    @Column({
        type:"varchar",
        length:100
    })
    url:string;
    
    @OneToOne(()=>Menu)
    @JoinColumn()
    menu:Menu;
}