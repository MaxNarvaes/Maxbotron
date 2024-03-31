import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { registerCommandTimeout } from "./commandHelper";
import { sendChat } from "../events/onPlayerChat";
import { Command } from "./commandInterface";


export class CmdMeMide extends Command {
    public commandId: string = "memide";
    public helpMan: string = "dice cuanto mide. !memide";
    public timeout: number = 30000;
    
    execute(byPlayer: PlayerObject, message: string[]): void {
        let key = this.commandId + byPlayer.auth;
    if (window.gameRoom.playerTimeouts.has(key)) {
        return;
    }
    sendChat(byPlayer, message.join(" "));
    const max: number = 50;
    var placeholder ={
        playerName: byPlayer.name,
        cm: Math.floor(Math.random() * Math.floor(max)),
        extra: message.slice(1).join(" ")
    };
    LangRes.message(Tst.maketext(LangRes.command.memide, placeholder), null, 2);

    let player = window.gameRoom.playerList.get(byPlayer.id);
    registerCommandTimeout(key, this.timeout, player!);
    }
}
