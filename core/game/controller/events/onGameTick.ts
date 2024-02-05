import { Player } from "../../model/GameObject/Player";

export function onGameTickListener(): void {
    var activePlayers: Player[] = [...window.gameRoom.playerList.values()].filter((p: Player) => p.permissions.afkmode === false);
    activePlayers.forEach((p: Player) => {
        window.gameRoom.animator.animate(p.id);
    });
}
