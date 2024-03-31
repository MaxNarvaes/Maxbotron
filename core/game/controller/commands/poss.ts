import * as LangRes from "../../resource/strings";
import * as Tst from "../Translator";
import { TeamID } from "../../model/GameObject/TeamID";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Command } from "./commandInterface";

export class CmdPoss extends Command {
    public commandId: string = "poss";
    public helpMan: string = "Calcula la posesion del balon";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        let placeholder = {
            possTeamRed: window.gameRoom.ballStack.possCalculate(TeamID.Red)
            ,possTeamBlue: window.gameRoom.ballStack.possCalculate(TeamID.Blue),
        }
        window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.poss, placeholder), byPlayer.id, 0x479947, "normal", 1);
    }
    
}