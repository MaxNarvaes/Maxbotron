import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { playerlistRouter } from "../../../web/router/api/v1/playerlist";
import { PlayerObject, PlayerWarning } from "../../model/GameObject/PlayerObject";
import { message } from "../../resource/strings";
import { getUnixTimestamp } from "../Statistics";
import { convertToPlayerStorage, setBanlistDataToDB, setPlayerDataToDB } from "../Storage";
import { authorizeCommand, registerCommandTimeout } from "./commandHelper";
import { pickRandomElement } from "../../model/GameObject/Animation";
import { Command } from "./commandInterface";

export class CmdWarn extends Command {
    public commandId: string = 'warn';
    public helpMan: string = "Amonesta a jugador !tarjeta <#ID>. A la segunda amonestacion en un mismo partido sera baneado x 30 minutos";
    public timeout: number = 1000;

    static millInAMinute: number = 60000;
    async execute(byPlayer: PlayerObject, message: string[]): Promise<void> {
        var expulsionMinutes = 30;
    const exclude = ["player", "visitor", "vip", "supervip"]
    if (authorizeCommand(byPlayer, this.commandId, exclude) == false) return;
    //sendChat(byPlayer, message[0]);
    if (message[1].charAt(0) == "#") {
        let warnedId: number = parseInt(message[1].substr(1), 10);
        if (isNaN(warnedId) !== true && window.gameRoom.playerList.has(warnedId) === true) {
            var warnedPlayer = window.gameRoom.playerList.get(warnedId)!;
            const reasons = ["Le pintó", "No le gustó la cara", "Le parece un pelotudo", "Se la tenia jurada", "Su mujer lo gorrio con el"]
            var reason = pickRandomElement<string>(reasons);
            if (message.length > 2) {
                reason = message.slice(2).join(" ");
            }
            
            warnedPlayer.warnings.push({ reason: reason, time: window.gameRoom._room.getScores()!.time })

            if (warnedPlayer.warnings.length == 1) {
                LangRes.commentary("Al jugador " + warnedPlayer.name + " el arbitro le muestra la amarilla! razon: " + reason);
                LangRes.importantMessage("El admin " + byPlayer.name + " te ha colocado una advertencia,\n a la segunda advertencia vas a ser baneado por 30 minutos!!" + reason, warnedPlayer.id);
            } else {
                setBanlistDataToDB(
                    {
                        conn: warnedPlayer.conn,
                        reason: reason,
                        register: getUnixTimestamp(),
                        expire: getUnixTimestamp() + expulsionMinutes * CmdWarn.millInAMinute
                    }
                );
                warnedPlayer.warnings = [] as PlayerWarning[];
                await setPlayerDataToDB(convertToPlayerStorage(warnedPlayer));
                LangRes.commentary("Al jugador " + warnedPlayer.name + " el arbitro le mostro la segunda amarilla!! razon: " + reason);
                LangRes.importantMessage(Tst.maketext(LangRes.command.ban.fixedTermBan, { player: warnedPlayer!.name, mod: byPlayer.name}));
                window.gameRoom._room.kickPlayer(warnedId, reason, false);
            }
            const player = window.gameRoom.playerList.get(byPlayer.id)!;
            registerCommandTimeout(this.commandId + byPlayer.auth, this.timeout, player);
        } else {
            LangRes.importantMessage("No se pudo amonestar: Id erroneo. Ingresa un id con formato <#ID>", byPlayer.id);
        }
    }
//todo mandar datos de dardo y link de sala
    }

}

//tarjeta dos tarjetas y es expulsado x 30 minutos -> 3 partidos



