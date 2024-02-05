import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { registerCommandTimeout } from "./commandHelper";
const timeout = 30000;
const commandId = "memide";
export function cmdMeMide(byPlayer: PlayerObject, message: string[]): void {
    let key = commandId + byPlayer.auth;
    if (window.gameRoom.playerTimeouts.has(key)) {
        return;
    }

    const max: number = 50;
    var placeholder ={
        playerName: byPlayer.name
        ,cm: Math.floor(Math.random() * Math.floor(max))
    };
    window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.memide, placeholder), null, LangRes.style.colors.Golden, "normal", 1);

    let player = window.gameRoom.playerList.get(byPlayer.id);
    registerCommandTimeout(key, timeout, player!);
}