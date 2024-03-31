import * as StatCalc from "../Statistics";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { ScoresObject } from "../../model/GameObject/ScoresObject";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { TeamID } from "../../model/GameObject/TeamID";
import { fetchActiveSpecPlayers, roomActivePlayersNumber } from "../../model/OperateHelper/Quorum";
import { HElo, MatchResult, StatsRecord } from "../../model/Statistics/HElo";
import { convertToPlayerStorage, setPlayerDataToDB } from "../Storage";
import { pickRandomElement } from "../../model/GameObject/Animation";
import { Player } from "../../model/GameObject/Player";
import { ScoreSharp } from "@material-ui/icons";
import { createTable, sendGameToDiscord } from "../../../lib/discordWebhooks";
import { ClipInfo } from "../../model/RoomObject/ClipInfo";
import uEmojiParser from "universal-emoji-parser";

export interface VictoryPlaceholder {
    teamID: TeamID,
    teamName: string,
    redScore: number,
    blueScore: number,
    possTeamRed: number,
    possTeamBlue: number,
    blueTeam: string,
    redTeam: string,
    topScorer: Player,
    map: Player,
    mapp: Player,
    noqui: Player,
    highlights: ClipInfo[]
}

export async function onTeamVictoryListener(scores: ScoresObject): Promise<void> {
    // Event called when a team 'wins'. not just when game ended.
    // records vicotry in stats. total games also counted in this event.
    // Haxball developer Basro said, The game will be stopped automatically after a team victory. (victory -> stop)
    let players = [...window.gameRoom.playerList.values()];
    let mvpCandidates = players.filter(p => p.matchRecord.goals > 0);
    var mvp = mvpCandidates.length > 0 ?
        mvpCandidates.sort((p1, p2) => p2.matchRecord.goals - p1.matchRecord.goals)[0] :
        Player.emptyPlayer("Nadie se destaco en esta categoria");

    var mappCandidates = players.filter(p => p.matchRecord.passed > 0);
    var mapp = mappCandidates.length > 0 ? mappCandidates.sort((p1, p2) => p2.matchRecord.passed - p1.matchRecord.passed)[0] : Player.emptyPlayer("Nadie se destaco en esta categoria");

    var mapCandidates = players.filter(p => p.matchRecord.assists > 0);
    var map = mapCandidates.length > 0 ? mapCandidates.sort((p1, p2) => p2.matchRecord.assists - p1.matchRecord.assists)[0] : Player.emptyPlayer("Nadie se destaco en esta categoria");

    var noquiCandidates = players.filter(p => p.matchRecord.ogs > 0);
    var noqui = noquiCandidates.length > 0 ? noquiCandidates.sort((p1, p2) => p2.matchRecord.ogs - p1.matchRecord.ogs)[0] : Player.emptyPlayer("Nadie se destaco en esta categoria");

    let placeholderVictory: VictoryPlaceholder = {
        teamID: TeamID.Spec,
        teamName: '',
        redScore: scores.red,
        blueScore: scores.blue,
        possTeamRed: window.gameRoom.ballStack.possCalculate(TeamID.Red),
        possTeamBlue: window.gameRoom.ballStack.possCalculate(TeamID.Blue),
        blueTeam: window.gameRoom.currentTeams.blue.longName,
        redTeam: window.gameRoom.currentTeams.red.longName,
        topScorer: { ...mvp },
        map: { ...map },
        mapp: { ...mapp },
        noqui: { ...noqui },
        highlights: [ ...window.gameRoom.clips ]
    };

    let ratingHelper: HElo = HElo.getInstance(); // get HElo instance for calc rating

    let winningMessage: string = '';

    let allActivePlayers: PlayerObject[] = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false); // non afk players
    let teamPlayers: PlayerObject[] = allActivePlayers.filter((eachPlayer: PlayerObject) => eachPlayer.team !== TeamID.Spec); // except Spectators players
    let redTeamPlayers: PlayerObject[] = teamPlayers.filter((eachPlayer: PlayerObject) => eachPlayer.team === TeamID.Red);
    let blueTeamPlayers: PlayerObject[] = teamPlayers.filter((eachPlayer: PlayerObject) => eachPlayer.team === TeamID.Blue);

    let winnerTeamID: TeamID;
    let loserTeamID: TeamID;

    if (scores.red > scores.blue) {
        winnerTeamID = TeamID.Red;
        loserTeamID = TeamID.Blue;
        placeholderVictory.teamName = window.gameRoom.currentTeams.blue.country + " " + window.gameRoom.currentTeams.red.longName;
    } else {
        winnerTeamID = TeamID.Blue;
        loserTeamID = TeamID.Red;
        placeholderVictory.teamName = window.gameRoom.currentTeams.blue.longName + " " + window.gameRoom.currentTeams.blue.country;
    }
    placeholderVictory.teamID = winnerTeamID;
    winningMessage = Tst.maketext(LangRes.onVictory.victory, placeholderVictory);
    winningMessage += uEmojiParser.parseToUnicode( "\n" + createTable(
        placeholderVictory.redTeam + " VS " + placeholderVictory.blueTeam,
        "unicode-double",
        placeholderVictory).toString());
        
    winningMessage += "\n JUGADORES DEL PARTIDO 🐐 👟 ⚽ 🤡:";
    winningMessage += mvp ? "\n🐐 El crack: " + placeholderVictory.topScorer.name + " con " + placeholderVictory.topScorer.matchRecord.goals + (placeholderVictory.topScorer.matchRecord.goals > 1 ? " goles" : " gol") + "\n" : "" +
        mapp ? "👟 Dios de los pases: " + placeholderVictory.mapp.name + " con " + placeholderVictory.mapp.matchRecord.passed + " pases exitosos\n" : "" +
            map ? "⚽ El generoso: " + placeholderVictory.map.name + " con " + placeholderVictory.mapp.matchRecord.assists + " asistencias\n" : "" +
                noqui ? "🤡 Ñoqui del partido: " + placeholderVictory.noqui.name + " con " + placeholderVictory.noqui.matchRecord.ogs + (placeholderVictory.noqui.matchRecord.ogs > 1 ? " goles" : " gol") + " en contra \n" : ""; 

    mvp.currentAnimation = { ...pickRandomElement(mvp.animations.onMvp) };

    window.gameRoom.isGamingNow = false; // turn off

    if (window.gameRoom.config.rules.statsRecord == true && window.gameRoom.isStatRecord == true) { // records when game mode is for stats recording.
        // HElo rating part ================
        // make diffs array (key: index by teamPlayers order, value: number[])


        // make stat records
        saveStats(scores, ratingHelper, winnerTeamID, redTeamPlayers, blueTeamPlayers, loserTeamID, teamPlayers);

        // win streak part ================
        if (winnerTeamID !== window.gameRoom.winningStreak.teamID) {
            // if winner team is changed
            window.gameRoom.winningStreak.count = 1; // init count and set to won one game
        } else {
            window.gameRoom.winningStreak.count++; // increase count
        }
        window.gameRoom.winningStreak.teamID = winnerTeamID; // set winner team id



        /*         if (window.gameRoom.winningStreak.count >= 3) {
                    winningMessage += '\n' + Tst.maketext(LangRes.onVictory.burning, placeholderVictory);
                } */
    }

    // when auto emcee mode is enabled
    if (window.gameRoom.config.rules.autoOperating === true) {
        if (window.gameRoom.winningStreak.count >= window.gameRoom.config.settings.rerollWinstreakCriterion) {
            // if winning streak count has reached limit
            if (window.gameRoom.config.settings.rerollWinStreak === true && roomActivePlayersNumber() >= window.gameRoom.config.rules.requisite.minimumPlayers) {
                // if rerolling option is enabled, then reroll randomly

                window.gameRoom.winningStreak.count = 0; // init count
                winningMessage += '\n' + Tst.maketext(LangRes.onVictory.reroll, placeholderVictory);
            }
        } else { // or still under the limit, then change spec and loser team
            window.gameRoom._room.getPlayerList()
                .filter((player: PlayerObject) => player.team === loserTeamID)
                .forEach((player: PlayerObject) => {
                    if (window.gameRoom.config.settings.guaranteePlayingTime === false || (scores.time - window.gameRoom.playerList.get(player.id)!.entrytime.matchEntryTime) > window.gameRoom.config.settings.guaranteedPlayingTimeSeconds) {
                        window.gameRoom._room.setPlayerTeam(player.id, TeamID.Spec); // just move all losers to Spec team
                    }
                });

            const specPlayers: PlayerObject[] = fetchActiveSpecPlayers();
            const insufficiency: number = window.gameRoom.config.rules.requisite.eachTeamPlayers - window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.team === loserTeamID).length;
            for (let i = 0; i < insufficiency && i < specPlayers.length; i++) {
                window.gameRoom._room.setPlayerTeam(specPlayers[i].id, loserTeamID);
            }
        }
    }
    // stop replay record and send it
    const replay = window.gameRoom._room.stopRecording();

    if (replay) {
        window.gameRoom.logger.i('onTeamVictory', `replay. Scores ${scores.red}:${scores.blue}.`);
        sendGameToDiscord(placeholderVictory, { replay: replay, date: new Date() });
        /* window._feedSocialDiscordWebhook(window.gameRoom.social.discordWebhook.id, window.gameRoom.social.discordWebhook.token, "replay", {
            message: Tst.maketext(LangRes.onStop.feedSocialDiscordWebhook.replayMessage, placeholder)
            , data: JSON.stringify(Array.from(replay))
        });  */
    }
    // notify victory
    window.gameRoom.logger.i('onTeamVictory', `The game has ended. Scores ${scores.red}:${scores.blue}.`);
    LangRes.message("\n" + winningMessage)
    setTimeout(() => {
        window.gameRoom._room.stopGame();
    }, 5000);
    // when auto emcee mode is enabled
}
function saveStats(scores: ScoresObject, ratingHelper: HElo, winnerTeamID: TeamID, redTeamPlayers: PlayerObject[], blueTeamPlayers: PlayerObject[], loserTeamID: TeamID, teamPlayers: PlayerObject[]) {
    let redStatsRecords: StatsRecord[] = ratingHelper.makeStasRecord(winnerTeamID === TeamID.Red ? MatchResult.Win : MatchResult.Lose, redTeamPlayers);
    let blueStatsRecords: StatsRecord[] = ratingHelper.makeStasRecord(winnerTeamID === TeamID.Blue ? MatchResult.Win : MatchResult.Lose, blueTeamPlayers);

    // calc average of team ratings
    let winTeamRatingsMean: number = ratingHelper.calcTeamRatingsMean(winnerTeamID === TeamID.Red ? redTeamPlayers : blueTeamPlayers);
    let loseTeamRatingsMean: number = ratingHelper.calcTeamRatingsMean(loserTeamID === TeamID.Red ? redTeamPlayers : blueTeamPlayers);

    // get diff and update rating
    redStatsRecords.forEach((eachItem: StatsRecord, idx: number) => {
        let diffArray: number[] = [];
        let oldRating: number = window.gameRoom.playerList.get(redTeamPlayers[idx].id)!.stats.rating;
        for (let i: number = 0; i < blueStatsRecords.length; i++) {
            diffArray.push(ratingHelper.calcBothDiff(eachItem, blueStatsRecords[i], winTeamRatingsMean, loseTeamRatingsMean, eachItem.matchKFactor));
        }
        let newRating: number = ratingHelper.calcNewRating(eachItem.rating, diffArray);
        window.gameRoom.playerList.get(redTeamPlayers[idx].id)!.stats.rating = newRating;
        window.gameRoom.logger.i('onTeamVictory', `Red Player ${redTeamPlayers[idx].name}#${redTeamPlayers[idx].id}'s rating has become ${newRating} from ${oldRating}.`);
    });
    blueStatsRecords.forEach((eachItem: StatsRecord, idx: number) => {
        let diffArray: number[] = [];
        let oldRating: number = window.gameRoom.playerList.get(blueTeamPlayers[idx].id)!.stats.rating;
        for (let i: number = 0; i < redStatsRecords.length; i++) {
            diffArray.push(ratingHelper.calcBothDiff(eachItem, redStatsRecords[i], winTeamRatingsMean, loseTeamRatingsMean, eachItem.matchKFactor));
        }
        let newRating: number = ratingHelper.calcNewRating(eachItem.rating, diffArray);
        window.gameRoom.playerList.get(blueTeamPlayers[idx].id)!.stats.rating = newRating;
        window.gameRoom.logger.i('onTeamVictory', `Blue Player ${blueTeamPlayers[idx].name}#${blueTeamPlayers[idx].id}'s rating has become ${newRating} from ${oldRating}.`);
    });

    // record stats part ================
    teamPlayers.forEach(async (eachPlayer: PlayerObject) => {
        var player: Player = window.gameRoom.playerList.get(eachPlayer.id)!;
        if (eachPlayer.team === winnerTeamID) { // if this player is winner
            player.stats.wins++; //records a win
            if ((winnerTeamID == TeamID.Blue && scores.red === 0) || (winnerTeamID == TeamID.Red && scores.blue === 0)) {
                player.stats.perfectGk++;
            }
        } else {
            player.stats.loses++;
        }
        player.stats.totals++; // records game count and other stats
        player.stats.goals += player.matchRecord.goals;
        player.stats.assists += player.matchRecord.assists;
        player.stats.ogs += player.matchRecord.ogs;
        player.stats.losePoints += player.matchRecord.losePoints;
        player.stats.balltouch += player.matchRecord.balltouch;
        player.stats.passed += player.matchRecord.passed;
        player.stats.gk += player.matchRecord.gk;
        player.stats.goalsAgainstGk += player.matchRecord.goalsAgainst;
        player.stats.hatTricks += player.matchRecord.hatTricks;
        player.stats.goalsPlusAssistsPerGame += (player.stats.goals + player.stats.assists) / player.stats.loses;
        player.stats.assistsPerGame = StatCalc.calcAssistsPerGame(player!.stats.totals, player!.stats.assists);
        player.stats.goalsAgainstPerGame = player.stats.goalsAgainstGk / player.stats.totals;
        player.stats.goalsPerGame = StatCalc.calcGoalsPerGame(player!.stats.totals, player!.stats.goals);
        player.stats.oGsPerGame = player.stats.ogs / player.stats.loses;
        player.stats.passPercentage = StatCalc.calcPassSuccessRate(player!.stats.balltouch, player!.stats.passed);
        player.stats.winrate = StatCalc.calcWinsRate(player!.stats.totals, player!.stats.wins);

        player.matchRecord = {
            goals: 0,
            assists: 0,
            ogs: 0,
            losePoints: 0,
            balltouch: 0,
            passed: 0,
            gk: 0,
            goalsAgainst: 0,
            hatTricks: 0,
            factorK: window.gameRoom.config.HElo.factor.factor_k_normal
        };
        

        await setPlayerDataToDB(convertToPlayerStorage(window.gameRoom.playerList.get(eachPlayer.id)!));
    });
}

