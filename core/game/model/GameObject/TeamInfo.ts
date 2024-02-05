import { TeamID } from "./TeamID";
import { TeamUniform } from "./TeamUniform";

export class TeamInfo {
    ID: TeamID;
    shortName: string;
    longName: string;
    country: string;
    uniform: TeamUniform[]

    constructor(ID: TeamID, shortName: string, longName: string, country: string, uniform: TeamUniform[]) {
        this.ID = ID;
        this.country = country;
        this.longName = longName;
        this.shortName = shortName;
        this.uniform = uniform;
    }
}