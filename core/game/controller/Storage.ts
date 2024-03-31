import { Player } from "../model/GameObject/Player";
import { PlayerObject, PlayerStorage } from "../model/GameObject/PlayerObject";
import { BanList } from "../model/PlayerBan/BanList";
import { getRole } from "../resource/roleDefinitions";

// Utilities
export function convertToPlayerStorage(player: Player): PlayerStorage {
    return {
        auth: player.auth, // same meaning as in PlayerObject. It can used for identify each of players.
        conn: player.conn, // same meaning as in PlayerObject.
        name: player.name, // save for compare player's current name and previous name.
        rating: player.stats.rating, // HElo Rating points
        totals: player.stats.totals, // total games include wins and disconns
        disconns: player.stats.disconns, // disconnected games
        wins: player.stats.wins, // the game wins
        goals: player.stats.goals, // not contains OGs.
        assists: player.stats.assists, // count for assist goal
        ogs: player.stats.ogs, // it means 'own goal' (in Korean, '자책골')
        gk: player.stats.gk,
        perfectGk: player.stats.perfectGk,
        goalsAgainstGk: player.stats.goalsAgainstGk,
        hatTricks: player.stats.hatTricks,
        losePoints: player.stats.losePoints, // it means the points this player lost (in Korean, '실점')
        balltouch: player.stats.balltouch, // total count of touch(kick) ball
        passed: player.stats.passed, // total count of pass success
        mute: player.permissions.mute, // is this player muted? 
        muteExpire: player.permissions.muteExpire, // expiration date of mute. -1 means Permanent mute.. (unix timestamp)
        superadmin: player.permissions.superadmin,
        role : player.permissions.role.key,
        roleExpire: player.permissions.roleExpire,
        rejoinCount: player.entrytime.rejoinCount, // How many rejoins this player has made.
        joinDate: player.entrytime.joinDate, // player join time
        leftDate: player.entrytime.leftDate, // player left time
        malActCount: player.permissions.malActCount, // count for malicious behaviour like Brute force attack
        username: player.credentials.username,
        password: player.credentials.password,
        warningCount: player.warnings.length,
        assistsPerGame: player.stats.assistsPerGame,
        goalsAgainstPerGame: player.stats.assistsPerGame,
        goalsPerGame: player.stats.goalsPerGame,
        goalsPlusAssistsPerGame: player.stats.goalsPlusAssistsPerGame,
        loses: player.stats.loses,
        oGsPerGame: player.stats.oGsPerGame,
        passPercentage: player.stats.passPercentage,
        winrate: player.stats.winrate
    }
}

export function convertToPlayer(player: PlayerObject, existPlayerData: PlayerStorage): Player{
    var newPlayer: Player = new Player(player, {
        rating: existPlayerData.rating,
        totals: existPlayerData.totals,
        disconns: existPlayerData.disconns,
        wins: existPlayerData.wins,
        goals: existPlayerData.goals,
        assists: existPlayerData.assists,
        ogs: existPlayerData.ogs,
        losePoints: existPlayerData.losePoints,
        balltouch: existPlayerData.balltouch,
        passed: existPlayerData.passed,
        gk: existPlayerData.gk,
        goalsAgainstGk: existPlayerData.goalsAgainstGk,
        hatTricks: existPlayerData.hatTricks,
        perfectGk: existPlayerData.perfectGk,
        assistsPerGame: existPlayerData.assistsPerGame,
        goalsAgainstPerGame: existPlayerData.goalsAgainstPerGame,
        goalsPerGame: existPlayerData.goalsPerGame,
        goalsPlusAssistsPerGame: existPlayerData.goalsPlusAssistsPerGame,
        loses: existPlayerData.loses,
        oGsPerGame: existPlayerData.oGsPerGame,
        passPercentage: existPlayerData.passPercentage,
        winrate: existPlayerData.winrate
    }, {
        mute: existPlayerData.mute,
        muteExpire: existPlayerData.muteExpire,
        afkmode: false,
        afkreason: '',
        afkdate: 0,
        malActCount: existPlayerData.malActCount,
        superadmin: existPlayerData.superadmin,
        role: getRole(existPlayerData.role),
        roleExpire: existPlayerData.roleExpire
    }, {
        rejoinCount: existPlayerData.rejoinCount,
        joinDate: 0,
        leftDate: existPlayerData.leftDate,
        matchEntryTime: 0
    });
    if (existPlayerData.warningCount > 0) {
        newPlayer.warnings.push({reason: "falta previa", time: 0})
    }
    
    return newPlayer;
}

// CRUDs with DB Server by injected functions from Node Main Application
// register new player or update it
export async function setPlayerDataToDB(playerStorage: PlayerStorage): Promise<PlayerStorage | undefined> {
    
    let player: PlayerStorage | undefined = undefined;
    if (playerStorage.username != null && playerStorage.password != null) {
        player = await window._findPlayerByUsername(window.gameRoom.config._RUID, playerStorage.username)
        if (player == undefined) {
            player = await window._findPlayerByAuth(window.gameRoom.config._RUID, playerStorage.auth);
        }
    } else {
        player = await window._findPlayerByAuth(window.gameRoom.config._RUID, playerStorage.auth);
    }
    if(player != undefined) {
        //if already exist then update it
            return await window._updatePlayerDB(window.gameRoom.config._RUID, playerStorage);
    } else {
        // or create new one
        return await window._createPlayerDB(window.gameRoom.config._RUID, playerStorage);
    }
}

// acjeck username
export async function existUsername(username: string): Promise<boolean> {
    return await window._existsPlayerByUsername(window.gameRoom.config._RUID, username);
}

// get player data
export async function getPlayerDataFromDB(playerAuth: string): Promise<PlayerStorage | undefined> {
    const player: PlayerStorage | undefined = await window._findPlayerByAuth(window.gameRoom.config._RUID, playerAuth);
    return player;
}

export async function findPlayerByUsername(playerName: string): Promise<PlayerStorage | undefined> {
    const player: PlayerStorage | undefined = await window._findPlayerByUsername(window.gameRoom.config._RUID, playerName);
    return player;
}

// register new ban or update it
export async function setBanlistDataToDB(banList: BanList): Promise<void> {
    const banplayer: BanList | undefined = await window._readBanlistDB(window.gameRoom.config._RUID, banList.conn);
    if(banplayer !== undefined) {
        //if already exist then update it
        await window._updateBanlistDB(window.gameRoom.config._RUID, banList);
    } else {
        // or create new one
        await window._createBanlistDB(window.gameRoom.config._RUID, banList);
    }
}

// get exist ban
export async function getBanlistDataFromDB(playerConn: string): Promise<BanList | undefined> {
    const banplayer: BanList | undefined = await window._readBanlistDB(window.gameRoom.config._RUID, playerConn);
    return banplayer;
}

// remove exist ban
export async function removeBanlistDataFromDB(playerConn: string): Promise<void> {
    await window._deleteBanlistDB(window.gameRoom.config._RUID, playerConn);
}
