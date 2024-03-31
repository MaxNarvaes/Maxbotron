import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject, PlayerStorage } from "../../model/GameObject/PlayerObject";
import { Player } from "../../model/GameObject/Player";
import { convertToPlayer, convertToPlayerStorage, getBanlistDataFromDB, getPlayerDataFromDB, removeBanlistDataFromDB, setBanlistDataToDB, setPlayerDataToDB } from "../Storage";
import { getUnixTimestamp } from "../Statistics";
import { setDefaultStadiums, setStadium, updateAdmins } from "../RoomTools";
import { convertTeamID2Name, TeamID } from "../../model/GameObject/TeamID";
import { recruitByOne, roomActivePlayersNumber, roomTeamPlayersNumberCheck } from "../../model/OperateHelper/Quorum";
import { decideTier } from "../../model/Statistics/TierFunctions";
import { isExistNickname, isIncludeBannedWords } from "../TextFilter";
import { getRole } from "../../resource/roleDefinitions";
import { pickRandomElement } from "../../model/GameObject/Animation";
import { masterAnimations } from "../../model/GameObject/playerDefaultAnimations";
import { BanList } from "../../model/PlayerBan/BanList";
import { exist } from "joi";

interface PlaceholderJoin {
    playerID: number,
    playerName: string,
    playerNameOld: string,
    playerStatsRating: number,
    playerStatsDisconns: number,
    playerStatsTotal: number,
    playerStatsWins: number,
    playerStatsGoals: number,
    playerStatsAssists: number,
    playerStatsOgs: number,
    playerStatsLosepoints: number,
    banListReason: string,
    bannedUntil: string
}

