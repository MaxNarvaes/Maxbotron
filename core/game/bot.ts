// Haxbotron by dapucita
// MAIN OF THE BOT
// ====================================================================================================
// import modules
import * as LangRes from "./resource/strings";
import * as eventListener from "./controller/events/eventListeners";
import * as Tst from "./controller/Translator";
import { Player } from "./model/GameObject/Player";
import { Logger } from "./controller/Logger";
import { PlayerObject } from "./model/GameObject/PlayerObject";
import { ScoresObject } from "./model/GameObject/ScoresObject";
import { KickStack } from "./model/GameObject/BallTrace";
import { getUnixTimestamp } from "./controller/Statistics";
import { TeamID } from "./model/GameObject/TeamID";
import { EmergencyTools } from "./model/ExposeLibs/EmergencyTools";
import { refreshBanVoteCache } from "./model/OperateHelper/Vote";
import { GameRoomConfig } from "./model/Configuration/GameRoomConfig";
import { TeamUniform } from "./model/GameObject/TeamUniform";
import { TeamInfo } from "./model/GameObject/TeamInfo";
import { randomInteger } from "./controller/RoomTools";
import { maps } from "../lib/maps";
import { number } from "joi";
import { Animator, pickRandomElement } from "./model/GameObject/Animation";
// ====================================================================================================
// load initial configurations
const loadedConfig: GameRoomConfig = JSON.parse(localStorage.getItem('_initConfig')!);

window.gameRoom = {
    _room: window.HBInit(loadedConfig._config)
    , config: loadedConfig
    , link: ''
    , social: {
        discordWebhook: {
            feed: false
            , replayUpload: false
            , id: ''
            , token: ''
        }
    }
    , stadiumData: {
        default: localStorage.getItem('_defaultMap')!
        , training: localStorage.getItem('_readyMap')!
    }
    , animator: new Animator()
    , currentStadium: maps[0]
    , clips: []
    , bannedWordsPool: {
        nickname: []
        , chat: []
    }
    , teamColours: {
        red: { angle: 0, textColour: 0xffffff, teamColour1: 0xe66e55, teamColour2: 0xe66e55, teamColour3: 0xe66e55 }
        , blue: { angle: 0, textColour: 0xffffff, teamColour1: 0x5a89e5, teamColour2: 0x5a89e5, teamColour3: 0x5a89e5 }
    }
    , logger: Logger.getInstance()
    , isStatRecord: false
    , isGamingNow: false
    , isMuteAll: false
    , playerList: new Map()
    , playerTimeouts: new Set()
    , ballStack: KickStack.getInstance()
    , currentTeams: {
        blue: new TeamInfo(TeamID.Spec, "blue", "blue", "arg", [new TeamUniform(0, [], 0)]),
        blueGoalKeeper: null,
        red: new TeamInfo(TeamID.Spec, "red", "red", "arg", [new TeamUniform(0, [], 0)]),
        redGoalKeeper: null
    }
    , banVoteCache: []
    , winningStreak: { count: 0, teamID: TeamID.Spec }
    , antiTrollingOgFloodCount: []
    , antiTrollingChatFloodCount: []
    , antiInsufficientStartAbusingCount: []
    , antiPlayerKickAbusingCount: []
    , notice: ''
    , onEmergency: EmergencyTools
}

// clear localStorage
localStorage.removeItem('_initConfig');
localStorage.removeItem('_defaultMap');
localStorage.removeItem('_readyMap');

// start main bot script
console.log(`Haxbotron loaded bot script. (UID ${window.gameRoom.config._RUID}, TOKEN ${window.gameRoom.config._config.token})`);

window.document.title = `Maxbotron ${window.gameRoom.config._RUID}`;

makeRoom();
// ====================================================================================================
// set scheduling timers

var scheduledTimer150 = setInterval(() => {
    window.gameRoom._room.sendAnnouncement(pickRandomElement(LangRes.scheduler.advertise), null, LangRes.style.colors.Golden, "bold", 1); // advertisement
}, 150000); // 60secs 

