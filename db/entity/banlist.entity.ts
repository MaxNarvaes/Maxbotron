import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BanEntity {
    @PrimaryGeneratedColumn()
    uid!: number;

    @Column()
    ruid!: string;

    @Column()
    conn!: string; 

    @Column()
    reason!: string;

    @Column()
    register!: number; 

    @Column()
    expire!: number; 
}