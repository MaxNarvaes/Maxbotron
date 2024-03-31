import * as RoleDefinitions from "../../resource/roleDefinitions";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { authorizeCommand, registerCommandTimeout } from "./commandHelper";
import { sendChat } from "../events/onPlayerChat";
import { Command } from "./commandInterface";

export class CmdHc extends Command {
    public commandId: string = "hc";
    public helpMan: string = "Comando misterioso. !hc";
    public timeout: number = 60000;;
    execute(byPlayer: PlayerObject, message: string[]): void {
        const exclude = ["visitor"]
    if (authorizeCommand(byPlayer, this.commandId, exclude) == false) return;

    
    sendChat(byPlayer, message.slice(1).join());
    var placeholder = {
        "0": byPlayer.name,
        "1": window.gameRoom._room.getPlayerList()[Math.floor(Math.random() * window.gameRoom._room.getPlayerList().length)].name
    };


    LangRes.message(Tst.maketext(LangRes.command.hc.frases[Math.floor(Math.random() * LangRes.command.hc.frases.length)],placeholder))
    let player = window.gameRoom.playerList.get(byPlayer.id);
    registerCommandTimeout(this.commandId + player!.auth, this.timeout, player!);
    }

}

