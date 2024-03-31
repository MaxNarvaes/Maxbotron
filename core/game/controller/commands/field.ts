import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as LangRes from "../../resource/strings";
import { setStadium } from "../RoomTools";
import { authorizeCommand } from "./commandHelper";
import { Command } from "./commandInterface";

export class CmdField extends Command {
    public commandId: string = 'cancha'
    public timeout: number = 1000;
    public helpMan: string = 'Cambia la cancha si hay mucha o poca gente para la cancha actual. !cancha';

    execute(byPlayer: PlayerObject, message: string[]): void {
        const exclude = ["player", "visitor"]
        if (authorizeCommand(byPlayer, this.commandId, exclude) == false) return;
        setStadium();
    }
}

