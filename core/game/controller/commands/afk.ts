import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { TeamID } from "../../model/GameObject/TeamID";
import { getUnixTimestamp } from "../Statistics";
import { roomActivePlayersNumber, recruitByOne } from "../../model/OperateHelper/Quorum";


export function cmdAfk(byPlayer: PlayerObject, message: string[]): void {
    var placeholder = {
        targetName: byPlayer.name
        , ticketTarget: byPlayer.id
        , targetAfkReason: ''
        , gameRuleNeedMin: window.gameRoom.config.rules.requisite.minimumPlayers,
    }
    if (window.gameRoom.playerList.get(byPlayer.id)!.permissions.afkmode === true) { // if this player is AFK
        window.gameRoom.playerList.get(byPlayer.id)!.permissions.afkmode = false; // return to active mode
        window.gameRoom.playerList.get(byPlayer.id)!.permissions.afkreason = ''; // init
        window.gameRoom.playerList.get(byPlayer.id)!.afktrace = { exemption: false, count: 0 }; // reset for afk trace

        if (window.gameRoom.config.settings.antiAFKFlood === true && window.gameRoom.playerList.get(byPlayer.id)!.permissions.mute === true) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.unAfk, placeholder), byPlayer.id, 0x479947, "normal", 1);
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.muteNotifyWarn, placeholder), byPlayer.id, 0xFF7777, "normal", 2);
        } else {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.unAfk, placeholder), null, 0x479947, "normal", 1);
        }
    } else { // if this player is not AFK (in active) equilibrar teams meter un spec
        if (window.gameRoom.config.settings.antiAFKAbusing === true && window.gameRoom.playerList.get(byPlayer.id)!.team !== TeamID.Spec) {
            // if in game situation and this player is in team, prevent AFK abusing
            window.gameRoom._room.sendAnnouncement(LangRes.antitrolling.afkAbusing.cannotReason, byPlayer.id, 0xFF7777, "normal", 2); //warn
            return; //abort this event
        }


        if (byPlayer.team !== TeamID.Spec) {
            window.gameRoom._room.setPlayerTeam(byPlayer.id, TeamID.Spec); // Moves this player to Spectators team.
            window.gameRoom.playerList.get(byPlayer.id)!.permissions.afkmode = true; // set afk mode
            window.gameRoom.playerList.get(byPlayer.id)!.permissions.afkdate = getUnixTimestamp(); // set afk beginning time stamp
            window.gameRoom.playerList.get(byPlayer.id)!.afktrace = { exemption: false, count: 0 }; // reset for afk trace
            // put new players into the team this player has left
            if (window.gameRoom.config.rules.autoOperating === true && window.gameRoom.isGamingNow === true) {
                recruitByOne();
            }
        }

        if (message !== undefined) { // if the reason is not skipped
            window.gameRoom.playerList.get(byPlayer.id)!.permissions.afkreason = message[1]; // set reason
            placeholder.targetAfkReason = message[1]; // update placeholder
        }

        if (window.gameRoom.config.settings.antiAFKFlood === true && window.gameRoom.playerList.get(byPlayer.id)!.permissions.mute === true) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.setAfk, placeholder), byPlayer.id, 0x479947, "normal", 1);
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.muteNotifyWarn, placeholder), byPlayer.id, 0xFF7777, "normal", 2);
        } else {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.setAfk, placeholder), null, 0x479947, "normal", 1);
        }

        if (window.gameRoom.config.settings.afkCommandAutoKick === true) {
            window.gameRoom._room.sendAnnouncement(LangRes.command.afk._WarnAfkTooLong, byPlayer.id, 0x479947, "normal", 1);
        }
    }
    // check number of players and change game mode
    if (window.gameRoom.config.rules.statsRecord === true && roomActivePlayersNumber() >= window.gameRoom.config.rules.requisite.minimumPlayers) {
        if (window.gameRoom.isStatRecord !== true) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.startRecord, placeholder), null, 0x00FF00, "normal", 0);
            window.gameRoom.isStatRecord = true;
        }
    } else {
        if (window.gameRoom.isStatRecord !== false) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.afk.stopRecord, placeholder), null, 0x00FF00, "normal", 0);
            window.gameRoom.isStatRecord = false;
        }
    }

    window._emitSIOPlayerStatusChangeEvent(byPlayer.id);
}
