import puppeteer, { Browser, ConsoleMessage, Page } from "puppeteer";
import { Player } from "../game/model/GameObject/Player";
import { winstonLogger } from "../winstonLoggerSystem";
import { BrowserHostRoomInitConfig } from "./browser.hostconfig";
import * as dbUtilityInject from "./db.injection";
import { findStadiumByPlayersLength } from "./maps";
import { Server as SIOserver, Socket as SIOsocket } from "socket.io";
import { TeamID } from "../game/model/GameObject/TeamID";
import Discord from 'discord.js';
import { DiscordWebhookConfig } from "./browser.interface";
import * as maptraining from "./maps/training.hbs";

function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
}

/**
* Use this class for control Headless Browser.
* HeadlessBrowser.getInsance()
*/
export class HeadlessBrowser {
    /**
    * Singleton Instance.
    */
    private static instance: HeadlessBrowser;

    /**
    * Container for headless browser.
    */
    private _BrowserContainer: Browser | undefined;
    private _PageContainer: Map<string, Page> = new Map();
    private _SIOserver: SIOserver | undefined;


    /**
    * DO NOT USE THIS CONSTRUCTOR.
    */
    private HeadlessBrowser() { }

    /**
    * Get Singleton Instance.
    */
    public static getInstance(): HeadlessBrowser {
        if (this.instance == null) {
            this.instance = new HeadlessBrowser();
            //this.instance.initBrowser();
        }
        return this.instance;
    }

    /**
    * Launch and init headless browser.
    */
    private async initBrowser() {
        const browserSettings = {
            customArgs: ['--no-sandbox', '--disable-setuid-sandbox']
            , openHeadless: true
        }
        if (process.env.TWEAKS_HEADLESSMODE && JSON.parse(process.env.TWEAKS_HEADLESSMODE.toLowerCase()) === false) {
            browserSettings.openHeadless = false;
        }
        if (process.env.TWEAKS_WEBRTCANOYM && JSON.parse(process.env.TWEAKS_WEBRTCANOYM.toLowerCase()) === false) {
            browserSettings.customArgs.push('--disable-features=WebRtcHideLocalIpsWithMdns');
        }

        //winstonLogger.info("[core] The browser is opened.");

        this._BrowserContainer = await puppeteer.launch({ headless: browserSettings.openHeadless, args: browserSettings.customArgs });

        this._BrowserContainer.on('disconnected', () => {
            //winstonLogger.info("[core] The browser is closed. Core server will open new one automatically.");
            winstonLogger.info("[core] The browser is closed.");
            this._BrowserContainer!.close();
            this._BrowserContainer = undefined;
            //this.initBrowser();
            return;
        });
    }



    /**
    * Get all pages as array.
    */
    private async fetchPages(): Promise<Page[]> {
        return await this._BrowserContainer!.pages();
    }

    /**
    * Close given page.
    */
    private async closePage(ruid: string) {
        await this._PageContainer.get(ruid)?.evaluate(() => {
            window.gameRoom._room.stopRecording(); // suspend recording for prevent memory leak
        });
        await this._PageContainer.get(ruid)?.close(); // close page
        this._PageContainer.delete(ruid); // delete from container
    }

