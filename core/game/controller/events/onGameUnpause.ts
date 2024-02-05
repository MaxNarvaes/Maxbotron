import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { recruitBothTeamFully } from "../../model/OperateHelper/Quorum";

export function onGameUnpauseListener(byPlayer: PlayerObject | null): void {
    window._emitSIOLogEvent("onGameUnpauseListener", "info", "onGameUnpauseListener: " + byPlayer?.name);
    window.gameRoom.isGamingNow = true; // turn on
}
