import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Command } from "./commandInterface";
import { commandList } from "./commandList";

export class CmdHelp extends Command {
    public commandId: string = "help";
    public helpMan: string = "Comando de ayuda";
    public timeout: number = 0;
    execute(byPlayer: PlayerObject, message: string[]): void {
        if(message.length == 1) {
            let helpMan: string = "Para ver la ayuda de un comando escribi !help <nombre de comando>. \n Comandos: "
            Object.keys(commandList).forEach((c) => {
                helpMan += c + " - "
            })
            LangRes.message(helpMan, byPlayer.id)
        } else if (message.length > 1 && Object.keys(commandList).includes(message[1])) {
            let commandName = message[1]
            let helpMan = commandList[commandName as keyof typeof commandList].helpMan
            LangRes.message(helpMan, byPlayer.id)
        } else {
            LangRes.importantMessage("Comando " + message[1] + " no encontrado!", byPlayer.id)
        }
    }
}