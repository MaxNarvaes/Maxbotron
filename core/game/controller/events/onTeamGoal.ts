import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { getUnixTimestamp } from "../Statistics";
import { convertTeamID2Name, TeamID } from "../../model/GameObject/TeamID";
import { ScoresObject } from "../../model/GameObject/ScoresObject";
import { setBanlistDataToDB } from "../Storage";
import { randomInteger } from "../RoomTools";
import { Player } from "../../model/GameObject/Player";
import { onTeamVictoryListener } from "./onTeamVictory";
import { pickRandomElement } from "../../model/GameObject/Animation";
import { registerHighlight } from "../RoomTools";


export async function onTeamGoalListener(team: TeamID): Promise<void> {
    // Event called when a team scores a goal.
    let scores: ScoresObject= window.gameRoom._room.getScores()!; //get scores object (it includes time data about seconds elapsed)
    window.gameRoom.logger.i('onTeamGoal', `Goal time logger (secs):${Math.round(scores?.time || 0)}`);

    var placeholderGoal = createPlaceholder();

    // identify who has goaled.
    var touchPlayerId: number | undefined = window.gameRoom.ballStack.pop();
    var assistPlayerId: number | undefined = window.gameRoom.ballStack.pop();
    
    window.gameRoom.ballStack.clear(); // clear the stack.
    window.gameRoom.ballStack.initTouchInfo(); // clear touch info
    if (window.gameRoom.isStatRecord == true && touchPlayerId !== undefined) { // records when game mode is for stats recording.
        let scorer: Player = window.gameRoom.playerList.get(touchPlayerId)!;
        window.gameRoom.logger.i("onplayergoal", "on player goal scorer should not be undefined here: " + scorer.name);
        // except spectators and filter who were lose a point
        penalizeRivalsOf(team);

        // check whether or not it is an OG. and process it!
        if (scorer.team === team) { // if the goal is normal goal (not OG)
            goal(placeholderGoal, scorer, assistPlayerId, touchPlayerId, team);
        } else { // if the goal is OG
            await ownGoal(placeholderGoal, touchPlayerId, team, scorer);
        }
    }
    
    if (Math.abs(scores.red - scores.blue) >= 5) {
        onTeamVictoryListener(scores);
    }

    function createPlaceholder() {
        return {
            teamID: team,
            teamName: team === TeamID.Red ? window.gameRoom.currentTeams.red.longName : window.gameRoom.currentTeams.blue.longName,
            scorerID: 0,
            scorerName: '',
            assistID: 0,
            assistName: '',
            ogID: 0,
            ogName: '',
            gameRuleName: window.gameRoom.config.rules.ruleName,
            gameRuleLimitTime: window.gameRoom.config.rules.requisite.timeLimit,
            gameRuleLimitScore: window.gameRoom.config.rules.requisite.scoreLimit,
            gameRuleNeedMin: window.gameRoom.config.rules.requisite.minimumPlayers,
            possTeamRed: window.gameRoom.ballStack.possCalculate(TeamID.Red),
            possTeamBlue: window.gameRoom.ballStack.possCalculate(TeamID.Blue),
            streakTeamName: convertTeamID2Name(window.gameRoom.winningStreak.teamID),
            streakTeamCount: window.gameRoom.winningStreak.count
        };
    }
}
function penalizeRivalsOf(team: TeamID) {
    var losePlayers: PlayerObject[] = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.team !== team);
    losePlayers.forEach(function (eachPlayer: PlayerObject) {
        // records a lost point in match record
        window.gameRoom.playerList.get(eachPlayer.id)!.matchRecord.losePoints++;
    });
}

function goal(placeholderGoal: { teamID: TeamID; teamName: string; scorerID: number; scorerName: string; assistID: number; assistName: string; ogID: number; ogName: string; gameRuleName: string; gameRuleLimitTime: number; gameRuleLimitScore: number; gameRuleNeedMin: number; possTeamRed: number; possTeamBlue: number; streakTeamName: string; streakTeamCount: number; }, scorer: Player, assistPlayerId: number | undefined, touchPlayerId: number, team: TeamID) {
    placeholderGoal.scorerID = scorer.id;
    placeholderGoal.scorerName = scorer.name;
    scorer.matchRecord.goals++; // record goal in match record

    var oponentGk: Player | undefined = [...window.gameRoom.playerList.values()].find(p => p.gk &&  p.permissions.afkmode === false && p.team !== team && p.team !== TeamID.Spec)
    if (oponentGk) {
        oponentGk.matchRecord.goalsAgainst  += 1;
    }

    //set animation
    scorer.currentAnimation = { ...pickRandomElement(scorer.animations.onGoal) };
    window.gameRoom.logger.i("on goal", "on goal: set animatino to player " + scorer.id + scorer.currentAnimation.name);

    //goal message
    let relato = Tst.maketext(LangRes.onGoal.goal[randomInteger(0, LangRes.onGoal.goal.length - 1)], placeholderGoal);
    LangRes.commentary(relato);
    registerHighlight(relato, LangRes.maxbotron.myName);

    if (scorer.matchRecord.goals == 3) {
        scorer.currentAnimation = { ...pickRandomElement(scorer.animations.onHatTrick) };
        let relato = Tst.maketext(pickRandomElement(LangRes.onGoal.hatTrick), placeholderGoal);
        LangRes.commentary(relato);
        registerHighlight(relato, LangRes.maxbotron.myName);
        scorer.matchRecord.hatTricks++;
    }

    if (assistPlayerId !== undefined && touchPlayerId != assistPlayerId && window.gameRoom.playerList.get(assistPlayerId)!.team === team) {
        goalWithAssist(assistPlayerId, scorer, placeholderGoal);
    }

    window.gameRoom.logger.i('onTeamGoal', Tst.maketext(LangRes.onGoal.goal[randomInteger(0, LangRes.onGoal.goal.length - 1)], placeholderGoal));
}

