import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { sendChat } from "../events/onPlayerChat";
import { Command } from "./commandInterface";

export class CmdBb extends Command {
    public commandId: string = 'bb'
    public timeout: number = 1000;
    public helpMan: string = 'Salir de la sala. !bb';
    execute(byPlayer: PlayerObject, message: string[]): void {
        sendChat(byPlayer, message.join(" "));
        window.gameRoom._room.kickPlayer(byPlayer.id, Tst.maketext(LangRes.command.bb, { player: byPlayer.name }), false)
        LangRes.message(Tst.maketext(LangRes.command.bb, { player: byPlayer.name }));
    }
}