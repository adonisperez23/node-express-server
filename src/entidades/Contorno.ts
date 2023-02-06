import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Contorno {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type:"varchar",
        length:20
    })
    contorno: string;
    
    @Column({
        type:"varchar",
        length:20
    })
    tipo_contorno: string;
    
}