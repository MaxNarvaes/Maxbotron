import humanizeDuration from "humanize-duration";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { ClipInfo } from "../../model/RoomObject/ClipInfo";
import * as LangRes from "../../resource/strings";
import * as Tst from "../Translator";
import { registerHighlight } from "../RoomTools";
import { authorizeCommand, registerCommandTimeout } from "./commandHelper";
import { Command } from "./commandInterface";

export class CmdClip extends Command {
    public commandId: string = 'bb'
    public timeout: number = 1000;
    public helpMan: string = 'Salir de la sala. !bb';

    execute(byPlayer: PlayerObject, message: string[]): void {
        const exclude = ["visitor", "player"]
    if (authorizeCommand(byPlayer, this.commandId, exclude) == false) return;

    message = message.slice(1);
    
    const author = window.gameRoom.playerList.get(byPlayer.id)!;
    if (author.permissions.role.key === 'player') {
        window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command._ErrorNoPermission, null), byPlayer.id, LangRes.style.colors.Red, "normal", null)
        return;
    }
    const description = message.length > 0 ? message.join(" ") : "";

    registerHighlight(description, author.name);
    LangRes.message(Tst.maketext(LangRes.command.clip.clipped, {authorName: author!.name, description: description}));
    let player = window.gameRoom.playerList.get(byPlayer.id)!
    registerCommandTimeout(this.commandId + player.auth, this.timeout, player);
    }

}


