import { randomInteger, shuffleArray } from "../../controller/RoomTools";
import { maketext } from "../../controller/Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../GameObject/PlayerObject";
import { TeamID } from "../GameObject/TeamID";

export function roomPlayersNumberCheck(): number {
    // return number of all players of this room (except bot host)
    return window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0).length;
}

export function roomActivePlayersNumber(): number {
    // return number of players actually atcivated(not afk)
    return window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false).length;
}

export function RecruitPlayerIfNecesary(activePlayersNumber: number, placeholderLeft: { playerID: number; playerName: string; playerStatsRating: number; playerStatsTotal: number; playerStatsDisconns: number; playerStatsWins: number; playerStatsGoals: number; playerStatsAssists: number; playerStatsOgs: number; playerStatsLosepoints: number; gameRuleName: string; gameRuleLimitTime: number; gameRuleLimitScore: number; gameRuleNeedMin: number; possTeamRed: number; possTeamBlue: number; streakTeamName: string; streakTeamCount: number; }, player: PlayerObject) {
    if (window.gameRoom.config.rules.statsRecord === true && activePlayersNumber >= window.gameRoom.config.rules.requisite.minimumPlayers) {
        if (window.gameRoom.isStatRecord === false) {
            window.gameRoom._room.sendAnnouncement(maketext(LangRes.onLeft.startRecord, null), null, 0x00FF00, "normal", 0);
            window.gameRoom.isStatRecord = true;
        }
        // when auto emcee mode is enabled
        if (window.gameRoom.config.rules.autoOperating === true && window.gameRoom.isGamingNow === true) {
            if (player.team !== TeamID.Spec) {
                // put new players into the team this player has left
                recruitByOne();
            }
        }
    } else {
        if (window.gameRoom.isStatRecord === true) {
            window.gameRoom._room.sendAnnouncement(maketext(LangRes.onLeft.stopRecord, null), null, 0x00FF00, "normal", 0);
            window.gameRoom.isStatRecord = false;
            // when auto emcee mode is enabled and lack of players
            if (window.gameRoom.config.rules.autoOperating === true && window.gameRoom.isGamingNow === true) {
                window.gameRoom._room.stopGame(); // stop for start readymode game
                window.gameRoom.winningStreak = {
                    count: 0,
                    teamID: 0
                };
            }
        }
    }
}

export function roomTeamPlayersNumberCheck(team: TeamID): number {
    // return number of players in each team
    return window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && player.team === team).length;
}

export function fetchActiveSpecPlayers(): PlayerObject[] {
    return window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false && player.team === TeamID.Spec);
}

export function recruit(playerId: number) {
    const activePlayersList: PlayerObject[] = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false);
    const redPlayers = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Red);
    const redInsufficiency: number = window.gameRoom.config.rules.requisite.eachTeamPlayers - redPlayers.length;
    const bluePlayers = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Blue);
    const blueInsufficiency: number = window.gameRoom.config.rules.requisite.eachTeamPlayers - bluePlayers.length;

    if (redInsufficiency >= blueInsufficiency && redInsufficiency > 0) {
        window.gameRoom._room.setPlayerTeam(playerId, TeamID.Red);
    }
    if (redInsufficiency < blueInsufficiency && blueInsufficiency > 0) {
        window.gameRoom._room.setPlayerTeam(playerId, TeamID.Blue);
    }
}

export function recruitByOne() {
    const activePlayersList: PlayerObject[] = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false);
    const activeSpecPlayersList: PlayerObject[] = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Spec);
    const redPlayers = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Red);
    const redInsufficiency: number = window.gameRoom.config.rules.requisite.eachTeamPlayers - redPlayers.length;
    const bluePlayers = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Blue);
    const blueInsufficiency: number = window.gameRoom.config.rules.requisite.eachTeamPlayers - bluePlayers.length;

    if (redInsufficiency >= blueInsufficiency && redInsufficiency > 0) {
        if (activeSpecPlayersList.length > 0) {
            window.gameRoom._room.setPlayerTeam(activeSpecPlayersList[0].id, TeamID.Red);
        } else if (Math.abs(redInsufficiency - blueInsufficiency) > 1) {
            window.gameRoom._room.setPlayerTeam(bluePlayers[0].id, TeamID.Red);
        }
    }
    if (redInsufficiency < blueInsufficiency && blueInsufficiency > 0) {
        if (activeSpecPlayersList.length > 0) {
            window.gameRoom._room.setPlayerTeam(activeSpecPlayersList[0].id, TeamID.Blue);
        } else if (Math.abs(redInsufficiency - blueInsufficiency) > 1) {
            window.gameRoom._room.setPlayerTeam(redPlayers[0].id, TeamID.Blue);
        }

    }
}

export function allToSpec() {
    window.gameRoom._room.getPlayerList().forEach((p: PlayerObject) => window.gameRoom._room.setPlayerTeam(p.id, TeamID.Spec));
}

export function recruitBothTeamFully() {
    /* window.gameRoom.logger.i("recruitboth team", "recruit boith teams fully" );
    allToSpec();
    let activePlayersList: PlayerObject[] = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false);
    let activeSpecPlayersList: PlayerObject[] = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Spec);

    let flipTeam = true;
    

    let specLength =  activePlayersList.length;
    if (activePlayersList.length >= window.gameRoom.config.rules.requisite.eachTeamPlayers * 2) {
        specLength -= window.gameRoom.config.rules.requisite.eachTeamPlayers * 2
    }
    
    for (let i = 0; i > specLength; i++) {
        let player = activePlayersList[randomInteger(0, activePlayersList.length)];
        if (player.team != TeamID.Spec) {
            i--;
            continue;
        }
        window.gameRoom.logger.i("recruit both team fulldy " + i, "chosen player: " + player.id);
        if (flipTeam) {
            window.gameRoom._room.setPlayerTeam(player.id, TeamID.Red);
            flipTeam = false;
        } else {
            window.gameRoom._room.setPlayerTeam(player.id, TeamID.Blue);
            flipTeam = true;
        }
    } */
    // reroll randomly
    // get new active players list and shuffle it randomly
    let allPlayersList: PlayerObject[] = window.gameRoom._room.getPlayerList();
    let shuffledIDList: number[] = shuffleArray(allPlayersList
        .filter((eachPlayer: PlayerObject) => eachPlayer.id !== 0 && window.gameRoom.playerList.get(eachPlayer.id)!.permissions.afkmode === false)
        .map((eachPlayer: PlayerObject) => eachPlayer.id)
    );

    allPlayersList.forEach((eachPlayer: PlayerObject) => {
        window.gameRoom._room.setPlayerTeam(eachPlayer.id, TeamID.Spec); // move all to spec
    });

    let flipTeam = true;
    for (let i: number = 0; i < shuffledIDList.length; i++) {
        if (flipTeam) {
            window.gameRoom._room.setPlayerTeam(shuffledIDList[i], TeamID.Red)
            flipTeam = false;
        } else {
            window.gameRoom._room.setPlayerTeam(shuffledIDList[i], TeamID.Blue)
            flipTeam = true;
        }
    }
    window.gameRoom.logger.i('recruitBothTeamsFully', `All players are shuffled. (${shuffledIDList.toString()})`);

}
