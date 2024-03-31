import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { authorizeCommand } from "./commandHelper";
import { Command } from "./commandInterface";
import { sendMatchAnouncement } from "./ksk";

const timeout = 30000;
const commandId = "restart";

export class CmdRestart extends Command {
    public commandId: string = "restart";
    public helpMan: string = "reinicia la partida (no mezcla los equipos)";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        const exclude = ["visitor", "player", "vip", "supervip"]
        if (authorizeCommand(byPlayer, commandId, exclude) == false) return;
        window.gameRoom._room.stopGame();
    }

}