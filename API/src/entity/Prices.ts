import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {StudiesType} from './StudiesType';
import { GroupPrices } from './GroupPrices';



@Entity()

export class Prices {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => StudiesType)
    @JoinColumn()
    studyType: StudiesType;

    @ManyToOne(type => GroupPrices)
    @JoinColumn()
    groupPrice: GroupPrices;

    @Column()
    @Column('double')
    totalPrice: number;

    @Column()
    @Column('double')
    techPrice: number;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;

}
