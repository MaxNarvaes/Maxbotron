import { Player } from "../../model/GameObject/Player";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { TeamID } from "../../model/GameObject/TeamID";
import { TeamInfo } from "../../model/GameObject/TeamInfo";
import { commentary } from "../../resource/strings";
import * as LangRes from "../../resource/strings";
import * as Tst from "../Translator";
import { sendChat } from "../events/onPlayerChat";
import { Command } from "./commandInterface";

export class CmdGk extends Command {
    commandId: string = "gk";
    helpMan: string = "Para ofrecerte como arquero del equipo. !gk para tomar o liberar el puesto";
    timeout: number = 1000;
    
    execute(byPlayer: PlayerObject, message: string[]): void {
        sendChat(byPlayer, message.join(" "));
    var player: Player = window.gameRoom.playerList.get(byPlayer.id)!
    var gkArray: Array<Player> = [...window.gameRoom.playerList.values()].filter((p: Player) => p.gk === true);
    var placeholder = {
        teamId: "",
        playerName: ""
    }
    if (byPlayer.team === TeamID.Blue) {
        if (gkArray.filter((p) => p.team === TeamID.Blue).length === 0 && player.gk !== true) {
            player.gk = true;
            player.currentAnimation = { ...player.animations.default[1] }
            player.animations.onKick
            player.matchRecord.gk = 1;
            placeholder.teamId = window.gameRoom.currentTeams.blue.longName;
            window.gameRoom.currentTeams.blueGoalKeeper = player;
            placeholder.playerName = player.name;
        } else {
            player.gk = false;
            player.currentAnimation = { ...player.animations.default[0] }
            placeholder.teamId = window.gameRoom.currentTeams.blue.longName;
            window.gameRoom.currentTeams.blueGoalKeeper = null;
            placeholder.playerName = player.name;
        }
    } else if (byPlayer.team === TeamID.Red) {
        if (gkArray.filter((p) => p.team === TeamID.Red).length === 0 && player.gk !== true) {
            player.gk = true;
            player.currentAnimation = { ...player.animations.default[1] }
            player.matchRecord.gk = 1;
            placeholder.teamId = window.gameRoom.currentTeams.red.longName;
            window.gameRoom.currentTeams.redGoalKeeper = player;
            placeholder.playerName = player.name;
        } else {
            player.gk = false;
            player.currentAnimation = { ...player.animations.default[0] }
            placeholder.teamId = window.gameRoom.currentTeams.blue.longName;
            window.gameRoom.currentTeams.blueGoalKeeper = null;
            placeholder.playerName = player.name;
        }
    }
    if (player.gk) {
        commentary(Tst.maketext(LangRes.command.gk.gkChange, placeholder))
    } else {
        commentary(Tst.maketext(LangRes.command.gk.missingGk, placeholder))
    }
    }
    
}