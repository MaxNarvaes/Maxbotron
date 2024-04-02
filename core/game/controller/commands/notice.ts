import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";

export function cmdNotice(byPlayer: PlayerObject, message: string[]): void {
    if(window.gameRoom.notice) {
        window.gameRoom._room.sendAnnouncement(window.gameRoom.notice, byPlayer.id, 0x426AD6, "normal", 1);
    } else {
        window.gameRoom._room.sendAnnouncement(LangRes.command.notice._ErrorNoMessage, byPlayer.id, 0x426AD6, "normal", 1);
    }
}