    /**
    * Create new page.
    */
    private async createPage(ruid: string, initConfig: BrowserHostRoomInitConfig): Promise<Page> {
        if (process.env.TWEAKS_GEOLOCATIONOVERRIDE && JSON.parse(process.env.TWEAKS_GEOLOCATIONOVERRIDE.toLowerCase()) === true) {
            initConfig._config.geo = {
                code: process.env.TWEAKS_GEOLOCATIONOVERRIDE_CODE || "KR"
                , lat: parseFloat(process.env.TWEAKS_GEOLOCATIONOVERRIDE_LAT || "37.5665")
                , lon: parseFloat(process.env.TWEAKS_GEOLOCATIONOVERRIDE_LON || "126.978")
            }
        }

        if (!this._BrowserContainer) await this.initBrowser(); // open if browser isn't exist.

        const page: Page = await this._BrowserContainer!.newPage(); // create new page(tab)

        const existPages = await this._BrowserContainer?.pages(); // get exist pages for check if first blank page is exist
        if (existPages?.length == 2 && this._PageContainer.size == 0) existPages[0].close(); // close useless blank page
        page.on('console', (msg: any) => {
            switch (msg.type()) {
                case "log": {
                    winstonLogger.info(`[${ruid}] ${msg.text()}`);
                    break;
                }
                case "info": {
                    winstonLogger.info(`[${ruid}] ${msg.text()}`);
                    break;
                }
                case "error": {
                    winstonLogger.error(`[${ruid}] ${msg.text()}`);
                    break;
                }
                case "warning": {
                    winstonLogger.warn(`[${ruid}] ${msg.text()}`);
                    break;
                }
                default: {
                    winstonLogger.info(`[${ruid}] ${msg.text()}`);
                    break;
                }
            }
        });
        page.on('pageerror', (msg: any) => {
            winstonLogger.error(`[${ruid}] ${msg}`);
        });
        page.on('requestfailed', (msg: any) => {
            winstonLogger.error(`[${ruid}] ${msg.failure().errorText} ${msg.url()}`);
        });
        page.on('close', () => {
            winstonLogger.info(`[core] The page for the game room '${ruid}' is closed.`);
            this._SIOserver?.sockets.emit('roomct', { ruid: ruid }); // emit websocket event for room create/terminate
        });

        await page.goto('https://www.haxball.com/headless', {
            waitUntil: 'networkidle2'
        });

        // convey configuration values via html5 localStorage
        await page.evaluate((initConfig: string, defaultMap: string, readyMap: string) => {
            localStorage.setItem('_initConfig', initConfig);
            localStorage.setItem('_defaultMap', defaultMap);
            localStorage.setItem('_readyMap', readyMap);
        }, JSON.stringify(initConfig), maptraining.stadium.stadiumText, maptraining.stadium.stadiumText);

        // add event listeners ============================================================
        page.addListener('_SIO.Log', (event: any) => {
            this._SIOserver?.sockets.emit('log', { ruid: ruid, origin: event.origin, type: event.type, message: event.message });
        });
        page.addListener('_SIO.InOut', (event: any) => {
            this._SIOserver?.sockets.emit('joinleft', { ruid: ruid, playerID: event.playerID });
        });
        page.addListener('_SIO.StatusChange', (event: any) => {
            this._SIOserver?.sockets.emit('statuschange', { ruid: ruid, playerID: event.playerID });
        });
        page.addListener('_SOCIAL.DiscordWebhook', (event: any) => {
            const webhookClient = new Discord.WebhookClient(event.id, event.token);

            switch (event.type as string) {
                case "replay": {
                    const bufferData = Buffer.from(JSON.parse(event.content.data));
                    const date = Date.now().toLocaleString();
                    const attachment = new Discord.MessageAttachment(
                        bufferData
                        , `${date}.hbr2`);
                    webhookClient.send(event.content.message, {
                        files: [attachment],
                    });
                    break;
                }
            }
        });
        // ================================================================================

        // ================================================================================
        // inject some functions ==========================================================
        await page.exposeFunction('_emitSIOLogEvent', (origin: string, type: string, message: string) => {
            page.emit('_SIO.Log', { origin: origin, type: type, message: message });
        });
        await page.exposeFunction('_emitSIOPlayerInOutEvent', (playerID: number) => {
            page.emit('_SIO.InOut', { playerID: playerID });
        });
        await page.exposeFunction('_emitSIOPlayerStatusChangeEvent', (playerID: number) => {
            page.emit('_SIO.StatusChange', { playerID: playerID });
        });
        await page.exposeFunction('_feedSocialDiscordWebhook', (id: string, token: string, type: string, content: any) => {
            page.emit('_SOCIAL.DiscordWebhook', { id: id, token: token, type: type, content: content });
        });

        // inject functions for CRUD with DB Server ====================================
        await page.exposeFunction('_createSuperadminDB', dbUtilityInject.createSuperadminDB);
        await page.exposeFunction('_readSuperadminDB', dbUtilityInject.readSuperadminDB);
        //await page.exposeFunction('updateSuperadminDB', dbUtilityInject.updateSuperadminDB); //this function is not implemented.
        await page.exposeFunction('_deleteSuperadminDB', dbUtilityInject.deleteSuperadminDB);

        await page.exposeFunction('_createPlayerDB', dbUtilityInject.createPlayerDB);
        await page.exposeFunction('_readPlayerDB', dbUtilityInject.readPlayerDB);
        await page.exposeFunction('_updatePlayerDB', dbUtilityInject.updatePlayerDB);
        await page.exposeFunction('_deletePlayerDB', dbUtilityInject.deletePlayerDB);

        await page.exposeFunction('_createBanlistDB', dbUtilityInject.createBanlistDB);
        await page.exposeFunction('_readBanlistDB', dbUtilityInject.readBanlistDB);
        await page.exposeFunction('_updateBanlistDB', dbUtilityInject.updateBanlistDB);
        await page.exposeFunction('_deleteBanlistDB', dbUtilityInject.deleteBanlistDB);
        // ================================================================================

        await page.addScriptTag({ // add and load bot script
            path: './out/bot_bundle.js'
        });

        await page.waitForFunction(() => window.gameRoom.link !== undefined && window.gameRoom.link.length > 0); // wait for 30secs(default) until room link is created

        this._PageContainer.set(ruid, page) // save container
        this._SIOserver?.sockets.emit('roomct', { ruid: ruid }); // emit websocket event for room create/terminate
        return this._PageContainer.get(ruid)! // return container for support chaining
    }

