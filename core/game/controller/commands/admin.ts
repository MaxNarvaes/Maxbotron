import { sendAnnouncementToDiscord } from "../../../lib/discordWebhooks";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { Command } from "./commandInterface";

export class CmdAdmin extends Command {
    public commandId: string = 'admin';
    public timeout: number = 60000;
    public helpMan: string = 'Llama a un admin a la sala. !admin <mensaje> (el mal uso de este comando sera penalizado)';
    execute(byPlayer: PlayerObject, message: string[]): void {
        var dcWebhook = 'https://discord.com/api/webhooks/1126958366770602127/TQNyGf3wanCMgTbzLdYXi4aFubaqpd1ag3RXCcRAlnvRu5xmO9nzv2fTFG_PNzW1Dxcr';


    const messageToStaff = "<@&1122229514735472794> <@&1148011110939762790> \n 🚨 El usuario " + byPlayer.name + " pide un staff en la sala" + "\n 📝 Mensaje del reporte: **" + message.slice(1).join(" ") + "**";
    sendAnnouncementToDiscord(messageToStaff, dcWebhook);
    }
    
}

export function cmdAdmin(byPlayer: PlayerObject, message: string[]): void {
    


}