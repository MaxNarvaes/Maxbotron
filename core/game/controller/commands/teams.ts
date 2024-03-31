import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Command } from "./commandInterface";
import { sendMatchAnouncement } from "./ksk";

export class CmdTeams extends Command {
    public commandId: string = "teams";
    public helpMan: string = "Muestra los equipos que estan jugando";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        sendMatchAnouncement();
    }
}
