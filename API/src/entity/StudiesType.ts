import {Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {MinLength, IsNotEmpty} from 'class-validator';

@Entity()
export class StudiesType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    @Column('double')
    price: number;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;


}
