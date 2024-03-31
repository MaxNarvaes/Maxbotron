import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import * as StatCalc from "../Statistics";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { decideTier } from "../../model/Statistics/TierFunctions";
import { Player } from "../../model/GameObject/Player";
import { sendChat } from "../events/onPlayerChat";
import { Command } from "./commandInterface";


export class CmdStats extends Command {
    public commandId: string = "stats";
    public helpMan: string = "para ver tus stats";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        sendChat(byPlayer, "!showstats");
        let player = window.gameRoom.playerList.get(byPlayer.id)!;
        if (player.permissions.role.key == "visitor") {
            LangRes.message("No estas registrado y tus stats no se guardan! Registrate usando !register <usuario> <contraseña> (solo letras y numeros)", byPlayer.id);
            return;
        }
        let placeholder = createPlaceholder(byPlayer, player)
        let resultMsg: string = (isOnMatchNow(byPlayer.id))
            ? Tst.maketext(LangRes.command.stats.statsMsg + '\n' + LangRes.command.stats.matchAnalysis, placeholder)
            : Tst.maketext(LangRes.command.stats.statsMsg, placeholder)

        window.gameRoom._room.sendAnnouncement("📊 ¡STATS DE " + player?.name + "!", byPlayer.id, LangRes.style.colors.Orange, "bold", null);
        window.gameRoom._room.sendAnnouncement(resultMsg, null, LangRes.style.colors.Green, "normal", 1);
    }
}

export class CmdShowStats extends Command {
    public commandId: string = "showstats";
    public helpMan: string = "Muestra tus stats a toda la sala";
    public timeout: number = 1000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        sendChat(byPlayer, "!stats");
        let player = window.gameRoom.playerList.get(byPlayer.id);
        let placeholder = createPlaceholder(byPlayer, player)
        let resultMsg: string = (isOnMatchNow(byPlayer.id))
            ? Tst.maketext(LangRes.command.stats.statsMsg + '\n' + LangRes.command.stats.matchAnalysis, placeholder)
            : Tst.maketext(LangRes.command.stats.statsMsg, placeholder)

        window.gameRoom._room.sendAnnouncement("📊 ¡STATS DE " + player?.name + "!", byPlayer.id, LangRes.style.colors.Orange, "bold", null);
        window.gameRoom._room.sendAnnouncement(resultMsg, byPlayer.id, LangRes.style.colors.Green, "normal", 1);
    }

}
/**
 * Check if this player plays this match
 * @param id Player's ID
 */
function isOnMatchNow(id: number): boolean {
    if (window.gameRoom.isGamingNow && window.gameRoom.isStatRecord && window.gameRoom.playerList.get(id)?.team !== 0) return true;
    else return false;
}

function createPlaceholder(byPlayer: PlayerObject, player: Player | undefined) {
    return {
        ticketTarget: byPlayer.id,
        targetName: player!.name,
        targetAfkReason: player!.permissions.afkreason,
        targetStatsRatingAvatar: decideTier(player!.id).avatar,
        targetStatsRatingName: decideTier(player!.id).name,
        targetStatsRating: player!.stats.rating,
        targetStatsTotal: player!.stats.totals,
        targetStatsDisconns: player!.stats.disconns,
        targetStatsWins: player!.stats.wins,
        targetStatsLoses: player!.stats.totals - player!.stats.wins,
        targetStatsGoals: player!.stats.goals,
        targetStatsAssists: player!.stats.assists,
        targetPlayerPoints: player!.stats.rating,
        targetStatsOgs: player!.stats.ogs,
        targetPlayerGAPerGame: (player!.stats.goals + player!.stats.assists) / player!.stats.totals,
        targetStatsHatTricks: player!.stats.hatTricks,
        targetPlayerGks: player!.stats.gk,
        targetPlayerCleanSheet: player!.stats.perfectGk,
        targetPlayerGoalsAgainst: player!.stats.goalsAgainstGk,
        targetPlayerGoalsAgainstPerGame: player!.stats.goalsAgainstGk / player!.stats.gk,
        targetStatsLosepoints: player!.stats.losePoints,
        targetStatsWinRate: StatCalc.calcWinsRate(player!.stats.totals, player!.stats.wins),
        targetStatsPassSuccess: StatCalc.calcPassSuccessRate(player!.stats.balltouch, player!.stats.passed),
        targetStatsGoalsPerGame: StatCalc.calcGoalsPerGame(player!.stats.totals, player!.stats.goals),
        targetStatsAssistsPerGame: StatCalc.calcAssistsPerGame(player!.stats.totals, player!.stats.assists),
        targetStatsOgsPerGame: StatCalc.calcOGsPerGame(player!.stats.totals, player!.stats.ogs),
        targetStatsLostGoalsPerGame: StatCalc.calcLoseGoalsPerGame(player!.stats.totals, player!.stats.losePoints),
        targetStatsNowGoals: isOnMatchNow(byPlayer.id) ? player!.matchRecord.goals : 0,
        targetStatsNowAssists: isOnMatchNow(byPlayer.id) ? player!.matchRecord.assists : 0,
        targetStatsNowOgs: isOnMatchNow(byPlayer.id) ? player!.matchRecord.ogs : 0,
        targetStatsNowPassSuccess: isOnMatchNow(byPlayer.id) ? StatCalc.calcPassSuccessRate(player!.matchRecord.balltouch, player!.matchRecord.passed) : 0
    };
}

function hasRating(targetStatsID: number) {
    return window.gameRoom.playerList.get(targetStatsID)!.stats.totals < window.gameRoom.config.HElo.factor.placement_match_chances;
}

