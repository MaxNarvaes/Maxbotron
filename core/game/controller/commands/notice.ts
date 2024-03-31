import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Command } from "./commandInterface";

export class CmdNotice extends Command {
    public commandId: string = "notice";
    public helpMan: string = "Muestra el mensaje fijado actual";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        if(window.gameRoom.notice) {
            window.gameRoom._room.sendAnnouncement(window.gameRoom.notice, byPlayer.id, 0x479947, "normal", 1);
        } else {
            window.gameRoom._room.sendAnnouncement(LangRes.command.notice._ErrorNoMessage, byPlayer.id, 0xFF7777, "normal", 1);
        }
    }

}