var scheduledTimer60 = setInterval(() => {
    refreshBanVoteCache(); // update banvote status cache
    if (window.gameRoom.banVoteCache.length >= 1) { // if there are some votes (include top voted players only)
        let placeholderVote = {
            voteList: ''
        }
        for (let i: number = 0; i < window.gameRoom.banVoteCache.length; i++) {
            if (window.gameRoom.playerList.has(window.gameRoom.banVoteCache[i])) {
                placeholderVote.voteList += `${window.gameRoom.playerList.get(window.gameRoom.banVoteCache[i])!.name}#${window.gameRoom.banVoteCache[i]} `;
            }
        }
        window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.scheduler.banVoteAutoNotify, placeholderVote), null, LangRes.style.colors.Green, "normal", 0); //notify it
    }
    window.gameRoom.playerList.forEach((v, k) => {
        if(v.credentials.password == null || v.credentials.username == null) {
            LangRes.importantMessage("No estas registrado y tus stats no se guardan! Registrate usando !register <usuario> <contraseña> (solo letras y numeros)", v.id);
        }
    })
    if(window.gameRoom.currentTeams.blueGoalKeeper == null) {
        LangRes.message("El equipo azul no tiene arquero. Ofrecete con el comando !gk")
    }

    if(window.gameRoom.currentTeams.redGoalKeeper == null) {
        LangRes.message("El equipo rojo no tiene arquero. Ofrecete con el comando !gk")
    }
}, 60000); // 60secs 

var scheduledTimer5 = setInterval(() => {
    const nowTimeStamp: number = getUnixTimestamp(); //get timestamp

    let placeholderScheduler = {
        targetID: 0,
        targetName: '',
        time: 0
    }

    window.gameRoom.playerList.forEach((player: Player) => { // afk detection system & auto unmute system
        // init placeholder
        placeholderScheduler.targetID = player.id;
        placeholderScheduler.targetName = player.name;

        // check muted player and unmute when it's time to unmute
        if (player.permissions.mute === true && player.permissions.muteExpire !== -1 && nowTimeStamp > player.permissions.muteExpire) {
            player.permissions.mute = false; //unmute
            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.scheduler.autoUnmute, placeholderScheduler), null, 0x479947, "normal", 0); //notify it
            window._emitSIOPlayerStatusChangeEvent(player.id);
        }

        // when afk too long kick option is enabled, then check sleeping with afk command and kick if afk too long
        if (window.gameRoom.config.settings.afkCommandAutoKick === true && player.permissions.afkmode === true && player.permissions.superadmin === false) {
            if (nowTimeStamp > player.permissions.afkdate + window.gameRoom.config.settings.afkCommandAutoKickAllowMillisecs) {
                window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.scheduler.afkCommandTooLongKick, placeholderScheduler), false); // kick
            }
        }

        // check afk
        checkAfk(player, placeholderScheduler);
    });
}, 5000); // 5secs

function checkAfk(player: Player, placeholderScheduler: { targetID: number; targetName: string; time: number}) {
    if (window.gameRoom.isGamingNow === true && window.gameRoom.isStatRecord === true && player.permissions.superadmin === false) { // if the game is in playing
        if (player.team != TeamID.Spec) { // if the player is not spectators(include afk mode)
            if (player.afktrace.count >= window.gameRoom.config.settings.afkCountLimit) { // if the player's count is over than limit
                window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.scheduler.afkKick, placeholderScheduler), false); // kick
            } else {
                if (player.afktrace.count >= 1) { // only when the player's count is not 0(in activity)
                    placeholderScheduler.time = (window.gameRoom.config.settings.afkCountLimit - player.afktrace.count) * 5
                    window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.scheduler.afkDetect, placeholderScheduler), player.id, 0xFF7777, "bold", 2); // warning for all
                }
                player.afktrace.count++; // add afk detection count
            }
        }
    } else {
        if (player.admin == true && player.permissions.superadmin == false) { // if the player is admin
            if (player.afktrace.count >= window.gameRoom.config.settings.afkCountLimit) { // if the player's count is over than limit
                window.gameRoom._room.kickPlayer(player.id, Tst.maketext(LangRes.scheduler.afkKick, placeholderScheduler), false); // kick
            } else {
                if (player.afktrace.count >= 1) { // only when the player's count is not 0(in activity)
                    window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.scheduler.afkDetect, placeholderScheduler), player.id, 0xFF7777, "bold", 2); // warning for all
                    window.gameRoom._room.sendAnnouncement(player.admin + " y " + player.permissions.role.key + " y " + player.permissions.superadmin, player.id, 0xFF7777, "bold", 2); // warning for all
                }
                player.afktrace.count++;
            }
        }
    }
}

