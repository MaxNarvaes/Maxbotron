import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as LangRes from "../../resource/strings";

export function cmdFreeze(byPlayer: PlayerObject, message: string[]): void {
    if(window.gameRoom.playerList.get(byPlayer.id)!.admin == true) {
        if(window.gameRoom.isMuteAll == true) {
            window.gameRoom.isMuteAll = false; //off
            window.gameRoom._room.sendAnnouncement(LangRes.command.freeze.offFreeze, null, 0x6ECAFF, "normal", 1);
        } else {
            window.gameRoom.isMuteAll = true; //on
            window.gameRoom._room.sendAnnouncement(LangRes.command.freeze.onFreeze, null, 0x6ECAFF, "normal", 1);
        }

        window._emitSIOPlayerStatusChangeEvent(byPlayer.id);
    } else {
        window.gameRoom._room.sendAnnouncement(LangRes.command.freeze._ErrorNoPermission, byPlayer.id, 0x6ECAFF, "normal", 2);
    }
}