    /**
    * Get URI link of the room.
    */
    private async fetchRoomURILink(ruid: string): Promise<string> {
        await this._PageContainer.get(ruid)!.waitForFunction(() => window.gameRoom.link !== undefined && window.gameRoom.link.length > 0); // wait for 30secs(default) until room link is created

        let link: string = await this._PageContainer.get(ruid)!.evaluate(() => {
            return window.gameRoom.link;
        });

        return link;
    }

    /**
    * Check if the room exists.
    */
    private isExistRoom(ruid: string): boolean {
        if (this._PageContainer.has(ruid)) return true;
        else return false;
    }

    /**
     * Attach SIO server reference.
     */
    public attachSIOserver(server: SIOserver) {
        //console.log('attached SIO server.' + server);
        this._SIOserver = server;
    }

    /**
    * Check if the room exists.
    */
    public checkExistRoom(ruid: string): boolean {
        if (this.isExistRoom(ruid)) return true;
        else return false;
    }

    /**
    * Open new room.
    */
    public async openNewRoom(ruid: string, initHostRoomConfig: BrowserHostRoomInitConfig) {
        if (this.isExistRoom(ruid)) {
            throw Error(`The room '${ruid}' is already exist.`);
        } else {
            winstonLogger.info(`[core] New game room '${ruid}' will be opened.`);
            await this.createPage(ruid, initHostRoomConfig);
        }
    }

    /**
    * Close the room.
    */
    public async closeRoom(ruid: string) {
        if (this.isExistRoom(ruid)) {
            winstonLogger.info(`[core] The game room '${ruid}' will be closed.`);
            await this.closePage(ruid);
        } else {
            throw Error(`The room '${ruid}' is not exist.`);
        }
    }

    /**
    * Get a link of the game room.
    */
    public async getRoomLink(ruid: string): Promise<string> {
        if (this.isExistRoom(ruid)) {
            return await this.fetchRoomURILink(ruid);
        } else {
            throw Error(`The room '${ruid}' is not exist.`);
        }
    }

    /**
    * Get how many game rooms are exist.
    */
    public getExistRoomNumber(): number {
        return this._PageContainer.size;
    }

    /**
    * Get all list of exist game rooms.
    */
    public getExistRoomList(): string[] {
        return Array.from(this._PageContainer.keys());
    }

