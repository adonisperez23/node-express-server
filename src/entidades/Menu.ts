import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type:"varchar",
        length:20
    })
    menu:string;
    
    @Column({
        type:"varchar",
        length:50
    })
    clase_menu:string;
    
    @Column({
        type:"varchar",
        length:255
    })
    descripcion:string;
    
    @Column("money")
    precio:number
}