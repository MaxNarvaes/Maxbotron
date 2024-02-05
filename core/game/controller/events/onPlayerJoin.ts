import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Player } from "../../model/GameObject/Player";
import { convertToPlayerStorage, getBanlistDataFromDB, getPlayerDataFromDB, removeBanlistDataFromDB, setBanlistDataToDB, setPlayerDataToDB } from "../Storage";
import { getUnixTimestamp } from "../Statistics";
import { setDefaultStadiums, setStadium, updateAdmins } from "../RoomTools";
import { convertTeamID2Name, TeamID } from "../../model/GameObject/TeamID";
import { recruitByOne, roomActivePlayersNumber, roomTeamPlayersNumberCheck } from "../../model/OperateHelper/Quorum";
import { decideTier } from "../../model/Statistics/TierFunctions";
import { isExistNickname, isIncludeBannedWords } from "../TextFilter";
import { getRole } from "../../resource/roleDefinitions";
import { pickRandomElement } from "../../model/GameObject/Animation";
import { masterAnimations } from "../../model/GameObject/playerDefaultAnimations";

export async function onPlayerJoinListener(player: PlayerObject): Promise<void> {
    window._emitSIOLogEvent("onPlayerJoinListener", "info", "onPlayerJoinListener: " + player.name);
    const joinTimeStamp: number = getUnixTimestamp();

    // logging into console
    window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} has joined. CONN(${player.conn}),AUTH(${player.auth})`);

    // Event called when a new player joins the room.
    var placeholderJoin = {
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
        gameRuleName: window.gameRoom.config.rules.ruleName,
        gameRuleLimitTime: window.gameRoom.config.rules.requisite.timeLimit,
        gameRuleLimitScore: window.gameRoom.config.rules.requisite.scoreLimit,
        gameRuleNeedMin: window.gameRoom.config.rules.requisite.minimumPlayers,
        possTeamRed: window.gameRoom.ballStack.possCalculate(TeamID.Red),
        possTeamBlue: window.gameRoom.ballStack.possCalculate(TeamID.Blue),
        streakTeamName: convertTeamID2Name(window.gameRoom.winningStreak.teamID),
        streakTeamCount: window.gameRoom.winningStreak.count,
        banListReason: ''
    };

    // check ban list
    let playerBanChecking = await getBanlistDataFromDB(player.conn);
    if (playerBanChecking !== undefined) {// if banned (bListCheck would had returned string or boolean)
        placeholderJoin.banListReason = playerBanChecking.reason;

        if (playerBanChecking.expire == -1) { // Permanent ban
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for registered in permanent ban list. (conn:${player.conn},reason:${playerBanChecking.reason})`);
            window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.banList.permanentBan, placeholderJoin), true); // auto ban
            return;
        }
        if (playerBanChecking.expire > joinTimeStamp) { // Fixed-term ban (time limited ban)
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for registered in fixed-term ban list. (conn:${player.conn},reason:${playerBanChecking.reason})`);
            window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.banList.fixedTermBan, placeholderJoin), false); // auto kick
            return;
        }
        if (playerBanChecking.expire != -1 && playerBanChecking.expire <= joinTimeStamp) { // time-over from expiration date
            // ban clear for this player
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} is deleted from the ban list because the date has expired. (conn:${player.conn},reason:${playerBanChecking.reason})`);
            await removeBanlistDataFromDB(player.conn);
            // window.room.clearBan(player.id); //useless cuz banned player in haxball couldn't make join-event.
        }
    }

    // if this player use seperator (|,|) in nickname, then kick
    if (player.name.includes('|,|')) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for including seperator word. (|,|)`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.includeSeperator, placeholderJoin), false); // kick
        return;
    }
    
    // if this player has already joinned by other connection
    for (let eachPlayer of window.gameRoom._room.getPlayerList().values()) {
        if(eachPlayer.conn === player.conn) {
            window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for double joinning. (origin:${eachPlayer.name}#${eachPlayer.id},conn:${player.conn})`);
            window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.doubleJoinningKick, placeholderJoin), false); // kick
            //window.room.sendAnnouncement(Tst.maketext(LangRes.onJoin.doubleJoinningMsg, placeholderJoin), null, 0xFF0000, "normal", 0); // notify
            return; // exit from this join event
        }
    }

    // if player's nickname is longer than limitation
    if (player.name.length > window.gameRoom.config.settings.nicknameLengthLimit) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for too long nickname.`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.tooLongNickname, placeholderJoin), false); // kick
        return;
    }

    // if player's nickname is already used (duplicated nickname)
    if (window.gameRoom.config.settings.forbidDuplicatedNickname === true && isExistNickname(player.name) === true) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for duplicated nickname.`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.duplicatedNickname, placeholderJoin), false); // kick
        return;
    }

    // if player's nickname includes some banned words
    if (window.gameRoom.config.settings.nicknameTextFilter === true && isIncludeBannedWords(window.gameRoom.bannedWordsPool.nickname, player.name) === true) {
        window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for including banned word(s).`);
        window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.onJoin.bannedNickname, placeholderJoin), false); // kick
        return;
    }

    // add the player who joined into playerList by creating class instance
    let existPlayerData = await getPlayerDataFromDB(player.auth);
    if (existPlayerData !== undefined) {
        // if this player is existing player (not new player)
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
            perfectGk: existPlayerData.perfectGk
        }, {
            mute: existPlayerData.mute,
            muteExpire: existPlayerData.muteExpire,
            afkmode: false,
            afkreason: '',
            afkdate: 0,
            malActCount: existPlayerData.malActCount,
            superadmin: existPlayerData.superadmin,
            role: getRole(existPlayerData.role)
        }, {
            rejoinCount: existPlayerData.rejoinCount,
            joinDate: joinTimeStamp,
            leftDate: existPlayerData.leftDate,
            matchEntryTime: 0
        });

        if (newPlayer.permissions.role.key === "master") {
            newPlayer.animations = masterAnimations();
        }

        if (window.gameRoom.config.settings.avatarOverridingByTier === true) {
            // if avatar overrding option is enabled
            newPlayer.animations.onJoin[0].frames[0].bitmaps = [decideTier(player.id).avatar];
            newPlayer.currentAnimation = pickRandomElement(newPlayer.animations.onJoin);
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
            placeholderJoin.playerNameOld = existPlayerData.name
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.changename, placeholderJoin), null, 0x00FF00, "normal", 0);
        }

        // check anti-rejoin flood when this option is enabled
        if (window.gameRoom.config.settings.antiJoinFlood === true) { //FIXME: Connection Closed Message is shown when anti-rejoin flooding kick (FIND the reason why)
            if (joinTimeStamp - existPlayerData.leftDate <= window.gameRoom.config.settings.joinFloodIntervalMillisecs) { // when rejoin flood
                if (existPlayerData.rejoinCount > window.gameRoom.config.settings.joinFloodAllowLimitation) {
                    // kick this player
                    window.gameRoom.logger.i('onPlayerJoin', `${player.name}#${player.id} was joined but kicked for anti-rejoin flood. (origin:${player.name}#${player.id},conn:${player.conn})`);
                    window.gameRoom._room.kickPlayer(player.id, LangRes.antitrolling.joinFlood.banReason, false); // kick
                    //and add into ban list (not permanent ban, but fixed-term ban)
                    await setBanlistDataToDB({ conn: player.conn, reason: LangRes.antitrolling.joinFlood.banReason, register: joinTimeStamp, expire: joinTimeStamp + window.gameRoom.config.settings.joinFloodBanMillisecs })
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

    } else {
        // if new player
        // create a Player Object
        window.gameRoom.playerList.set(player.id, new Player(player, {            
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
            perfectGk: 0
        }, {
            mute: false,
            muteExpire: 0,
            afkmode: false,
            afkreason: '',
            afkdate: 0,
            malActCount: 0,
            superadmin: false,
            role: getRole("player")
        }, {
            rejoinCount: 0,
            joinDate: joinTimeStamp,
            leftDate: 0,
            matchEntryTime: 0
        }));
    }

    window.gameRoom.logger.e("onplayer join", "onplayer join: guardar player db: " + window.gameRoom.playerList.get(player.id)!)

    await setPlayerDataToDB(convertToPlayerStorage(window.gameRoom.playerList.get(player.id)!)); // register(or update) this player into DB

    if (window.gameRoom.config.rules.autoAdmin === true) { // if auto admin option is enabled
        updateAdmins(); // check there are any admin players, if not make an admin player.
    }

    // send welcome message to new player. other players cannot read this message.
    window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.welcome, placeholderJoin), player.id, 0x00FF00, "normal", 0);

    // send notice
    if(window.gameRoom.notice !== '') {
        window.gameRoom._room.sendAnnouncement(window.gameRoom.notice, player.id, 0x55AADD, "bold", 0);
    }

    // check number of players joined and change game mode
    let activePlayersNumber: number = roomActivePlayersNumber();
    if (window.gameRoom.config.rules.statsRecord === true && activePlayersNumber >= window.gameRoom.config.rules.requisite.minimumPlayers) {
        if (window.gameRoom.isStatRecord === false) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.startRecord, placeholderJoin), null, 0x00FF00, "normal", 0);
            window.gameRoom.isStatRecord = true;
            if (window.gameRoom.config.rules.autoOperating === true && window.gameRoom.isGamingNow === true) {
                // if auto emcee mode is enabled and the match has been playing as ready mode
                window.gameRoom._room.stopGame(); // stop game
            }
        }
    } else {
        if (window.gameRoom.isStatRecord === true) {
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.onJoin.stopRecord, placeholderJoin), null, 0x00FF00, "normal", 0);
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
