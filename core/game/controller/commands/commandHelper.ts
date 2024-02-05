import { Player } from "../../model/GameObject/Player";

export function registerCommandTimeout(key: string, timeout: number, byPlayer: Player) {
    window.gameRoom.playerTimeouts.add(key);
    
    setTimeout(() => {
        window.gameRoom.playerTimeouts.delete(key);
    }, timeout * byPlayer!.permissions.role.timeoutMultiplier);
}