// ====================================================================================================
// declare functions
function makeRoom(): void {
    window.gameRoom.logger.i('initialisation', `The game room is opened at ${window.gameRoom.config._LaunchDate.toLocaleString()}.`);

    window.gameRoom.logger.i('initialisation', `The game mode is '${window.gameRoom.isGamingNow}' now(by default).`);

    window.gameRoom._room.setCustomStadium(window.gameRoom.stadiumData.training);
    window.gameRoom._room.setScoreLimit(window.gameRoom.config.rules.requisite.scoreLimit);
    window.gameRoom._room.setTimeLimit(window.gameRoom.config.rules.requisite.timeLimit);
    window.gameRoom._room.setTeamsLock(window.gameRoom.config.rules.requisite.teamLock);

    // Linking Event Listeners
    window.gameRoom._room.onPlayerJoin = async (player: PlayerObject): Promise<void> => await eventListener.onPlayerJoinListener(player);
    window.gameRoom._room.onPlayerLeave = async (player: PlayerObject): Promise<void> => await eventListener.onPlayerLeaveListener(player);
    window.gameRoom._room.onTeamVictory = async (scores: ScoresObject): Promise<void> => await eventListener.onTeamVictoryListener(scores);
    window.gameRoom._room.onPlayerChat = (player: PlayerObject, message: string): boolean => eventListener.onPlayerChatListener(player, message);
    window.gameRoom._room.onPlayerBallKick = (player: PlayerObject): void => eventListener.onPlayerBallKickListener(player);
    window.gameRoom._room.onTeamGoal = async (team: TeamID): Promise<void> => await eventListener.onTeamGoalListener(team);
    window.gameRoom._room.onGameStart = (byPlayer: PlayerObject): void => eventListener.onGameStartListener(byPlayer);
    window.gameRoom._room.onGameStop = (byPlayer: PlayerObject): void => eventListener.onGameStopListener(byPlayer);
    window.gameRoom._room.onPlayerAdminChange = (changedPlayer: PlayerObject, byPlayer: PlayerObject): void => eventListener.onPlayerAdminChangeListener(changedPlayer, byPlayer);
    window.gameRoom._room.onPlayerTeamChange = (changedPlayer: PlayerObject, byPlayer: PlayerObject): void => eventListener.onPlayerTeamChangeListener(changedPlayer, byPlayer);
    window.gameRoom._room.onPlayerKicked = (kickedPlayer: PlayerObject, reason: string, ban: boolean, byPlayer: PlayerObject): void => eventListener.onPlayerKickedListener(kickedPlayer, reason, ban, byPlayer);
    window.gameRoom._room.onGameTick = (): void => eventListener.onGameTickListener();
    window.gameRoom._room.onGamePause = (byPlayer: PlayerObject): void => eventListener.onGamePauseListener(byPlayer);
    window.gameRoom._room.onGameUnpause = (byPlayer: PlayerObject): void => eventListener.onGameUnpauseListener(byPlayer);
    window.gameRoom._room.onPositionsReset = (): void => eventListener.onPositionsResetListener();
    window.gameRoom._room.onPlayerActivity = (player: PlayerObject): void => eventListener.onPlayerActivityListener(player);
    window.gameRoom._room.onStadiumChange = (newStadiumName: string, byPlayer: PlayerObject): void => eventListener.onStadiumChangeListner(newStadiumName, byPlayer);
    window.gameRoom._room.onRoomLink = (url: string): void => eventListener.onRoomLinkListener(url);
    window.gameRoom._room.onKickRateLimitSet = (min: number, rate: number, burst: number, byPlayer: PlayerObject): void => eventListener.onKickRateLimitSetListener(min, rate, burst, byPlayer);
    // =========================
}

function printVc() {
    var msg = "TIP: ¿Querés hablar con los pibes? Entra al VC del discord: ";
    window.gameRoom._room.sendAnnouncement(msg, null, 0x00FF00, null, null);
}

function printRules() {
    window.gameRoom._room.sendAnnouncement(" 😮‍💨 Ingresa a nuestro discord para ver las reglas de la sala!", null, 0x8466FD, null, null);
}
