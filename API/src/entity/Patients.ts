import {Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, UpdateDateColumn, Unique} from 'typeorm';
import {MinLength, IsNotEmpty} from 'class-validator';

@Entity()
@Unique(['dni'])
export class Patients {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
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
