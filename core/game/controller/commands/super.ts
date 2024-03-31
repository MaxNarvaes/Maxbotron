import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { superAdminLogin } from "../SuperAdmin";
import { convertToPlayerStorage, setPlayerDataToDB } from "../Storage";
import { getRole } from "../../resource/roleDefinitions";
import { getUnixTimestamp } from "../Statistics";
import { Command } from "./commandInterface";

export class CmdSuper extends Command {
    public commandId: string = "super";
    public helpMan: string = "!super login <codigo> | !super logout | !super thor";
    public timeout: number = 1000;
    async execute(byPlayer: PlayerObject, message: string[]): Promise<void> {
        const submessage : string | undefined =  message[2]
    if (message !== undefined) {
        var player = window.gameRoom.playerList.get(byPlayer.id)!;
        if (player.credentials.password == null || player.credentials.username == null) {
            LangRes.message("No puedes usar este comando sin estar registrado! Registrate usando !register <usuario> <contraseña> (solo letras y numeros)", byPlayer.id);
            return;
        }
        // te saca cuando usas el !help adm
        // no podes empezar el partido con pocos jugadores
        // fixear mensaje de error al registrar
        // chat spam no anda

        switch (message[1]) {
            case 'login': {
                if (player != undefined && player!.permissions.superadmin == false) { // only when not yet loginned
                    if (submessage !== undefined) { // key check and login
                        var login = await superAdminLogin(submessage) ;
                        if (login.role != "player") { // if login key is matched
                            
                            player.permissions.role = getRole(login.role); // set super admin
                            
                            if (login.validDays && login.validDays > 0) {
                                player.permissions.roleExpire = getUnixTimestamp() + (1000 * 60 * 60 * 24 * login.validDays);
                            } else {
                                player.permissions.roleExpire = null;
                            }
                            
                            player.permissions.superadmin = player.permissions.role.superadmin;
                            await setPlayerDataToDB(convertToPlayerStorage(player)); // register(or update) this player into DB
                            window.gameRoom._room.sendAnnouncement(LangRes.command.super.loginSuccess + login.role, byPlayer.id, 0x479947, "normal", 2);
                            window.gameRoom.logger.i('super', `${byPlayer.name}#${byPlayer.id} did successfully login to super admin with the key. (KEY ${submessage})`);
                            if (login.singleUse) {
                                window._deleteSuperadminDB(window.gameRoom.config._RUID, submessage)
                            }
                            window._emitSIOPlayerStatusChangeEvent(byPlayer.id);
                        } else {
                            window.gameRoom.playerList.get(byPlayer.id)!.permissions.malActCount++; // add malicious behaviour count
                            window.gameRoom._room.sendAnnouncement(LangRes.command.super.loginFail, byPlayer.id, 0xFF7777, "normal", 2);
                            window.gameRoom.logger.i('super', `${byPlayer.name}#${byPlayer.id} has failed login to super admin and logged as malicious behaviour. (KEY ${submessage})`);
                        
                            if(window.gameRoom.playerList.get(byPlayer.id)!.permissions.malActCount >= window.gameRoom.config.settings.maliciousBehaviourBanCriterion) {
                                // This player will be permanently banned if it fails to exceed limit.
                                window.gameRoom._room.kickPlayer(byPlayer.id, LangRes.antitrolling.malAct.banReason, true); // ban
                            }
                        }
                    } else {
                        window.gameRoom._room.sendAnnouncement(LangRes.command.super.loginFailNoKey, byPlayer.id, 0xFF7777, "normal", 2);
                    }
                } else {
                    window.gameRoom._room.sendAnnouncement(LangRes.command.super._ErrorLoginAlready, byPlayer.id, 0xFF7777, "normal", 2);
                }

                break;
            }

            case 'logout': {
                if (window.gameRoom.playerList.get(byPlayer.id)!.permissions.superadmin == true) { // only when loginned
                    window.gameRoom.playerList.get(byPlayer.id)!.permissions.superadmin = false; // disqualify super admin
                    //setPlayerData(playerList.get(playerID)); // update
                    window.gameRoom._room.sendAnnouncement(LangRes.command.super.logoutSuccess, byPlayer.id, 0x479947, "normal", 2);
                    window.gameRoom.logger.i('super', `${byPlayer.name}#${byPlayer.id} did logout from super admin.`);
                
                    window._emitSIOPlayerStatusChangeEvent(byPlayer.id);
                } else {
                    window.gameRoom._room.sendAnnouncement(LangRes.command.super._ErrorNoPermission, byPlayer.id, 0xFF7777, "normal", 2);
                }

                break;
            }

            case 'thor': {
                if (window.gameRoom.playerList.get(byPlayer.id)!.permissions.superadmin == true) {
                    window.gameRoom._room.setPlayerAdmin(byPlayer.id, true); // first, give admin
                    window.gameRoom.playerList.get(byPlayer.id)!.admin = true;
                    if (submessage !== undefined && submessage == 'deprive') { // get admin list except this super admin 
                        let players = window.gameRoom._room.getPlayerList().filter((player: PlayerObject) => player.id != 0 && player.id != byPlayer.id && player.admin == true);
                        if (players.length == 0) { // If no players left, do nothing.
                            window.gameRoom._room.sendAnnouncement(LangRes.command.super.thor.noAdmins, byPlayer.id, 0xFF7777, "normal", 2);
                            return;
                        } else {
                            window.gameRoom._room.sendAnnouncement(LangRes.command.super.thor.deprive, byPlayer.id, 0x479947, "normal", 2);
                            players.forEach((player: PlayerObject) => { // disqualify admin permission
                                window.gameRoom._room.setPlayerAdmin(player.id, false);
                                window.gameRoom.playerList.get(player.id)!.admin = false;
                            });
                        }
                    } else {
                        window.gameRoom._room.sendAnnouncement(LangRes.command.super.thor.complete, byPlayer.id, 0x479947, "normal", 2);
                    }
                } else {
                    window.gameRoom._room.sendAnnouncement(LangRes.command.super._ErrorNoPermission, byPlayer.id, 0xFF7777, "normal", 2);
                }

                break;
            }

            /*
            case window.gameRoom.config.commands._superSubbanclear: {
                if (window.playerList.get(byPlayer.id)!.permissions.superadmin == true) { // only when loginned
                    if (submessage !== undefined && submessage == window.gameRoom.config.commands._superSubbanclearall) {
                        window.room.clearBans();
                        Ban.bListClear();
                        window.room.sendAnnouncement(LangRes.command.super.banclear.complete, byPlayer.id, 0x479947, "normal", 2);
                    } else {
                        window.room.sendAnnouncement(LangRes.command.super.banclear.noTarget, byPlayer.id, 0xFF7777, "normal", 2);
                    }
                } else {
                    window.room.sendAnnouncement(LangRes.command.super._ErrorNoPermission, byPlayer.id, 0xFF7777, "normal", 2);
                }
                break;
            }

            case window.gameRoom.config.commands._superSubbanlist: {
                if (window.playerList.get(byPlayer.id)!.permissions.superadmin == true) { // only when loginned
                    let placeholder = {
                        whoisResult: LangRes.command.super.banlist._ErrorNoOne
                    }
                    let bannedPlayerList: BanList[] = Ban.bListGetArray();
                    if (bannedPlayerList.length >= 1) {
                        placeholder.whoisResult = '🚫 '; //init
                        bannedPlayerList.forEach((bannedPlayer: BanList) => {
                            placeholder.whoisResult += bannedPlayer.conn + '(' + bannedPlayer.reason + '), ';
                        });
                    }
                    window.room.sendAnnouncement(Tst.maketext(LangRes.command.super.banlist.whoisList, placeholder), byPlayer.id, 0x479947, "normal", 2);
                } else {
                    window.room.sendAnnouncement(LangRes.command.super._ErrorNoPermission, byPlayer.id, 0xFF7777, "normal", 2);
                }
                break;
            }
            */

            default: {
                window.gameRoom._room.sendAnnouncement(LangRes.command.super._ErrorWrongCommand, byPlayer.id, 0xFF7777, "normal", 2);
                break;
            }
        }
    } else {
        window.gameRoom._room.sendAnnouncement(LangRes.command.super.defaultMessage, byPlayer.id, 0xFF7777, "normal", 2);
    }
    }

}