export async function onPlayerJoinListener(player: PlayerObject): Promise<void> {
    const joinTimeStamp: number = getUnixTimestamp();
    window._emitSIOLogEvent("onPlayerJoinListener", "info", "onPlayerJoinListener: " + player.name);
    // logging into console
    window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} has joined. CONN(${player.conn}),AUTH(${player.auth})`);

    // Event called when a new player joins the room.
    var placeholderJoin: PlaceholderJoin = {
        playerID: player.id,
        playerName: player.name,
        playerNameOld: player.name,
        playerStatsRating: 1000,
        playerStatsDisconns: 0,
        playerStatsTotal: 0,
        playerStatsWins: 0,
        playerStatsGoals: 0,
        playerStatsAssists: 0,
        playerStatsOgs: 0,
        playerStatsLosepoints: 0,
        banListReason: '',
        bannedUntil: ''
    };

    // check ban list
    // if this player use seperator (|,|) in nickname, then kick
    // if this player has already joinned by other connection
    if (await kickIfBanned(player, placeholderJoin, joinTimeStamp) 
        || kickIfInvalidNickname(player, placeholderJoin)
        || kickIfAlreadyConnected(player, placeholderJoin)) {
        return;
    }

    // send welcome message to new player. other players cannot read this message.
    window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.welcome, placeholderJoin), player.id, LangRes.style.colors.Green, "normal", 0);

    // send notice
    if(window.gameRoom.notice !== '') {
        window.gameRoom._room.sendAnnouncement(window.gameRoom.notice, player.id, LangRes.style.colors.Golden, "bold", 0);
    }
    await handlePlayerStorage(player, joinTimeStamp, placeholderJoin)

    // add the player who joined into playerList by creating class instance
    

    if (window.gameRoom.config.rules.autoAdmin === true) { // if auto admin option is enabled
        updateAdmins(); // check there are any admin players, if not make an admin player.
    }

    // check number of players joined and change game mode
    let activePlayersNumber: number = roomActivePlayersNumber();
    if (window.gameRoom.config.rules.statsRecord === true && activePlayersNumber >= window.gameRoom.config.rules.requisite.minimumPlayers) {
        if (window.gameRoom.isStatRecord === false) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.startRecord, placeholderJoin), null, LangRes.style.colors.Green, "normal", 0);
            window.gameRoom.isStatRecord = true;
            if (window.gameRoom.config.rules.autoOperating === true && window.gameRoom.isGamingNow === true) {
                // if auto emcee mode is enabled and the match has been playing as ready mode
                window.gameRoom._room.stopGame(); // stop game
                setTimeout(() => {
                    window.gameRoom._room.startGame(); // start next new game
                }, 5000);
            }
        }
    } else {
        if (window.gameRoom.isStatRecord === true) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.stopRecord, placeholderJoin), null, LangRes.style.colors.Green, "normal", 0);
            window.gameRoom.isStatRecord = false;
        }
    }

    // when auto emcee mode is enabled
    if (window.gameRoom.config.rules.autoOperating === true) {
        recruitByOne();
        if (window.gameRoom.isGamingNow === false) {
            // if game is not started then start the game for active players
            setStadium(); // set stadium
            window.gameRoom._room.startGame();
        }
    }

    // emit websocket event
    window._emitSIOPlayerInOutEvent(player.id);
}

async function handlePlayerStorage(player: PlayerObject, joinTimestamp: number, placeholderJoin: PlaceholderJoin) {
    let existPlayerData: PlayerStorage | undefined = await getPlayerDataFromDB(player.auth);
    if (existPlayerData !== undefined) {
        // if this player is existing player (not new player)
        handleExistingPlayerStorage(existPlayerData, player, placeholderJoin, joinTimestamp)        
    } else {
        // if new player
        // create a Player Object
        handleNewPlayerStorage(player, joinTimestamp);
    }
    await setPlayerDataToDB(convertToPlayerStorage(window.gameRoom.playerList.get(player.id)!)); // register(or update) this player into DB
}

function handleNewPlayerStorage(player: PlayerObject, joinTimestamp: number) {
    let newPlayer = new Player(player, {
        rating: 1000,
        totals: 0,
        disconns: 0,
        wins: 0,
        goals: 0,
        assists: 0,
        ogs: 0,
        losePoints: 0,
        balltouch: 0,
        passed: 0,
        gk: 0,
        goalsAgainstGk: 0,
        hatTricks: 0,
        perfectGk: 0,
        assistsPerGame: 0,
        goalsAgainstPerGame: 0,
        goalsPerGame: 0,
        goalsPlusAssistsPerGame: 0,
        loses: 0,
        oGsPerGame: 0,
        passPercentage: 0,
        winrate: 0,
    }, {
        mute: false,
        muteExpire: 0,
        afkmode: false,
        afkreason: '',
        afkdate: 0,
        malActCount: 0,
        superadmin: false,
        role: getRole("visitor"),
        roleExpire: null
    }, {
        rejoinCount: 0,
        joinDate: joinTimestamp,
        leftDate: 0,
        matchEntryTime: 0
    });
    window.gameRoom.playerList.set(player.id, newPlayer);
    LangRes.message("No estas registrado. Usa el comando !register <nombre de usuario> <password> para no perder tus stats!", player.id);
    LangRes.message("Si ya estas registrado usa el comando !login <nombre de usuario> <password> para no perder tus stats!", player.id);
}

async function handleExistingPlayerStorage(existPlayerData: PlayerStorage, player: PlayerObject, placeholderJoin: PlaceholderJoin, joinTimestamp: number){
    var newPlayer: Player = convertToPlayer(player, existPlayerData);
    newPlayer.entrytime.joinDate = joinTimestamp;
    LangRes.message(`Estas logueado como ${newPlayer.name}, si no es tu cuenta usa !login <username> <password>`, player.id);
    /*entra, encuentra player
    1- tiene username y pass -
    1-1- esta registrado
    2- no tiene username y pass
    2-1- se tiene que registrar muestro mensaje
    */
    if (existPlayerData.username != null && existPlayerData.password != null) {
        newPlayer.credentials.password = existPlayerData.password;
        newPlayer.credentials.username = existPlayerData.username;
    } else {
        LangRes.message("No estas registrado. Usa el comando !register <nombre de usuario> <password> para no perder tus stats!", player.id);
    }

    if (newPlayer.permissions.role.key === "master" && newPlayer.credentials.username == "maxinar") {
        newPlayer.animations = masterAnimations();
    }

    if (window.gameRoom.config.settings.avatarOverridingByTier === true) {
        // if avatar overrding option is enabled
        newPlayer.animations.onJoin[0].frames[0].bitmaps = [decideTier(player.id).avatar];
        newPlayer.currentAnimation = {...pickRandomElement(newPlayer.animations.onJoin)};
    }

    if (existPlayerData.roleExpire && existPlayerData.roleExpire <= joinTimestamp) {
        if(existPlayerData.username) {
            newPlayer.permissions.role = getRole("player");
        } else {
            newPlayer.permissions.role = getRole("visitor");
        }
    }

    window.gameRoom.playerList.set(player.id, newPlayer);

    window.gameRoom._room.setPlayerAdmin(player.id, getRole(existPlayerData.role).superadmin);

    // update player information in placeholder
    placeholderJoin.playerStatsAssists = existPlayerData.assists;
    placeholderJoin.playerStatsGoals = existPlayerData.goals;
    placeholderJoin.playerStatsLosepoints = existPlayerData.losePoints;
    placeholderJoin.playerStatsOgs = existPlayerData.ogs;
    placeholderJoin.playerStatsTotal = existPlayerData.totals;
    placeholderJoin.playerStatsWins = existPlayerData.wins;
    placeholderJoin.playerStatsRating = existPlayerData.rating;
    placeholderJoin.playerStatsDisconns = existPlayerData.disconns;

    if (player.name != existPlayerData.name) {
        // if this player changed his/her name
        // notify that fact to other players only once ( it will never be notified if he/she rejoined next time)
        placeholderJoin.playerNameOld = existPlayerData.name;
        LangRes.message(Tst.maketext(LangRes.onJoin.changename, placeholderJoin), 2);
    }

    // check anti-rejoin flood when this option is enabled
    if (window.gameRoom.config.settings.antiJoinFlood === true) { //FIXME: Connection Closed Message is shown when anti-rejoin flooding kick (FIND the reason why)
        if (joinTimestamp - existPlayerData.leftDate <= window.gameRoom.config.settings.joinFloodIntervalMillisecs) { // when rejoin flood
            if (existPlayerData.rejoinCount > window.gameRoom.config.settings.joinFloodAllowLimitation) {
                // kick this player
                window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for anti-rejoin flood. (origin:${player.name}#${player.id},conn:${player.conn})`);
                window.gameRoom._room.kickPlayer(player.id, LangRes.antitrolling.joinFlood.banReason, false); // kick
                //and add into ban list (not permanent ban, but fixed-term ban)
                await setBanlistDataToDB({ conn: player.conn, reason: LangRes.antitrolling.joinFlood.banReason, register: joinTimestamp, expire: joinTimestamp + window.gameRoom.config.settings.joinFloodBanMillisecs })
                return; // exit from this join event
            } else { //just warn
                window.gameRoom._room.sendAnnouncement(LangRes.antitrolling.joinFlood.floodWarning, player.id, 0xFF0000, "bold", 2);
                window.gameRoom.playerList.get(player.id)!.entrytime.rejoinCount++; // and add count
            }
        } else {
            // init rejoin count
            window.gameRoom.playerList.get(player.id)!.entrytime.rejoinCount = 0;
        }
    }
}

