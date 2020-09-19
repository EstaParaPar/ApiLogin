import {Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, UpdateDateColumn} from "typeorm";
import {MinLength, IsNotEmpty} from "class-validator";

@Entity()
export class Patients {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    name: string;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    lastname: string;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    dni: number;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;


}
