import * as RoleDefinitions from "../../resource/roleDefinitions";
import * as Tst from "../Translator";
import * as LangRes from "../../resource/strings";
import { PlayerObject } from "../../model/GameObject/PlayerObject";
import { randomInteger } from "../RoomTools";
import { TeamID } from "../../model/GameObject/TeamID";
import { registerCommandTimeout } from "./commandHelper";

const argTeams = [
    //{ ID: TeamID.Red, shortName: "adm", longName: "Admins", country: "🇦🇷", uniform: [{ angle: 135, mainColor: [0x4187F2, 0X416EE8, 0x314EDE], avatarColor: 0xFFFFFF }] },
    /* KSKS ADMINS VS USUARIOS EVENTO */
    //{ ID: TeamID.Blue, shortName: "usrs", longName: "Usuarios", country: "🇦🇷", uniform: [{ angle: 135, mainColor: [0xE6FCFF, 0XE8E8E8, 0xD4D4D4], avatarColor: 0XFFB300 }] },
    /*ksks futbol argentino*/
    { ID: TeamID.Blue, shortName: "boca", longName: "Boca Juniors", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0x00366B, 0xF7FF00, 0x003352], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "rosario", longName: "Rosario Central", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xD4CD00, 0x000F57, 0xD4CD00], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "rvp", longName: "River Plate", country: "🇦🇷", uniform: [{ angle: 40, mainColor: [0xF2F2F2, 0xDE0000, 0xF2F2F2], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "ind", longName: "Independiente", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xFF0000], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "elp", longName: "Estudiantes de La Plata", country: "🇦🇷", uniform: [{ angle: 180, mainColor: [0xD40B0B, 0xFFFFFF, 0xD40B0B], avatarColor: 0x878787 }] },
    { ID: TeamID.Blue, shortName: "casla", longName: "San Lorenzo de Almagro", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xC20000, 0x151575, 0xA10005], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "hur", longName: "Huracan", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0xFFFFFF, 0xF2F2F2], avatarColor: 0xFF0000 }] },
    { ID: TeamID.Red, shortName: "tall", longName: "Talleres", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x030354, 0xFFFFFF, 0x030354], avatarColor: 0x000000 }] },
    { ID: TeamID.Blue, shortName: "bel", longName: "Belgrano", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0X335ACA, 0x85A6FF, 0x85A6FF], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "new", longName: "Newell's old boys", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xFF0000, 0x000000], avatarColor: 0xF0F0F0 }] },
    { ID: TeamID.Blue, shortName: "col", longName: "Colon", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x9C0000, 0x000000], avatarColor: 0xF0F0F0 }] },
    { ID: TeamID.Red, shortName: "un", longName: "Union", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: TeamID.Blue, shortName: "vel", longName: "Club Atletico Velez Sarsfield", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x1228B8, 0xFFFFFF], avatarColor: 0x080606 }] },
    { ID: TeamID.Blue, shortName: "god", longName: "Godoy Cruz", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x0000AB, 0xFFFFFF, 0x0000AB], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "def", longName: "Defensa y Justicia", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xF7FF00, 0xF7FF00, 0xF7FF00], avatarColor: 0x19F700 }] },
    { ID: TeamID.Red, shortName: "ajr", longName: "Argentinos Jr", country: "🇦🇷", uniform: [{ angle: 180, mainColor: [0xBA271C, 0xF03224, 0xBA271C], avatarColor: 0x2121FF }] },
    { ID: TeamID.Red, shortName: "lan", longName: "Lanus", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x8A0707, 0x8A0707, 0x8A0707], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "cc", longName: "Central Cordoba", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x000000, 0xFAF5F5, 0x000000], avatarColor: 0x8A0707 }] },
    { ID: TeamID.Blue, shortName: "rac", longName: "Racing", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x077FE8, 0xE8E8E8, 0x077FE8], avatarColor: 0x000000 }] },
    { ID: TeamID.Blue, shortName: "atl", longName: "Atletico Tucuman", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x9CFFFC, 0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "barr", longName: "Barracas Central", country: "🇦🇷", uniform: [{ angle: 180, mainColor: [0xD40B0B, 0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "inst", longName: "Instituto", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0xCC1212, 0xFFFFFF, 0xCC1212], avatarColor: 0x000000 }] },
    { ID: TeamID.Red, shortName: "sar", longName: "Sarmiento", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x004A0C, 0x004A0C, 0x004A0C], avatarColor: 0xFFBFC3 }] },
    { ID: TeamID.Red, shortName: "plat", longName: "Platense", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x562E24, 0xFFFFFF], avatarColor: 0xF1590D }] },
    { ID: TeamID.Blue, shortName: "tig", longName: "Tigre", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0x0841FF, 0xFF0000, 0x0841FF], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "ban", longName: "Banfield", country: "🇦🇷", uniform: [{ angle: 0, mainColor: [0x06300F, 0xFFFFFF, 0x06300F], avatarColor: 0x000000 }] },
    { ID: TeamID.Blue, shortName: "glp", longName: "Gimnasia de la Plata", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x00253B, 0xFFFFFF], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "ars", longName: "Arsenal", country: "🇦🇷", uniform: [{ angle: 40, mainColor: [0x006FFF, 0xFF0000, 0x006FFF], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "rie", longName: "Deportivo Riestra", country: "🇦🇷", uniform: [{ angle: 45, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0x1C1C1C }] },
    { ID: TeamID.Red, shortName: "cha", longName: "Chaco Forever", country: "🇦🇷", uniform: [{ angle: 180, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0xFF6524 }] },
    { ID: TeamID.Blue, shortName: "alma", longName: "Almagro", country: "🇦🇷", uniform: [{ angle: 180, mainColor: [0x0841FF, 0x000000, 0x0841FF], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "alm", longName: "Almagro Visitante", country: "🇦🇷", uniform: [{ angle: 75, mainColor: [0x000000, 0x17D1FF, 0xFCFCFC], avatarColor: 0x080808 }] },

    /*ksks liga española*/
    { ID: TeamID.Red, shortName: "atm", longName: "Atlético de Madrid", country: "🇪🇸", uniform: [{ angle: 180, mainColor: [0xFF0F1F, 0XFFFFFF, 0xFF0F1F], avatarColor: 0X150B75 }] },
    { ID: TeamID.Blue, shortName: "cdv", longName: "Celta de Vigo", country: "🇪🇸", uniform: [{ angle: 90, mainColor: [0x75AFFA, 0X54A8CC, 0x75AFFA], avatarColor: 0XF5F6FF }] },
    { ID: TeamID.Red, shortName: "osa", longName: "Osasuna", country: "🇪🇸", uniform: [{ angle: 180, mainColor: [0xB5142F, 0X150A7A, 0xB5142F], avatarColor: 0XF5F6FF }] },
    { ID: TeamID.Blue, shortName: "bet", longName: "Betis", country: "🇪🇸", uniform: [{ angle: 180, mainColor: [0x1C8009, 0XFFFFFF, 0x1C8009], avatarColor: 0X000000 }] },
    { ID: TeamID.Blue, shortName: "vill", longName: "Villareal", country: "🇪🇸", uniform: [{ angle: 0, mainColor: [0xD6EB1C], avatarColor: 0X0D2F8C }] },
    { ID: TeamID.Blue, shortName: "rm", longName: "Real Madrid", country: "🇪🇸", uniform: [{ angle: 0, mainColor: [0xFFFFFF], avatarColor: 0X121D3B }] },
    { ID: TeamID.Blue, shortName: "get", longName: "Getafe", country: "🇪🇸", uniform: [{ angle: 180, mainColor: [0x000BA6, 0X5DFC72, 0x000BA6], avatarColor: 0XFFFFFF }] },
    { ID: TeamID.Red, shortName: "ath", longName: "Athletic Club", country: "🇪🇸", uniform: [{ angle: 180, mainColor: [0xFF0022, 0XFCFCFC, 0xFF0022], avatarColor: 0X000000 }] },
    { ID: TeamID.Red, shortName: "sev", longName: "Sevilla", country: "🇪🇸", uniform: [{ angle: 60, mainColor: [0XFFFFFF, 0XFFFFFF, 0XFFFFFF], avatarColor: 0XFF0000 }] },
    { ID: TeamID.Red, shortName: "bar", longName: "Barcelona", country: "🇪🇸", uniform: [{ angle: 0, mainColor: [0X013C7E, 0XAA0136, 0X013C7E], avatarColor: 0XFFFFFF }] },
    /*ksks premier league*/
    { ID: TeamID.Red, shortName: "mutd", longName: "Manchester United", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0xEB1515, 0XBA031C, 0xEB1515], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "mci", longName: "Manchester City", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0xAAE3FC, 0X5FBFED, 0XAAE3FC], avatarColor: 0x23233B }] },
    { ID: TeamID.Blue, shortName: "che", longName: "Chelsea", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0x3423CC], avatarColor: 0xF2F2F2 }] },
    { ID: TeamID.Blue, shortName: "tot", longName: "Tottenham", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0XFFFFFF], avatarColor: 0x0D1069 }] },
    { ID: TeamID.Red, shortName: "liv", longName: "Liverpool", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0xD92531], avatarColor: 0xE8E8E8 }] },
    { ID: TeamID.Blue, shortName: "ars", longName: "Arsenal", country: "🇬🇧", uniform: [{ angle: 180, mainColor: [0xD92531, 0XEBEBEB, 0xD92531], avatarColor: 0xD4D4D4 }] },
    { ID: TeamID.Blue, shortName: "brg", longName: "Brighton", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0x1D3EE0, 0XEBEBEB, 0x1D3EE0], avatarColor: 0x321FDB }] },
    { ID: TeamID.Red, shortName: "ast", longName: "Aston Villa", country: "🇬🇧", uniform: [{ angle: 0, mainColor: [0xA13C4C, 0X2BB5F0, 0xA13C4C], avatarColor: 0xFFFFFF }] },
    /*ksks selecciones*/
    { ID: TeamID.Red, shortName: "ale", longName: "Alemania", country: "🇩🇪", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x000000, 0xFFFFFF], avatarColor: 0XD19D0F }] },
    { ID: TeamID.Red, shortName: "bra", longName: "Brasil", country: "🇧🇷", uniform: [{ angle: 180, mainColor: [0xCCCC33, 0X006600, 0xCCCC33], avatarColor: 0XFFFFFF }] },
    { ID: TeamID.Red, shortName: "bra2", longName: "Brasil Suplente", country: "🇧🇷", uniform: [{ angle: 60, mainColor: [0x2930FF, 0X1F24BF, 0x171B91], avatarColor: 0X30FF29 }] },
    { ID: TeamID.Blue, shortName: "arg", longName: "Argentina", country: "🇦🇷", uniform: [{ angle: 90, mainColor: [0X75AADB, 0XFFFFFF, 0x75AADB], avatarColor: 0X000000 }] },
    { ID: TeamID.Red, shortName: "esp", longName: "España", country: "🇪🇸", uniform: [{ angle: 90, mainColor: [0XFF0000, 0XEEC900, 0xFF0000], avatarColor: 0X000000 }] },
    { ID: TeamID.Red, shortName: "por", longName: "Portugal", country: "🇵🇹", uniform: [{ angle: 300, mainColor: [0x006400, 0X8B0000, 0x8B0000], avatarColor: 0xFFD700 }] },
    { ID: TeamID.Red, shortName: "hol", longName: "Paises Bajos", country: "🇳🇱", uniform: [{ angle: 0, mainColor: [0xED6313], avatarColor: 0x000000 }] },
    { ID: TeamID.Blue, shortName: "fr", longName: "Francia", country: "🇫🇷", uniform: [{ angle: 45, mainColor: [0x191069, 0X160E5C, 0x130C52], avatarColor: 0x64691C }] },
    { ID: TeamID.Blue, shortName: "ing", longName: "Inglaterra", country: "🇬🇧", uniform: [{ angle: 45, mainColor: [0xFFFFFF, 0xFFFFFF, 0x34A1E0], avatarColor: 0x1F1F54 }] },
    { ID: TeamID.Blue, shortName: "ita", longName: "Italia", country: "🇮🇹", uniform: [{ angle: 223, mainColor: [0x152ECF, 0x1221A8, 0x0D0DD6], avatarColor: 0xEDEBEB }] },
    { ID: TeamID.Blue, shortName: "uru", longName: "Uruguay", country: "🇺🇾", uniform: [{ angle: 45, mainColor: [0x408CE3, 0x3A7ECC, 0x3779C4], avatarColor: 0x000000 }] },
    { ID: TeamID.Blue, shortName: "mex", longName: "México", country: "🇲🇽", uniform: [{ angle: 0, mainColor: [0x134F07, 0xFFFFFF, 0xD90000], avatarColor: 0x573131 }] },
    { ID: TeamID.Red, shortName: "chi", longName: "Chile", country: "🇨🇱", uniform: [{ angle: 0, mainColor: [0XF50000], avatarColor: 0XFFFFFF }] },
    { ID: TeamID.Red, shortName: "per", longName: "Perú", country: "🇵🇪", uniform: [{ angle: 35, mainColor: [0XFFFFFF, 0XFF0000, 0XFFFFFF], avatarColor: 0X000000 }] },
    /*nuevas ksks*/
    { ID: TeamID.Blue, shortName: "psg", longName: "París Saint-Germain", country: "🇫🇷", uniform: [{ angle: 180, mainColor: [0x000080, 0XB22222, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "int", longName: "Inter de Miami", country: "🇺🇸", uniform: [{ angle: 60, mainColor: [0x000000, 0X121212, 0x000000], avatarColor: 0xFF00F7 }] },
    { ID: TeamID.Blue, shortName: "val", longName: "Valencia", country: "🇪🇸", uniform: [{ angle: 0, mainColor: [0xFFFFFF], avatarColor: 0X000000 }] },
    { ID: TeamID.Blue, shortName: "nap", longName: "Napoli", country: "🇮🇹", uniform: [{ angle: 0, mainColor: [0x429AE8], avatarColor: 0XFFFFFF }] },
    { ID: TeamID.Red, shortName: "rom", longName: "Roma", country: "🇮🇹", uniform: [{ angle: 0, mainColor: [0xC10B31], avatarColor: 0Xf5b602 }] },
    { ID: TeamID.Red, shortName: "lev", longName: "Bayern Leverkusen", country: "🇩🇪", uniform: [{ angle: 0, mainColor: [0x000000, 0XFD0808, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "lep", longName: "Leipzig", country: "🇩🇪", uniform: [{ angle: 90, mainColor: [0xFAF9FF, 0XDC002C, 0xFAF9FF], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "bor", longName: "Borussia Dortmund", country: "🇩🇪", uniform: [{ angle: 0, mainColor: [0xF5FD00, 0X000000, 0xF5FD00], avatarColor: 0x2E2E2E }] },
    { ID: TeamID.Red, shortName: "bay", longName: "Bayern Munich", country: "🇩🇪", uniform: [{ angle: 135, mainColor: [0xF70521, 0XFFFFFF, 0xFFFFFF], avatarColor: 0xAB1227 }] },
    { ID: TeamID.Red, shortName: "juv", longName: "Juventus", country: "🇮🇹", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0X000000, 0xFFFFFF], avatarColor: 0xFFC71F }] },
    { ID: TeamID.Blue, shortName: "fio", longName: "Fiorentina", country: "🇮🇹", uniform: [{ angle: 45, mainColor: [0x8F28B5, 0x671E82, 0x8F28B5], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "naz", longName: "Inter de Milan", country: "🇮🇹", uniform: [{ angle: 0, mainColor: [0x2519CF, 0x000000, 0x2519CF], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Red, shortName: "mil", longName: "Milan", country: "🇮🇹", uniform: [{ angle: 0, mainColor: [0xEB0000, 0x000000, 0xEB0000], avatarColor: 0x989C27 }] },
    { ID: TeamID.Red, shortName: "peñ", longName: "Peñarol", country: "🇺🇾", uniform: [{ angle: 0, mainColor: [0xF3FF45, 0x000000, 0XFFFF38], avatarColor: 0xFFFFFF }] },
    { ID: TeamID.Blue, shortName: "nac", longName: "Nacional", country: "🇺🇾", uniform: [{ angle: 60, mainColor: [0x190AF0, 0xFFFFFF, 0X190AF0], avatarColor: 0xFF0000 }] },
    { ID: TeamID.Blue, shortName: "juvv", longName: "Juventus Alternativa", country: "🇮🇹", uniform: [{ angle: 50, mainColor: [0x1C1C1C, 0x292929, 0X1C1C1C], avatarColor: 0xFFFFFF }] },
];
const timeout = 30000;
const commandId = "ksk";
export function cmdKsk(byPlayer: PlayerObject | null, message: string[]): void {
    if (byPlayer) {
        var player = window.gameRoom.playerList.get(byPlayer.id);
        var key = commandId;
        if (player?.permissions.role.key == "player" || window.gameRoom.playerTimeouts.has(key)) {
            return;
        }
        if (player) {
            registerCommandTimeout(key, timeout, player);
        }
    }
    
    window.gameRoom.currentTeams.red = argTeams[randomInteger(0, argTeams.length - 1)];
    window.gameRoom.currentTeams.blue = argTeams[randomInteger(0, argTeams.length - 1)];
    setRedTeamColors();
    setBlueTeamColors();
    sendMatchAnouncement();   
}

function sendMatchAnouncement() {
    window.gameRoom._room.sendAnnouncement("¡COMIENZA EL PARTIDO Y SE ENFRENTAN!", null, LangRes.style.colors.Green, 'bold', null);
    window.gameRoom._room.sendAnnouncement(window.gameRoom.currentTeams.red.longName, null, LangRes.style.colors.Red, 'bold', null);
    window.gameRoom._room.sendAnnouncement("🆚", null, 0xFF0000, null, null);
    window.gameRoom._room.sendAnnouncement(window.gameRoom.currentTeams.blue.longName, null, LangRes.style.colors.Blue, 'bold', null);
}

function setBlueTeamColors() {
    window.gameRoom._room.setTeamColors(
        TeamID.Blue,
        window.gameRoom.currentTeams.blue.uniform[0].angle,
        window.gameRoom.currentTeams.blue.uniform[0].avatarColor,
        window.gameRoom.currentTeams.blue.uniform[0].mainColor);
}

function setRedTeamColors() {
    window.gameRoom._room.setTeamColors(
        TeamID.Red,
        window.gameRoom.currentTeams.red.uniform[0].angle,
        window.gameRoom.currentTeams.red.uniform[0].avatarColor,
        window.gameRoom.currentTeams.red.uniform[0].mainColor);
}
