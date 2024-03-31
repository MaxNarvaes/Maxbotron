import { Logger } from "../game/controller/Logger"
import { RoomConfig } from '../game/model/RoomObject/RoomConfig';
import { KickStack } from "../game/model/GameObject/BallTrace";
import { Logger } from "../game/controller/Logger";
import { AdminKickTrace } from "../game/model/PlayerBan/AdminKickTrace";
import { Player } from "../game/model/GameObject/Player";
import { GameRoomConfig } from "../game/model/Configuration/GameRoomConfig";
import { TeamID } from "../game/model/GameObject/TeamID";
import { Room } from "../game/model/RoomObject/RoomObject";
import { PlayerStorage } from "../game/model/GameObject/PlayerObject";
import { TeamInfo } from "../game/model/GameObject/TeamInfo";
import { stadiumInfo } from "../lib/maps/stadiumInfo";
import { Animator } from "../game/model/GameObject/Animation";
import { ClipInfo } from "../game/model/RoomObject/ClipInfo";
import { SuperAdminResponse } from "../lib/db.injection";

declare global {
    interface Window {
        // ==============================
        // bot
        gameRoom: {
            _room: Room // haxball room container

            config: GameRoomConfig // bot settings collection
            link: string // for sharing URI link of the room

            social: {
                discordWebhook: {
                    feed: boolean
                    id: string
                    token: string
                    replayUpload: boolean
                }
            }

            stadiumData: {
                default: string
                training: string
            }

            animator: Animator

            currentStadium: stadiumInfo

            bannedWordsPool: {
                nickname: string[]
                chat: string[]
            }

            teamColours: {
                red: {
                    angle: number
                    textColour: number
                    teamColour1: number
                    teamColour2: number
                    teamColour3: number
                }
                blue: {
                    angle: number
                    textColour: number
                    teamColour1: number
                    teamColour2: number
                    teamColour3: number
                }
            }

            logger: Logger // logger for whole bot application

            isStatRecord: boolean // TRUE means that recording stats now
            isGamingNow: boolean // is playing now?
            isMuteAll: boolean // is All players muted?
            playerList: Map<number, Player> // player list (key: player.id, value: Player), usage: playerList.get(player.id).name
            playerTimeouts: Set<string> // player commands timeouts
            ballStack: KickStack // stack for ball tracing

            clips: ClipInfo[]

            currentTeams: {
                red: TeamInfo,
                redGoalKeeper: Player | null
                blue: TeamInfo,
                blueGoalKeeper: Player | null
            }

            banVoteCache: number[] // top voted players list, value: player.id

            winningStreak: { // how many wins straight (streak)
                count: number
                teamID: TeamID
            }

            antiTrollingOgFloodCount: number[] // flood counter for OG (player id: number)
            antiTrollingChatFloodCount: number[] // flood counter for chat. (player id: number)
            antiInsufficientStartAbusingCount: number[] // ID record for start with insufficient players (player id: number)
            antiPlayerKickAbusingCount: AdminKickTrace[] // ID and Timestamp record for abusing kick other players (id:number, register date:number)

            notice: string // Notice Message

            // on dev-console tools for emergency
            onEmergency: {
                list(): void
                chat(msg: string, playerID?: number): void
                kick(playerID: number, msg?: string): void
                ban(playerID: number, msg?: string): void
                //banclearall(): void
                //banlist(): void
                password(password?: string): void
            }
        }
        // ==============================

        // ==============================
        // INJECTED from Core Server
        // Injected functions
        _emitSIOLogEvent(origin: string, type: string, message: string): void
        _emitSIOPlayerInOutEvent(playerID: number): void
        _emitSIOPlayerStatusChangeEvent(playerID: number): void
        _feedSocialDiscordWebhook(id: string, token: string, type: string, content: any): void
        // CRUD with DB Server via REST API
        async _createPlayerDB(ruid: string, player: PlayerStorage): Promise<PlayerStorage | undefined>
        async _findPlayerByAuth(ruid: string, playerAuth: string): Promise<PlayerStorage | undefined>
        async _findPlayerByUsername(ruid: string, username: string): Promise<PlayerStorage | undefined>
        async _existsPlayerByUsername(ruid: string, username: string): Promise<boolean>
        async _updatePlayerDB(ruid: string, player: PlayerStorage): Promise<PlayerStorage | undefined>
        async _deletePlayerDB(ruid: string, playerAuth: string): Promise<void>

        async _createBanlistDB(ruid: string, banList: Ban): Promise<void>
        async _readBanlistDB(ruid: string, playerConn: string): Promise<Ban | undefined>
        async _updateBanlistDB(ruid: string, banList: Ban): Promise<void>
        async _deleteBanlistDB(ruid: string, playerConn: string): Promise<void>

        async _createSuperadminDB(ruid: string, key: string, description: string): Promise<void>
        async _readSuperadminDB(ruid: string, key: string): Promise<SuperAdminResponse | undefined>
        //async updateSuperadminDB is not implemented.
        async _deleteSuperadminDB(ruid: string, key: string): Promise<void>
        // ==============================

        // ==============================
        // Haxball Headless Initial Methods
        // DO NOT EDIT THESE THINGS
        HBInit(config: RoomConfig): Room
        onHBLoaded(): void
        // ==============================
    }
}
