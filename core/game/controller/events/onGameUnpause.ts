import { PlayerObject } from "../../model/GameObject/PlayerObject";

export function onGameUnpauseListener(byPlayer: PlayerObject | null): void {
    window._emitSIOLogEvent("onGameUnpauseListener", "info", "onGameUnpauseListener: " + byPlayer?.name);
    window.gameRoom.isGamingNow = true; // turn on
}