function kickIfInvalidNickname(player: PlayerObject, placeholderJoin: PlaceholderJoin): boolean {
    if (player.name.includes('|,|')) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for including seperator word. (|,|)`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.includeSeperator, placeholderJoin), false);
        return true;
    }
    // if player's nickname is longer than limitation
    if (player.name.length > window.gameRoom.config.settings.nicknameLengthLimit) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for too long nickname.`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.tooLongNickname, placeholderJoin), false); // kick
        return true;
    }

    // if player's nickname is already used (duplicated nickname)
    if (window.gameRoom.config.settings.forbidDuplicatedNickname === true && isExistNickname(player.name) === true) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for duplicated nickname.`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.duplicatedNickname, placeholderJoin), false); // kick
        return true;
    }
    // if player's nickname includes some banned words
    if (window.gameRoom.config.settings.nicknameTextFilter === true && isIncludeBannedWords(window.gameRoom.bannedWordsPool.nickname, player.name) === true) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for including banned word(s).`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.bannedNickname, placeholderJoin), false); // kick
        return true;
    }
    return false;
}

async function kickIfBanned(player: PlayerObject, placeholderJoin: PlaceholderJoin, joinTimeStamp: number): Promise<boolean> {
    let playerBanChecking = await getBanlistDataFromDB(player.conn);
    if (playerBanChecking !== undefined) { // if banned (bListCheck would had returned string or boolean)
        placeholderJoin.banListReason = playerBanChecking.reason;
        if (playerBanChecking.expire == -1) { // Permanent ban
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for registered in permanent ban list. (conn:${player.conn},reason:${playerBanChecking.reason})`);
            window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.banList.permanentBan, placeholderJoin), true); // auto ban
            return true;
        }
        if (playerBanChecking.expire > joinTimeStamp) { // Fixed-term ban (time limited ban)
            placeholderJoin.bannedUntil = new Date(playerBanChecking.expire * 1000).toLocaleDateString('es-AR')
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for registered in fixed-term ban list. (conn:${player.conn},reason:${playerBanChecking.reason})`);
            window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.banList.fixedTermBan, placeholderJoin), false); // auto kick
            return true;
        }
        await unbanIfExpired(playerBanChecking, joinTimeStamp, player);
        return false;
    }
    return false;
}

async function unbanIfExpired(playerBanChecking: BanList, joinTimeStamp: number, player: PlayerObject) {
    if (playerBanChecking.expire != -1 && playerBanChecking.expire <= joinTimeStamp) { // time-over from expiration date
        // ban clear for this player
        LangRes.importantMessage("El jugador " + player.name + " vuelve de su suspension temporal. Esperemos que se porte bien!", null, 2)
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} is deleted from the ban list because the date has expired. (conn:${player.conn},reason:${playerBanChecking.reason})`);
        await removeBanlistDataFromDB(player.conn);
        // window.room.clearBan(player.id); //useless cuz banned player in haxball couldn't make join-event.
    }
}

function kickIfAlreadyConnected(player: PlayerObject, placeholderJoin: PlaceholderJoin): boolean {
    for (let eachPlayer of window.gameRoom._room.getPlayerList().values()) {
        if (eachPlayer.conn === player.conn) {
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for double joinning. (origin:${eachPlayer.name}#${eachPlayer.id},conn:${player.conn})`);
            window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.doubleJoinningKick, placeholderJoin), false);
            return true;
            //window.room.sendAnnouncement(Tst.maketext(LangRes.onJoin.doubleJoinningMsg, placeholderJoin), null, 0xFF0000, "normal", 0); // notify
            // exit from this join event
        }
    }
    return false;
}

