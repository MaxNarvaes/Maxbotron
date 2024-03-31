import { string } from "joi";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    uid!: number;

    @Column()
    ruid!: string;

    @Column({
        type: String,
        unique: false,
        nullable: false,
    })
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
    loses!: number; 

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

    @Column({
        type: Number,
        unique: false,
        nullable: true,
    })
    roleExpire!: number | null; 

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

    @Column()
    goalsPlusAssistsPerGame!: number

    @Column()
    goalsPerGame!: number

    @Column()
    goalsAgainstPerGame!: number

    @Column()
    oGsPerGame!: number

    @Column()
    assistsPerGame!: number

    @Column()
    winrate!: number

    @Column()
    passPercentage!: number
    
    @Column({
        type: String,
        unique: true,
        nullable: true,
    })
    username!: string | null;

    @Column({
        type: String,
        unique: false,
        nullable: true,
    })
    password!: string | null;

    @Column()
    warningCount!: number;


}