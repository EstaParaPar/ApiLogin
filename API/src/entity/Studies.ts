import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Users} from './Users';
import {StudiesType} from './StudiesType';
import {Machine} from './Machine';
import {PayOut} from './PayOut';



@Entity()

export class Studies {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Users)
    @JoinColumn()
    technician: Users;

    @ManyToOne(type => Users)
    @JoinColumn()
    doctor: Users;

    @ManyToOne(type => StudiesType)
    @JoinColumn()
    studieType: StudiesType;


    @ManyToOne(type => Machine)
    @JoinColumn()
    machine: Machine;

    @ManyToOne(type => PayOut)
    @JoinColumn()
    payOut: PayOut;

    @Column()
    state: number;

    @Column()
    @Column('double')
    currentPrice: number;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;


}
