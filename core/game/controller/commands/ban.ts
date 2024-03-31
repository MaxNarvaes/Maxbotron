import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { getUnixTimestamp } from "../Statistics";
import { setBanlistDataToDB } from "../Storage";
import { registerHighlight } from "../RoomTools";
import { authorizeCommand, registerCommandTimeout } from "./commandHelper";
import { Command } from "./commandInterface";

export class CmdBan extends Command {
    static millInAMinute: number = 60000;
    public commandId: string = 'ban'
    public timeout: number = 1000;
    public helpMan: string = 'Banear a un jugador. !ban <#ID> <minutos> <razon>';
    execute(byPlayer: PlayerObject, message: string[]): void {
        const exclude = ["visitor", "player", "vip", "supervip"]
        if (authorizeCommand(byPlayer, this.commandId,
            exclude) == false) return;

        const bannedId: string = message[1];
        const banMinutes: string | undefined = message[2];
        const reason: string | undefined = message.slice(3).join(" ");
        window.gameRoom.logger.e("ban", "variables: " + bannedId + " " + banMinutes + " " + reason)
        if (bannedId.charAt(0) == "#") {
            let id: number = parseInt(message[1].substr(1), 10);
            if (reason === undefined || reason === null) {

                LangRes.importantMessage("No se pudo banear: No podes banear sin una razon. comando ban es: !ban <#ID> <MINUTOS> <RAZON>", byPlayer.id)
                return;
            }

            if (isNaN(id) !== true && window.gameRoom.playerList.has(id) === true) {
                var numericId: number = id;
            } else {
                window.gameRoom._room.sendAnnouncement("", byPlayer.id, LangRes.style.colors.Red, null, null);
                LangRes.importantMessage("No se pudo banear: Formato de id invalido, formato es <#ID> ", byPlayer.id)
                return;
            }
            var numericMinutes: number = 1440;

            if (banMinutes != undefined && isNaN(parseInt(banMinutes)) == false) {
                numericMinutes = parseInt(banMinutes);
            }
            var player = window.gameRoom.playerList.get(numericId);

            if (player == undefined) {
                LangRes.importantMessage("No se pudo banear: Jugador con id #" + numericId + " no encontrado")
            }

            window.gameRoom.logger.e("ban", "variables: " + bannedId + " " + banMinutes + " " + reason)

            if (numericMinutes < 0) {
                permanentBan(reason);
                return;
            }

            window.gameRoom._room.kickPlayer(numericId, reason, false);
            setBanlistDataToDB({ conn: player!.conn, reason: reason, register: getUnixTimestamp(), expire: getUnixTimestamp() + numericMinutes * CmdBan.millInAMinute }); // fixed term ban
            LangRes.message(Tst.maketext(LangRes.command.ban.fixedTermBan, { player: player!.name, mod: byPlayer.name }));

            registerCommandTimeout(this.commandId + player!.auth, this.timeout, player!)
        }



        function permanentBan(reason: string) {
            window.gameRoom._room.kickPlayer(numericId, reason, false);
            setBanlistDataToDB({ conn: player!.conn, reason: reason, register: getUnixTimestamp(), expire: -1 }); // register into ban list
            const text = Tst.maketext(LangRes.command.ban.permanentBan, { player: player!.name, mod: byPlayer.name, reason: reason });
            LangRes.message(text);
            registerHighlight(text, LangRes.maxbotron.myName);
        }
    }

}
