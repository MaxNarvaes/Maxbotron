import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    uid!: number;

    @Column()
    ruid!: string;

    @Column()
    auth!: string; 

    @Column()
    conn!: string; 

    @Column()
    name!: string;

    @Column()
    rating!: number; 

    @Column()
    totals!: number; 

    @Column()
    disconns!: number; 

    @Column()
    wins!: number; 

    @Column()
    goals!: number; 

    @Column()
    assists!: number;

    @Column()
    ogs!: number;

    @Column()
    losePoints!: number; 

    @Column()
    balltouch!: number; 

    @Column()
    passed!: number; 

    @Column()
    mute!: boolean; 

    @Column()
    muteExpire!: number; 

    @Column()
    rejoinCount!: number; 

    @Column()
    superadmin!: boolean; 

    @Column()
    role!: string; 

    @Column()
    joinDate!: number;

    @Column()
    leftDate!: number; 

    @Column()
    malActCount!: number; 

    @Column()
    gk!: number;

    @Column()
    goalsAgainstGk!: number;

    @Column()
    hatTricks!: number;

    @Column()
    perfectGk!: number;
}