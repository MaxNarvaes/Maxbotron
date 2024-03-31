import * as LangRes from "../../resource/strings";
import * as Tst from "../Translator";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { sendChat } from "../events/onPlayerChat";
import { Command } from "./commandInterface";
export class CmdTier extends Command {
    public commandId: string = "tier";
    public helpMan: string = "Muestra los rangos de la ladder";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        sendChat(byPlayer, message.join(" "));
    var tiers = "\nRangos: "
    window.gameRoom.config.HElo.tiers.forEach((t) => tiers += "\n" + t.avatar + ": " + t.name + " > " + t.rating + " puntos")
    LangRes.message(tiers, byPlayer.id);
    }

}