async function ownGoal(placeholderGoal: { teamID: TeamID; teamName: string; scorerID: number; scorerName: string; assistID: number; assistName: string; ogID: number; ogName: string; gameRuleName: string; gameRuleLimitTime: number; gameRuleLimitScore: number; gameRuleNeedMin: number; possTeamRed: number; possTeamBlue: number; streakTeamName: string; streakTeamCount: number; }, touchPlayerId: number, team: TeamID, scorer: Player) {
    placeholderGoal.ogID = touchPlayerId;
    placeholderGoal.ogName = window.gameRoom.playerList.get(touchPlayerId)!.name;
    window.gameRoom.playerList.get(touchPlayerId)!.matchRecord.ogs++; // record OG in match record

    //setPlayerData(window.playerList.get(touchPlayer)!);
    let relato = Tst.maketext(pickRandomElement(LangRes.onGoal.og), placeholderGoal);
    LangRes.commentary(relato);
    registerHighlight(relato, LangRes.maxbotron.myName);
    window.gameRoom.logger.i('onTeamGoal', `${window.gameRoom.playerList.get(touchPlayerId)!.name}#${touchPlayerId} made an OG.`);

    await checkOgFlood(touchPlayerId);
    var players = [...window.gameRoom.playerList.values()];
    for (let i = 0; i < players.length; i++) {
        if (players[i].team === team) {
            players[i].currentAnimation = {...pickRandomElement(players[i].animations.ownGoalOponent)};
        } else if (players[i].team != TeamID.Spec) {
            players[i].currentAnimation = {...pickRandomElement(players[i].animations.ownGoalTeam)};
        }
    }
    scorer.currentAnimation = {...pickRandomElement(scorer.animations.onOwnGoal)};
}

function goalWithAssist(assistPlayerId: number, scorer: Player, placeholderGoal: { teamID: TeamID; teamName: string; scorerID: number; scorerName: string; assistID: number; assistName: string; ogID: number; ogName: string; gameRuleName: string; gameRuleLimitTime: number; gameRuleLimitScore: number; gameRuleNeedMin: number; possTeamRed: number; possTeamBlue: number; streakTeamName: string; streakTeamCount: number; }) {
    let assist: Player = window.gameRoom.playerList.get(assistPlayerId)!;
    window.gameRoom.logger.i("onplayergoal", "on player goal assistor should not be undefined here: " + scorer.name);
    // records assist when the player who assists is not same as the player goaled, and is not other team.
    placeholderGoal.assistID = assist.id;
    placeholderGoal.assistName = assist.name;
    assist.matchRecord.assists++; // record assist in match record


    //setPlayerData(window.playerList.get(assistPlayer)!);
    //assist message
    assist.currentAnimation = { ...pickRandomElement(assist.animations.onAssist) };
    let relato = Tst.maketext(LangRes.onGoal.goalWithAssist[randomInteger(0, LangRes.onGoal.goalWithAssist.length - 1)], placeholderGoal);
    LangRes.commentary(relato);
    registerHighlight(relato, LangRes.maxbotron.myName);
}

async function checkOgFlood(touchPlayerId: number) {
    if (window.gameRoom.config.settings.antiOgFlood === true) { // if anti-OG flood option is enabled
        window.gameRoom.antiTrollingOgFloodCount.push(touchPlayerId); // record it

        let ogCountByPlayer: number = 0;
        window.gameRoom.antiTrollingOgFloodCount.forEach((record) => {
            if (record === touchPlayerId) {
                ogCountByPlayer++; //count
            }
        });

        if (ogCountByPlayer >= window.gameRoom.config.settings.ogFloodCriterion) { // if too many OGs were made
            // kick this player
            const banTimeStamp: number = getUnixTimestamp(); // get current timestamp
            window.gameRoom.logger.i('onTeamGoal', `${window.gameRoom.playerList.get(touchPlayerId)!.name}#${touchPlayerId} was kicked for anti-OGs flood. He made ${ogCountByPlayer} OGs. (conn:${window.gameRoom.playerList.get(touchPlayerId)!.conn})`);
            window.gameRoom._room.kickPlayer(touchPlayerId, LangRes.antitrolling.ogFlood.banReason, false); // kick

            //and add into ban list (not permanent ban, but fixed-term ban)
            await setBanlistDataToDB({ conn: window.gameRoom.playerList.get(touchPlayerId)!.conn, reason: LangRes.antitrolling.ogFlood.banReason, register: banTimeStamp, expire: banTimeStamp + window.gameRoom.config.settings.ogFloodBanMillisecs });
        }
    }
}

