import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { convertTeamID2Name, TeamID } from "../../model/GameObject/TeamID";
import { recruitBothTeamFully } from "../../model/OperateHelper/Quorum";
import { setDefaultRoomLimitation, setDefaultStadiums, setStadium } from "../RoomTools";


export function onGameStopListener(byPlayer: PlayerObject): void {
    window._emitSIOLogEvent("onGameStopListener", "info", "onGameStopListener: " + byPlayer?.name);
    /*
    Event called when a game stops.
    byPlayer is the player which caused the event (can be null if the event wasn't caused by a player).
    Haxball developer Basro said, The game will be stopped automatically after a team victory. (victory -> stop)
    */
    var placeholderStop = {
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
    if (byPlayer !== null) {
        placeholderStop.playerID = byPlayer.id;
        placeholderStop.playerName = byPlayer.name;
    }

    window.gameRoom.isGamingNow = false; // turn off

    let msg = "The game has been stopped.";
    if (byPlayer !== null && byPlayer.id != 0) {
        msg += `(by ${byPlayer.name}#${byPlayer.id})`;
    }
    window.gameRoom.logger.i('onGameStop', msg);

    setStadium(); // check number of players and auto-set stadium
    setDefaultRoomLimitation(); // score, time, teamlock set

    if ((byPlayer == null || byPlayer == undefined) && window.gameRoom.config.rules.autoOperating === true) {
        recruitBothTeamFully();
        setTimeout(() => {
            window.gameRoom._room.startGame(); // start next new game
        }, 5000);
    }

}