    /**
     * Get the game room's information.
     * @param ruid Game room's RUID
     */
    public async getRoomInfo(ruid: string) {
        if (this.isExistRoom(ruid)) {
            return await this._PageContainer.get(ruid)!.evaluate(() => {
                return {
                    roomName: window.gameRoom.config._config.roomName,
                    onlinePlayers: window.gameRoom.playerList.size
                }
            });
        } else {
            throw Error(`The room '${ruid}' is not exist.`);
        }
    }

    /**
     * Get the game room's detail information.
     * @param ruid Game room's RUID
     */
    public async getRoomDetailInfo(ruid: string) {
        if (this.isExistRoom(ruid)) {
            return await this._PageContainer.get(ruid)!.evaluate(() => {
                return {
                    roomName: window.gameRoom.config._config.roomName,
                    onlinePlayers: window.gameRoom.playerList.size,
                    _link: window.gameRoom.link,
                    _roomConfig: window.gameRoom.config._config,
                    _settings: window.gameRoom.config.settings,
                    _rules: window.gameRoom.config.rules,
                    _HElo: window.gameRoom.config.HElo,
                    _commands: window.gameRoom.config.commands
                }
            });
        } else {
            throw Error(`The room '${ruid}' is not exist.`);
        }
    }

    /**
     * Get all ID list of players joinned.
     */
    public async getOnlinePlayersIDList(ruid: string): Promise<number[]> {
        return await this._PageContainer.get(ruid)!.evaluate(() => {
            return Array.from(window.gameRoom.playerList.keys());
        });
    }

    /**
     * Check this player is online in the room.
     * @param ruid Room UID
     * @param id Player ID
     */
    public async checkOnlinePlayer(ruid: string, id: number): Promise<boolean> {
        return await this._PageContainer.get(ruid)!.evaluate((id: number) => {
            return window.gameRoom.playerList.has(id);
        }, id);
    }

    /**
     * Get Player's Information
     */
    public async getPlayerInfo(ruid: string, id: number): Promise<Player | undefined> {
        return await this._PageContainer.get(ruid)!.evaluate((id: number) => {
            //let idNum: number = parseInt(id);
            if (window.gameRoom.playerList.has(id)) {
                return window.gameRoom.playerList.get(id);
            } else {
                return undefined;
            }
        }, id);
    }

    /**
     * Kick a online player (fixed-term).
     * @param ruid Room UID
     * @param id Player ID
     * @param message Reason
     * @param seconds Fixed-term ban duration
     */
    public async banPlayerFixedTerm(ruid: string, id: number, ban: boolean, message: string, seconds: number): Promise<void> {
        await this._PageContainer.get(ruid)?.evaluate(async (id: number, ban: boolean, message: string, seconds: number) => {
            if (window.gameRoom.playerList.has(id)) {
                const banItem = {
                    conn: window.gameRoom.playerList.get(id)!.conn,
                    reason: message,
                    register: Math.floor(Date.now()),
                    expire: Math.floor(Date.now()) + (seconds * 1000)
                }
                if (await window._readBanlistDB(window.gameRoom.config._RUID, window.gameRoom.playerList.get(id)!.conn) !== undefined) {
                    //if already exist then update it
                    await window._updateBanlistDB(window.gameRoom.config._RUID, banItem);
                } else {
                    // or create new one
                    await window._createBanlistDB(window.gameRoom.config._RUID, banItem);
                }
                window.gameRoom._room.kickPlayer(id, message, ban);
                window.gameRoom.logger.i('system', `[Kick] #${id} has been ${ban ? 'banned' : 'kicked'} by operator. (duration: ${seconds}secs, reason: ${message})`);
            }
        }, id, ban, message, seconds);
    }

    /**
     * Broadcast text message
     */
    public async broadcast(ruid: string, message: string): Promise<void> {
        await this._PageContainer.get(ruid)?.evaluate((message: string) => {
            window.gameRoom._room.sendAnnouncement(message, null, 0xFFFF00, "bold", 2);
            window.gameRoom.logger.i('system', `[Broadcast] ${message}`);
        }, message);
    }

