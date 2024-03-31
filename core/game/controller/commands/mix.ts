import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { recruitBothTeamFully } from "../../model/OperateHelper/Quorum";
import * as LangRes from "../../resource/strings";
import { registerCommandTimeout } from "./commandHelper";
import { Command } from "./commandInterface";

export class CmdMix extends Command {
    public commandId: string = "mix";
    public helpMan: string = "Mezcla los equipos !mix";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        if (byPlayer && window.gameRoom.isGamingNow == false) {
            if (this.handlePermissions(byPlayer) == false) return;
        }

        recruitBothTeamFully();
        LangRes.message("Se mezclaron los equipos...")
    }

    handlePermissions(byPlayer: PlayerObject): boolean {
        var player = window.gameRoom.playerList.get(byPlayer.id);
        var key = this.commandId + byPlayer.auth;
        if (player!.permissions.role.key == "player" || player!.permissions.role.key == "visitor") {
            return false;
        }
        if (player) {
            registerCommandTimeout(key, this.timeout, player);
        }
        return true;
    }
}


