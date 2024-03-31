import * as map1v1 from "./maps/temp0/1v1.hbs";
import * as map3v3 from "./maps/temp0/3v3.hbs";
import * as map4v4 from "./maps/temp0/4v4.hbs";
import * as map6v6 from "./maps/temp0/6v6.hbs";
import * as map7v7 from "./maps/temp0/7v7.hbs";
import * as map10v10 from "./maps/temp0/10v10.hbs";
import * as training from "./maps/training.hbs";
import { stadiumInfo } from "./maps/stadiumInfo";




export const maps: stadiumInfo[] = [
    training.stadium,
    map1v1.stadium,
    map3v3.stadium,
    map4v4.stadium,
    map6v6.stadium,
    map7v7.stadium,
    map10v10.stadium
];
/**
* load stadium map (JSON stringified).
*/
export function findStadiumByPlayersLength(players: number): stadiumInfo {
    // LINK MAP FILE
    var result = maps.filter((s: stadiumInfo) => players <= s.maxPlayers && players >= s.minPlayers);
    //window.gameRoom.logger.i("find stadium", "find stadium: " + result.length + " " + result[0].maxPlayers);


    if (result.length > 0) {
        return result[0];
    } else {
        return maps[0];
    }
}

export function findStadiumByName(mapName: string): stadiumInfo {
    // LINK MAP FILE
    var result = maps.filter((s: stadiumInfo) => s.name === mapName);
    //window.gameRoom.logger.i("find stadium by name", "find stadium by name: " + result.length + " " + result[0].maxPlayers);


    if (result.length > 0) {
        return result[0];
    } else {
        return maps[0];
    }
}