    /**
     * Send whisper text message
     */
    public async whisper(ruid: string, id: number, message: string): Promise<void> {
        await this._PageContainer.get(ruid)?.evaluate((id: number, message: string) => {
            window.gameRoom._room.sendAnnouncement(message, id, 0xFFFF00, "bold", 2);
            window.gameRoom.logger.i('system', `[Whisper][to ${window.gameRoom.playerList.get(id)?.name}#${id}] ${message}`);
        }, id, message);
    }

    /**
     * Get notice message.
     * @param ruid Game room's UID
     */
    public async getNotice(ruid: string): Promise<string | undefined> {
        return await this._PageContainer.get(ruid)!.evaluate(() => {
            if (window.gameRoom.notice) {
                return window.gameRoom.notice;
            } else {
                return undefined;
            }
        });
    }

    /**
     * Set notice message.
     * @param ruid Game room's UID
     * @param message Notice Content
     */
    public async setNotice(ruid: string, message: string): Promise<void> {
        await this._PageContainer.get(ruid)!.evaluate((message: string) => {
            window.gameRoom.notice = message;
        }, message);
    }

    /**
     * Set password of game room.
     * @param ruid Game room's UID
     * @param password Password (null string for disable password)
     */
    public async setPassword(ruid: string, password: string) {
        await this._PageContainer.get(ruid)!.evaluate((password: string) => {
            const convertedPassword: string | null = (password == "") ? null : password;
            window.gameRoom._room.setPassword(convertedPassword);
            window.gameRoom.config._config.password = password;
        }, password);
    }

    /**
     * Get banned words pool for nickname filter
     * @param ruid Game room's UID
     */
    public async getNicknameTextFilteringPool(ruid: string): Promise<string[]> {
        return await this._PageContainer.get(ruid)!.evaluate(() => {
            return window.gameRoom.bannedWordsPool.nickname;
        });
    }

    /**
     * Get banned words pool for chat message filter
     * @param ruid Game room's UID
     */
    public async getChatTextFilteringPool(ruid: string): Promise<string[]> {
        return await this._PageContainer.get(ruid)!.evaluate(() => {
            return window.gameRoom.bannedWordsPool.chat;
        });
    }

    /**
     * Set banned words pool for nickname filter
     * @param ruid Game room's UID
     * @param pool banned words pool
     */
    public async setNicknameTextFilter(ruid: string, pool: string[]) {
        await this._PageContainer.get(ruid)!.evaluate((pool: string[]) => {
            window.gameRoom.bannedWordsPool.nickname = pool;
        }, pool);
    }

    /**
     * Set banned words pool for chat message filter
     * @param ruid Game room's UID
     * @param pool banned words pool
     */
    public async setChatTextFilter(ruid: string, pool: string[]) {
        await this._PageContainer.get(ruid)!.evaluate((pool: string[]) => {
            window.gameRoom.bannedWordsPool.chat = pool;
        }, pool);
    }

    /**
     * Clear banned words pool for nickname filter
     * @param ruid Game room's UID
     */
    public async clearNicknameTextFilter(ruid: string) {
        await this._PageContainer.get(ruid)!.evaluate(() => {
            window.gameRoom.bannedWordsPool.nickname = [];
        });
    }

    /**
     * Clear banned words pool for chat message filter
     * @param ruid Game room's UID
     */
    public async clearChatTextFilter(ruid: string) {
        await this._PageContainer.get(ruid)!.evaluate(() => {
            window.gameRoom.bannedWordsPool.chat = [];
        });
    }

    /**
     * Check if the game room's chat is muted
     * @param ruid Game room's UID
     * @returns 
     */
    public async getChatFreeze(ruid: string): Promise<boolean> {
        return await this._PageContainer.get(ruid)!.evaluate(() => {
            return window.gameRoom.isMuteAll;
        });
    }

    /**
     * Mute or not game room's whole chat
     * @param ruid Game room's UID
     * @param freeze mute or unmute whole chat
     */
    public async setChatFreeze(ruid: string, freeze: boolean) {
        await this._PageContainer.get(ruid)!.evaluate((freeze: boolean) => {
            window.gameRoom.isMuteAll = freeze;
            window.gameRoom.logger.i('system', `[Freeze] Whole chat is ${freeze ? 'muted' : 'unmuted'} by Operator.`);
            window._emitSIOPlayerStatusChangeEvent(0);
        }, freeze);
    }

