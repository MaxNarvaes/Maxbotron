import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { convertToPlayer, findPlayerByUsername, setPlayerDataToDB } from "../Storage";
import { Command } from "./commandInterface";
import { registerCommandTimeout } from "./commandHelper";

export class CmdLogin extends Command {
    public commandId: string = "login";
    public helpMan: string = "!login <usuario> <contraseña>";
    public timeout: number = 10000;
    async execute(byPlayer: PlayerObject, message: string[]): Promise<void> {
        try {
            const username = message[1];
            const password = message[2];
            var savedPlayer = await findPlayerByUsername(username);
            if (savedPlayer && savedPlayer.password == password) {
                var player = convertToPlayer(byPlayer, savedPlayer);
                if (savedPlayer.auth !== byPlayer.auth) {
                    player.auth = byPlayer.auth;
                    player.matchRecord = window.gameRoom.playerList.get(byPlayer.id)!.matchRecord
                    window.gameRoom.playerList.set(byPlayer.id, player);
                    savedPlayer.auth = byPlayer.auth;
                    await setPlayerDataToDB(savedPlayer);
                }
                LangRes.importantMessage("Te logueaste correctamente " + username + "\nLas stats se van a seguir guardando en tu cuenta.", byPlayer.id, 2);
                registerCommandTimeout(this.commandId + byPlayer.auth, this.timeout, player)
            }
            LangRes.importantMessage("No pudimos loguearte, verificar tus datos e intenta nuevamente", byPlayer.id, 2);
        } catch (error) {
            LangRes.importantMessage("Hubo un problema para loguearse!", byPlayer.id, 2);
        }
    }
}

