import { Player } from "../../model/GameObject/Player";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { importantMessage } from "../../resource/strings";

export function registerCommandTimeout(key: string, timeout: number, byPlayer: Player) {
    window.gameRoom.playerTimeouts.add(key);
    
    setTimeout(() => {
        window.gameRoom.playerTimeouts.delete(key);
    }, timeout * byPlayer!.permissions.role.timeoutMultiplier);
}

export function authorizeCommand(byPlayer: PlayerObject, commandName: string, excludedRoles: string[]): boolean {
    var player = window.gameRoom.playerList.get(byPlayer.id);
    var key = commandName + byPlayer.auth;
    
    if (excludedRoles.includes(player!.permissions.role.key)) {
        importantMessage("No tienes permisos para ejecutar este comando.", byPlayer.id, 2);
        return false;
    }
    return true;
}