    /**
     * Mute the player
     * @param ruid ruid Game room's UID
     * @param id player's numeric ID
     * @param muteExpireTime mute expiration time
     */
    public async setPlayerMute(ruid: string, id: number, muteExpireTime: number) {
        await this._PageContainer.get(ruid)!.evaluate((id: number, muteExpireTime: number) => {
            window.gameRoom.playerList.get(id)!.permissions.mute = true;
            window.gameRoom.playerList.get(id)!.permissions.muteExpire = muteExpireTime;

            window.gameRoom.logger.i('system', `[Mute] ${window.gameRoom.playerList.get(id)!.name}#${id} is muted by Operator.`);
            window._emitSIOPlayerStatusChangeEvent(id);
        }, id, muteExpireTime);
    }

    /**
     * Unmute the player
     * @param ruid ruid Game room's UID
     * @param id player's numeric ID
     */
    public async setPlayerUnmute(ruid: string, id: number) {
        await this._PageContainer.get(ruid)!.evaluate((id: number) => {
            window.gameRoom.playerList.get(id)!.permissions.mute = false;

            window.gameRoom.logger.i('system', `[Mute] ${window.gameRoom.playerList.get(id)!.name}#${id} is unmuted by Operator.`);
            window._emitSIOPlayerStatusChangeEvent(id);
        }, id);
    }

    /**
     * Get team colours
     * @param ruid ruid Game room's UID
     * @param team team ID (red 1, blue 2)
     * @returns `angle`, `textColour`, `teamColour1`, `teamColour2`, `teamColour3` as Number
     */
    public async getTeamColours(ruid: string, team: TeamID) {
        return await this._PageContainer.get(ruid)!.evaluate((team: number) => {
            return window.gameRoom.teamColours[team === 1 ? 'red' : 'blue'];
        }, team);
    }

    /**
     * Set team colours
     * @param ruid ruid Game room's UID
     * @param team team ID (red 1, blue 2)
     * @param angle angle for the team color stripes (in degrees)
     * @param textColour color of the player avatars
     * @param teamColour1 first color for the team
     * @param teamColour2 second color for the team
     * @param teamColour3 third color for the team
     */
    public async setTeamColours(ruid: string, team: TeamID, angle: number, textColour: number, teamColour1: number, teamColour2: number, teamColour3: number) {
        await this._PageContainer.get(ruid)!.evaluate((team: number, angle: number, textColour: number, teamColour1: number, teamColour2: number, teamColour3: number) => {
            window.gameRoom._room.setTeamColors(team, angle, textColour, [teamColour1, teamColour2, teamColour3]);

            if (team === 2) {
                window.gameRoom.teamColours.blue = {
                    angle: angle,
                    textColour: textColour,
                    teamColour1: teamColour1,
                    teamColour2: teamColour2,
                    teamColour3: teamColour3,
                }
            } else {
                window.gameRoom.teamColours.red = {
                    angle: angle,
                    textColour: textColour,
                    teamColour1: teamColour1,
                    teamColour2: teamColour2,
                    teamColour3: teamColour3,
                }
            }

            window.gameRoom.logger.i('system', `[TeamColour] New team colour is set for Team ${team}.`);
        }, team, angle, textColour, teamColour1, teamColour2, teamColour3);
    }

    /**
     * Get discord webhook configuration
     * @param ruid ruid Game room's UID
     * @returns discord webhook configuration
     */
    public async getDiscordWebhookConfig(ruid: string) {
        return await this._PageContainer.get(ruid)!.evaluate(() => {
            return window.gameRoom.social.discordWebhook as DiscordWebhookConfig;
        });
    }

    /**
     * Set discord webhook configuration
     * @param ruid ruid Game room's UID
     * @param config discord webhook configuration
     */
    public async setDiscordWebhookConfig(ruid: string, config: DiscordWebhookConfig) {
        await this._PageContainer.get(ruid)!.evaluate((config: DiscordWebhookConfig) => {
            window.gameRoom.social.discordWebhook = config;
        }, config);
    }
}


