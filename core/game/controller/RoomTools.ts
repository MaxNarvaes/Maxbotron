import * as Tst from "./Translator";
import * as LangRes from "../resource/strings";
import { PlayerObject } from "../model/GameObject/PlayerObject";
import { convertTeamID2Name, TeamID } from "../model/GameObject/TeamID";
import { roomActivePlayersNumber } from "../model/OperateHelper/Quorum";
import { findStadiumByPlayersLength } from "../../lib/maps";
import { stadiumInfo } from "../../lib/maps/stadiumInfo";
import { StayCurrentLandscape } from "@material-ui/icons";
import { ClipInfo } from "../model/RoomObject/ClipInfo";

export function setDefaultStadiums(): void {
    // set stadium maps as default setting
    if (window.gameRoom.config.rules.statsRecord === true && window.gameRoom.isStatRecord === true) {
        window.gameRoom._room.setCustomStadium(window.gameRoom.stadiumData.default); // if game mode is 'stats'
    } else {
        window.gameRoom._room.setCustomStadium(window.gameRoom.stadiumData.training); // if game mode is 'ready'
    }
}

export function setStadium(): void {
    // set stadium maps as default setting
    let players: number = roomActivePlayersNumber();
    let stadium = findStadiumByPlayersLength(players);
    if(shouldChangeMap(stadium)) {
        if (window.gameRoom.isGamingNow) {
            window.gameRoom._room.stopGame();
        }
        window.gameRoom._room.setCustomStadium(stadium.stadiumText); // if game mode is 'stats'
        window.gameRoom.currentStadium = stadium;
    }
}

export function shouldChangeMap(stadium: stadiumInfo): boolean {
    
    if (window.gameRoom.currentStadium !== stadium) {
        return true;
    }
    else return false;
}

export function setDefaultRoomLimitation(): void {
    window.gameRoom._room.setScoreLimit(window.gameRoom.config.rules.requisite.scoreLimit);
    window.gameRoom._room.setTimeLimit(window.gameRoom.config.rules.requisite.timeLimit);
    window.gameRoom._room.setTeamsLock(window.gameRoom.config.rules.requisite.teamLock);
}

export function updateAdmins(): void {
    let placeholderUpdateAdmins = {
        playerID: 0,
        playerName: '',
        gameRuleName: window.gameRoom.config.rules.ruleName,
        gameRuleLimitTime: window.gameRoom.config.rules.requisite.timeLimit,
        gameRuleLimitScore: window.gameRoom.config.rules.requisite.scoreLimit,
        gameRuleNeedMin: window.gameRoom.config.rules.requisite.minimumPlayers,
        possTeamRed: window.gameRoom.ballStack.possCalculate(TeamID.Red),
        possTeamBlue: window.gameRoom.ballStack.possCalculate(TeamID.Blue),
        streakTeamName: convertTeamID2Name(window.gameRoom.winningStreak.teamID),
        streakTeamCount: window.gameRoom.winningStreak.count
    };

    // Get all players except the host (id = 0 is always the host)
    let players = window.gameRoom._room.getPlayerList().filter(
            // only no afk mode players
            (player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode !== true
        ).sort(
            (a: PlayerObject, b: PlayerObject) => {
                return window.gameRoom.playerList.get(a.id)!.stats.rating
                        - window.gameRoom.playerList.get(b.id)!.stats.rating
            }
        );
    if (players.length == 0) return; // If no players left, do nothing.
    if (players.find((player: PlayerObject) => player.admin) != null) return; // Do nothing if any admin player is still left.

    placeholderUpdateAdmins.playerID = players[0].id;
    placeholderUpdateAdmins.playerName = window.gameRoom.playerList.get(players[0].id)!.name;

    window.gameRoom._room.setPlayerAdmin(players[0]!.id, true); // Give admin to the first non admin player in the list
    window.gameRoom.playerList.get(players[0].id)!.admin = true;
    window.gameRoom.logger.i('updateAdmins', `${window.gameRoom.playerList.get(players[0].id)!.name}#${players[0].id} has been admin(value:${window.gameRoom.playerList.get(players[0].id)!.admin},super:${window.gameRoom.playerList.get(players[0].id)!.permissions.superadmin}), because there were no admin players.`);
    window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.funcUpdateAdmins.newAdmin, placeholderUpdateAdmins), null, 0x00FF00, "normal", 0);
}

export function randomInteger(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
        throw new TypeError(`shuffleArray: Expected an Array, got ${typeof array} instead.`);
    }

    const oldArray = [...array];
    let newArray = new Array<T>();

    while (oldArray.length) {
        const i = Math.floor(Math.random() * oldArray.length);
        newArray = newArray.concat(oldArray.splice(i, 1));
    }

    return newArray;
}

export function getCookieFromHeadless(name: string): string {
    let result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : '';
}
export function registerHighlight(relato: string, author: string) {
    const estimatedTime = (window.gameRoom._room.getScores()!.time - 5);
    
    const highligth: ClipInfo = {
        author: author,
        created: formatTime(estimatedTime),
        description: relato
    } 
    window.gameRoom.clips.push(highligth);
}

function formatTime(seconds: number) {
    return [
        Math.floor(seconds / 60 / 60),
        Math.floor(seconds / 60 % 60),
        Math.floor(seconds % 60)
    ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1")
}
