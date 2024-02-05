import { PlayerObject } from "../../model/GameObject/PlayerObject";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { getUnixTimestamp } from "../Statistics";
import { setBanlistDataToDB } from "../Storage";

const millInAMinute: number = 60000;

export function cmdBan(byPlayer: PlayerObject, message: string[]): void {
    const bannedId: string = message[1];
    const banMinutes: string | undefined = message[2];
    const reason: string | undefined = message[3];


    var id = bannedId?.substring(0,1); //remove #
    var numericId: number = !isNaN(Number(id)) ? Number(id) : 0;
    var numericMinutes: number = 1440;
    if (numericId === 0) {
        window.gameRoom._room.sendAnnouncement("Ban: formato de id invalido", byPlayer.id, LangRes.style.colors.Red, null, null);
        return;
    }
    var player = window.gameRoom.playerList.get(numericId);

    if(!isNaN(Number(banMinutes))){
        numericMinutes = Number(banMinutes);
    }

    if(numericMinutes < 0 && reason === null) {
        window.gameRoom._room.sendAnnouncement("Ban: No podes banear permanente sin una razon.", byPlayer.id, LangRes.style.colors.Red, null, null);
        return;
    } else { //permanent ban
        window.gameRoom._room.kickPlayer(numericId, reason!, true);
        setBanlistDataToDB({ conn: player!.conn, reason: reason!, register: getUnixTimestamp(), expire: -1 }); // register into ban list
        LangRes.SendConsole(Tst.maketext(LangRes.command.ban.permanentBan, { player: player!.name, mod: byPlayer.name, reason: reason! }));
    }
    window.gameRoom._room.kickPlayer(numericId, reason!, false);
    setBanlistDataToDB({ conn: player!.conn, reason: reason!, register: getUnixTimestamp(), expire: numericMinutes *  millInAMinute }); // fixed term ban
    LangRes.SendConsole(Tst.maketext(LangRes.command.ban.fixedTermBan, { player: player!.name, mod: byPlayer.name }));
}