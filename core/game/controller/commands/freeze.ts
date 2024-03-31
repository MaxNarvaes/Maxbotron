import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as LangRes from "../../resource/strings";
import { Command } from "./commandInterface";

export class CmdFreeze extends Command {
    public commandId: string = 'freeze'
    public timeout: number = 1000;
    public helpMan: string = 'Congela el chat. !freeze';
    execute(byPlayer: PlayerObject, message: string[]): void {
        if(window.gameRoom.playerList.get(byPlayer.id)!.admin == true) {
            if(window.gameRoom.isMuteAll == true) {
                window.gameRoom.isMuteAll = false; //off
                window.gameRoom._room.sendAnnouncement(LangRes.command.freeze.offFreeze, null, 0x479947, "normal", 1);
            } else {
                window.gameRoom.isMuteAll = true; //on
                window.gameRoom._room.sendAnnouncement(LangRes.command.freeze.onFreeze, null, 0x479947, "normal", 1);
            }
    
            window._emitSIOPlayerStatusChangeEvent(byPlayer.id);
        } else {
            window.gameRoom._room.sendAnnouncement(LangRes.command.freeze._ErrorNoPermission, byPlayer.id, 0xFF7777, "normal", 2);
        }
    }
    
}
