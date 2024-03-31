import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SuperAdminEntity {
    @PrimaryGeneratedColumn()
    uid!: number;

    @Column()
    ruid!: string;

    @Column()
    key!: string; 

    @Column()
    description!: string;

    @Column()
    validDays!: number;

    @Column()
    singleUse!: boolean;
}