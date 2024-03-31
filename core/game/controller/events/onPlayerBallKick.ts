import uEmojiParser from "universal-emoji-parser";
import { Player } from "../../model/GameObject/Player";
import { PlayerObject } from "../../model/GameObject/PlayerObject";

export function onPlayerBallKickListener(byPlayer: PlayerObject): void {
    // Event called when a player kicks the ball.
    // records player's id, team when the ball was kicked
    manageStats(byPlayer);
    manageKickAnimations(byPlayer);
}

function manageKickAnimations(byPlayer: PlayerObject) {
    
    let player: Player = window.gameRoom.playerList.get(byPlayer.id)!;
    if (player.gk) {
        player.currentAnimation = {...player.animations.onKick[1]};
    } else {
        player.currentAnimation = {...player.animations.onKick[0]};
    }
}

function manageStats(byPlayer: PlayerObject) {
    if (window.gameRoom.config.rules.statsRecord === true && window.gameRoom.isStatRecord === true) { // record only when stat record mode

        window.gameRoom.playerList.get(byPlayer.id)!.matchRecord.balltouch++; // add count of ball touch in match record

        managePass(byPlayer);

        window.gameRoom.ballStack.touchTeamSubmit(byPlayer.team);
        window.gameRoom.ballStack.touchPlayerSubmit(byPlayer.id); // refresh who touched the ball in last

        window.gameRoom.ballStack.push(byPlayer.id);
        window.gameRoom.ballStack.possCount(byPlayer.team);

    }
}

function managePass(byPlayer: PlayerObject) {
    if (window.gameRoom.ballStack.passJudgment(byPlayer.team) === true && window.gameRoom.playerList.has(window.gameRoom.ballStack.getLastTouchPlayerID()) === true) {
        window.gameRoom.playerList.get(window.gameRoom.ballStack.getLastTouchPlayerID())!.matchRecord.passed++;
    }
}
