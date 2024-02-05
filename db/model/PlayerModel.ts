export interface PlayerModel {
    auth: string;
    conn: string;
    name: string;
    rating: number;
    totals: number;
    disconns: number;
    wins: number;
    goals: number;
    assists: number;
    ogs: number;
    losePoints: number;
    balltouch: number;
    passed: number;
    mute: boolean;
    muteExpire: number;
    rejoinCount: number;
    superadmin: boolean;
    role: string;
    joinDate: number;
    leftDate: number;
    malActCount: number;
    gk: number;
    goalsAgainstGk: number;
    hatTricks: number;
    perfectGk: number;
}