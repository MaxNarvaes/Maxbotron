import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Player } from "../../model/GameObject/Player";
import { getUnixTimestamp } from "../Statistics";
import { roomPlayersNumberCheck } from "../../model/OperateHelper/Quorum";
import * as LangRes from "../../resource/strings";
import * as Tst from "../Translator";
import { setBanlistDataToDB } from "../Storage";
import { Command } from "./commandInterface";

export class CmdVote extends Command {
    public commandId: string = "vote";
    public helpMan: string = "Vota para banear a alguien !ban <#ID>";
    public timeout: number = 5000;
    execute(byPlayer: PlayerObject, message: string[]): void {
        if (!window.gameRoom.config.settings.banVoteEnable) {
            // if ban vote is not enabled
            window.gameRoom._room.sendAnnouncement(LangRes.command._ErrorDisabled, byPlayer.id, 0xFF7777, "normal", 1);
            return; //abort this command
        }
        if (message !== undefined) {
            if (message[1].charAt(0) == "#") {
                let targetVoteID: number = parseInt(message[1].substr(1), 10);
                if (isNaN(targetVoteID) !== true && window.gameRoom.playerList.has(targetVoteID) === true) {
                    let placeholderVote = {
                        targetName: window.gameRoom.playerList.get(targetVoteID)!.name
                        ,targetID: targetVoteID
                    }
                    if (window.gameRoom.playerList.get(byPlayer.id)!.voteTarget === targetVoteID) { // if already voted, then cancel
                        window.gameRoom.playerList.get(byPlayer.id)!.voteTarget = -1; // reset vote
                        window.gameRoom.playerList.get(targetVoteID)!.voteGet--; // reduce voted count
                        window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.vote.voteCancel, placeholderVote), byPlayer.id, 0x479947, "normal", 1);
                    } else { // or vote
                        if (roomPlayersNumberCheck() >= window.gameRoom.config.settings.banVoteAllowMinimum) { // check current players and vote
                            if(window.gameRoom.playerList.has(window.gameRoom.playerList.get(byPlayer.id)!.voteTarget)) {
                                // if this playeralready had voted other playerr, delete the old vote.
                                window.gameRoom.playerList.get(window.gameRoom.playerList.get(byPlayer.id)!.voteTarget)!.voteGet--;
                            }
                            
                            window.gameRoom.playerList.get(byPlayer.id)!.voteTarget = targetVoteID; // vote and set
                            window.gameRoom.playerList.get(targetVoteID)!.voteGet++; // increase voted count
                            window.gameRoom._room.sendAnnouncement(Tst.maketext(LangRes.command.vote.voteComplete, placeholderVote), byPlayer.id, 0x479947, "normal", 1);
                            //TODO: 기존 투표를 해놓고 새로 투표하는 경우, 기존것은 무효화하는 로직 추가할것
                            const banTimeStamp: number = getUnixTimestamp(); // get current timestamp
                            window.gameRoom.playerList.forEach(async (player: Player) => {
                                if(player.voteGet >= window.gameRoom.config.settings.banVoteExecuteMinimum) { // if the player got votes over minimum requirements, then kick (fixed-term ban)
                                    //add into ban list (not permanent ban, but fixed-term ban)
                                    await setBanlistDataToDB({ conn: player.conn, reason: LangRes.command.vote.voteBanMessage, register: banTimeStamp, expire: banTimeStamp+window.gameRoom.config.settings.banVoteBanMillisecs });
                                    window.gameRoom._room.kickPlayer(player.id, LangRes.command.vote.voteBanMessage, false); // and kick
                                }
                            });
                        } else { // if minimum requirement isn't met, cancel this vote and notify warning.
                            window.gameRoom._room.sendAnnouncement(LangRes.command.vote._ErrorNoPermission, byPlayer.id, 0xFF7777, "normal", 1);
                        }
                    }
                } else {
                    window.gameRoom._room.sendAnnouncement(LangRes.command.vote._ErrorNoPlayer, byPlayer.id, 0xFF7777, "normal", 1);
                }
            } else {
                window.gameRoom._room.sendAnnouncement(LangRes.command.vote._ErrorNoPlayer, byPlayer.id, 0xFF7777, "normal", 1);
            }
        } else {
            let statusMessage: string = LangRes.command.vote.voteIntroduce;
            let voteTargetID: number = window.gameRoom.playerList.get(byPlayer.id)!.voteTarget || -1;
            let placeholder = {
                targetName: '',
                targetID: voteTargetID,
                voteList: '',
            };
    
            if(window.gameRoom.banVoteCache.length >= 1) { // if there are some votes (include top voted players only)
                for(let i: number = 0; i < window.gameRoom.banVoteCache.length; i++) {
                    if(window.gameRoom.playerList.has(window.gameRoom.banVoteCache[i])) {
                        placeholder.voteList += `${window.gameRoom.playerList.get(window.gameRoom.banVoteCache[i])!.name}#${window.gameRoom.banVoteCache[i]} `;
                    }
                }
                statusMessage += '\n' + LangRes.command.vote.voteAutoNotify;
            }
    
            if(voteTargetID !== -1 && window.gameRoom.playerList.has(voteTargetID)) {
                statusMessage += '\n' + LangRes.command.vote.voteStatus;
                placeholder.targetName = window.gameRoom.playerList.get(voteTargetID)!.name;
            }
            window.gameRoom._room.sendAnnouncement(Tst.maketext(statusMessage, placeholder), byPlayer.id, 0x479947, "normal", 1);
        }
    }

}
