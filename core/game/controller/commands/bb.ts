import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";

export function cmdBb(byplayer: PlayerObject, message: string[]): void {
    window.gameRoom._room.kickPlayer(byplayer.id, Tst.maketext(LangRes.command.bb, { player: byplayer.name }), false)
    LangRes.SendConsole(Tst.maketext(LangRes.command.bb, { player: byplayer.name }));
}