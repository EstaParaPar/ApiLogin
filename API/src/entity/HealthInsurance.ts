import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import { GroupPrices } from './GroupPrices';

@Entity()
export class HealthInsurance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @ManyToOne(type => GroupPrices)
    @JoinColumn()
    groupPrice: GroupPrices;

    @Column()
    @CreateDateColumn()
    createAT: Date;

    @Column()
    @UpdateDateColumn()
    uptadeAT: Date;



}
