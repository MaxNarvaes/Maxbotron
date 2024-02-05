import { findStadiumByPlayersLength } from "../../../lib/maps";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { ScoresObject } from "../../model/GameObject/ScoresObject";
import { TeamID } from "../../model/GameObject/TeamID";
import { recruitByOne } from "../../model/OperateHelper/Quorum";

export function onPositionsResetListener(): void {
    window._emitSIOLogEvent("onPlayerJoinListener", "info", "onPlayerJoinListener: ");
    const activePlayersList: PlayerObject[] = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id !== 0 && window.gameRoom.playerList.get(player.id)!.permissions.afkmode === false);
    let activeRedPlayers: PlayerObject[] = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Red);
    let activeBluePlayers: PlayerObject[] = activePlayersList.filter((player: PlayerObject) => player.team === TeamID.Blue);

    //if there are more players in one team move player to the other team
    if (Math.abs(activeRedPlayers.length - activeBluePlayers.length) > 1) {
        recruitByOne();
    }
    
    if(window.gameRoom.currentStadium.maxPlayers < activePlayersList.length
        || window.gameRoom.currentStadium.minPlayers > activePlayersList.length) {
        window.gameRoom.logger.i("onpositionsreset", "diferencia de jugadores para el mapa")
        let scores: ScoresObject | null = window.gameRoom._room.getScores();

        if(findStadiumByPlayersLength(window.gameRoom.playerList.size) !== window.gameRoom.currentStadium) {
            if (Math.abs(scores!.red - scores!.blue) > 1) {//primer gol
                //o un timeout para ver cuando resetear            
                window.gameRoom._room.onTeamVictory(scores!);
            } 
        }
    }
}
