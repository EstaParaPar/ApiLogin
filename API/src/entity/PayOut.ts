import {Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Users} from './Users';

@Entity()
export class PayOut {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;

    @ManyToOne(type => Users)
    @JoinColumn()
    doctor: Users;

    @ManyToOne(type => Users)
    @JoinColumn()
    technician: Users;

    @Column()
    @Column('double')
    totalPrice: Number;

    @Column()
    @Column('double')
    totalPriceTech: Number;

}
