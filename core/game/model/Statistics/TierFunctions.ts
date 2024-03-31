import uEmojiParser from "universal-emoji-parser";
import { Tier } from "../Configuration/Tier";

export function decideTier(playerId: number): Tier {
    let player = window.gameRoom.playerList.get(playerId);
    let defaultTier = window.gameRoom.config.HElo.tiers[0];
    if (player && player.stats.totals > window.gameRoom.config.HElo.factor.placement_match_chances) {

        for (let i = window.gameRoom.config.HElo.tiers.length - 1; i >= 0; i--) {

            var tier = window.gameRoom.config.HElo.tiers[i];
            if (tier.rating > 0 && tier.rating < player.stats.rating) {
                var found = window.gameRoom.config.HElo.tiers[i - 1];
                found.avatar = uEmojiParser.parseToUnicode(found.avatar)
                return found;
            }
        }
    }
    
    defaultTier.avatar = uEmojiParser.parseToUnicode(defaultTier.avatar)
    return defaultTier;
}