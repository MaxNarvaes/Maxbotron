import { Tier } from "../Configuration/Tier";

export function decideTier(playerId: number): Tier {
    let player = window.gameRoom.playerList.get(playerId);
    if (player && player.stats.totals > window.gameRoom.config.HElo.factor.placement_match_chances) {

        for (let i = window.gameRoom.config.HElo.tiers.length - 1; i >= 0; i--) {

            var tier = window.gameRoom.config.HElo.tiers[i];
            if (tier.rating > 0 && tier.rating < player.stats.rating) {

                return window.gameRoom.config.HElo.tiers[i - 1];
            }
        }
    }

    return window.gameRoom.config.HElo.tiers[0];
}