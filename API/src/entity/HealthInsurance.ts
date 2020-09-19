import {Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, UpdateDateColumn} from "typeorm";
import {MinLength, IsNotEmpty} from "class-validator";

@Entity()
export class HealthInsurance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    name: string;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;


}
