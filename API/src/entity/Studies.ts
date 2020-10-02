import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Users} from './Users';
import {StudiesType} from './StudiesType';
import {Machine} from './Machine';
import { PayOut } from './PayOut';
import { Patients } from './Patients';
import {HealthInsurance}from './HealthInsurance'


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
    studyDate: Date;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;
    
    @ManyToOne(type => Patients)
    @JoinColumn()
    idPatients: Patients;

    @ManyToOne(type => HealthInsurance)
    @JoinColumn()
    idHealthInsurance: HealthInsurance;


}
