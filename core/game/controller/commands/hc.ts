import * as RoleDefinitions from "../../resource/roleDefinitions";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { registerCommandTimeout } from "./commandHelper";
const timeout = 60000;
const commandId = "hc";
export function cmdHc(byPlayer: PlayerObject, message: string[]): void {
    let key = commandId + byPlayer.auth;
    if (window.gameRoom.playerTimeouts.has(key)) {
        return;
    }

    var placeholder = {
        "0": byPlayer.name,
        "1": window.gameRoom._room.getPlayerList()[Math.floor(Math.random() * window.gameRoom._room.getPlayerList().length)].name
    };

    window.gameRoom._room.sendAnnouncement(
        Tst.maketext(
            LangRes.command.hc.frases[Math.floor(Math.random() * LangRes.command.hc.frases.length)],
            placeholder),
        null,
        LangRes.style.colors.Golden,
        "normal",
        1);
    let player = window.gameRoom.playerList.get(byPlayer.id);
    registerCommandTimeout(key, timeout, player!);
}
