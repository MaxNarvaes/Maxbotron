
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject, PlayerStorage } from "../../model/GameObject/PlayerObject";
import { convertToPlayerStorage, existUsername, findPlayerByUsername, getPlayerDataFromDB, setPlayerDataToDB } from "../Storage";
import { getRole } from "../../resource/roleDefinitions";
import { Command } from "./commandInterface";

export class CmdRegister extends Command {
    public commandId: string = "register";
    public helpMan: string = "registra una cuenta en la sala !register <usuario> <contraseña> (solo numeros o letras, min 3 caracteres)";
    public timeout: number = 5000;
    async execute(byPlayer: PlayerObject, message: string[]): Promise<void> {
        //sendChat(byPlayer, message[0]);
        var player = window.gameRoom.playerList.get(byPlayer.id)!
        if (player.credentials.username != null || player.credentials.username != null) {
            LangRes.importantMessage("Ya estas registrado! Si lo que queres es loguearte usa !login <username> <password>", byPlayer.id, 2);
        }
        if (message.length < 3) {
            LangRes.importantMessage("Register: Para registrarte usa el comando !register <usuario> <password> (pass minimo 3 caracteres, solo letras y numeros)", byPlayer.id, 2)
            return;
        }
        const username = message[1];
        const password = message[2];

        const existingPlayer: PlayerStorage | undefined = await findPlayerByUsername(byPlayer.auth);

        if (existingPlayer !== undefined) {
            window.gameRoom.logger.e("register", "register: found " + existingPlayer);
            LangRes.importantMessage("El nombre de usuario ya existe! Por favor usa !register con otro nombre de usuario!", byPlayer.id, 2);
            return;
        }

        player.credentials.username = username;
        player.credentials.password = password;
        player.permissions.role = getRole("player")

        var result = await setPlayerDataToDB(convertToPlayerStorage(player));
        if (result != undefined) {
            LangRes.importantMessage("Te registraste correctamente con el nombre de usuario " + username + "\nNo te olvides de tu password!", byPlayer.id, 2);
        }
    }
}