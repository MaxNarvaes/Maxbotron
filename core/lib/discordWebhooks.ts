import { VictoryPlaceholder } from "../game/controller/events/onTeamVictory";
import { TeamID } from "../game/model/GameObject/TeamID";
import { decideTier } from "../game/model/Statistics/TierFunctions";
import * as LangRes from "../game/resource/strings";
import uEmojiParser from "universal-emoji-parser";
import { AlignmentEnum, AsciiTable3 } from "ascii-table3"

const gameWebhook: string = 'https://discord.com/api/webhooks/1206608221855424522/sobqEPinwweHNA9JrKvsIBBqflE5j1QE_Wv7i3RvJAipv5PdwC-tYK7CrofRBdMrBuLe'

function getMinutesEmbed(time: number) {
    var t = Math.floor(Math.round(time) / 60);
    return `${Math.floor(t / 10)}${Math.floor(t % 10)}`;
}

function getSecondsEmbed(time: number) {
    var t = Math.round(time);
    var t2 = Math.floor(t - Math.floor(t / 60) * 60);
    return `${Math.floor(t2 / 10)}${Math.floor(t2 % 10)}`;
}

function getTimeEmbed(time: number) {
    return `[${getMinutesEmbed(time)}:${getSecondsEmbed(time)}]`;
}

export function sendGameToDiscord(placeholder: any, recording: GameRecording) {
    sendGameSummaryWebhook(placeholder, recording);
    setTimeout((gameEnd) => { sendGameRecordingWebhook(gameEnd); }, 500, recording);
}

export function sendAnnouncementToDiscord(message: string, webhook: string) {

    var request = new XMLHttpRequest();
    request.open("POST", webhook); //sends a log with information about users who connect

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        avatar_url: '',
        username: 'Maxbotron',
        content: message
    };

    request.send(JSON.stringify(params));
}

function sendGameSummaryWebhook(placeholder: VictoryPlaceholder, recording: GameRecording) {
    const gameName = window.gameRoom.config._config.roomName + "\n" + window.gameRoom.currentTeams.red.longName.toUpperCase() + " vs " + window.gameRoom.currentTeams.blue.longName.toUpperCase();
    const scores = window.gameRoom._room.getScores()!;

    //=========================================================
    //╔═══════════════════════════════════════════════

    let redPlayers: string = "";
    let bluePlayers: string = "";
    [...window.gameRoom.playerList.values()].filter(p => p.team === TeamID.Red).forEach
        (p => 
            redPlayers += "**" + p.name + 
            "** | Rango: " +  decideTier(p.id).avatar
            + "\n");
    [...window.gameRoom.playerList.values()].filter(p => p.team === TeamID.Blue).forEach
        (p => 
            bluePlayers += "**" + p.name + 
            "** | Rango: " +  decideTier(p.id).avatar 
            + "\n");


    let table = createTable(gameName, "unicode-round", placeholder);
    //revisar q paso con las anim
    // mostrar demoteados y promocionados - se juegan el ascenso
    
    let highlights = "";
    /* for(const h of placeholder.highlights){
        highlights += "**" + h.created + "** | " + h.description + " autor " + h.author + "\n"
    } */

    for (let index = 0; index < placeholder.highlights.length; index++) {
        const h = placeholder.highlights[index];
        highlights += "**" + h.created + "** | " + h.description + " autor " + h.author + "\n";
        window.gameRoom.logger.e("discord", "higlight: " + "**" + h.created + "** | " + h.description + " autor " + h.author + "\n");
    }

    var fields = [
        {
            name: uEmojiParser.parseToUnicode('\u{1F534} **Jugadores de Rojo**'),
            value: '**════════════════════════**\n' + redPlayers,
            inline: true,
        },
        {
            name: uEmojiParser.parseToUnicode('\u{1F535} **Jugadores de Azul**'),
            value: '**════════════════════════**\n' + bluePlayers,
            inline: true,
        },
        {
            name: '**═══════════════════════════════════════════════**',
            value: '',
            inline: false,
        },
        {
            name: uEmojiParser.parseToUnicode('\u{1F410} **Jugadores del partido**'),
            value: uEmojiParser.parseToUnicode('═══════════════════════════════════════════════\n' + 
            "\n\u{26BD} El crack: **" + placeholder.topScorer.name + "** con " + placeholder.topScorer.matchRecord.goals + (placeholder.topScorer.matchRecord.goals > 1 ? " goles" : " gol") + "\n" +
            "\u{1F45F} Dios de los pases: **" + placeholder.mapp.name + "** con " + placeholder.mapp.matchRecord.passed + " pases exitosos\n" +
            "\u{1F9D9} El generoso: **" + placeholder.map.name + "** con " + placeholder.map.matchRecord.assists + " asistencias\n" +
            "\u{1F921} Ñoqui del partido: **" + placeholder.noqui.name + "** con " + placeholder.noqui.matchRecord.ogs + (placeholder.noqui.matchRecord.ogs > 1 ? " goles " : " gol ") + "**en contra**\n"),
            inline: false,
        },
        {
            name: '**═══════════════════════════════════════════════**',
            value: '',
            inline: false,
        },
        {
            name: '\u{1F3A5} **Resumen del partido**',
            value: '**═══════════════════════════════════════════════**\n' + highlights,            
            inline: true,
        }
    ];
    
    var objectBodyWebhook = {
        //```
        embeds: [
            {
                title: `${gameName}`,
                description: "```\n" + table.toString() + "\n```\n",
                color: LangRes.style.colors.Golden,
                fields: fields,
                footer: {
                    text: `Replay: ${createRecordingName(recording)}`,
                },
                timestamp: new Date().toISOString(),
            },
        ],
        username: "maxbotron"
    };
    if (gameWebhook != '') {
        try {
            fetch(gameWebhook, {
                method: 'POST',
                body: JSON.stringify(objectBodyWebhook),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res);
        } catch (error) {
            window.gameRoom.logger.e("emojiToUnicode", "discord error: " + error);
        }
        
    }
}

export interface GameRecording {
    replay: Uint8Array,
    date: Date
}

export function createTable(gameName: string, style:string, placeholder: VictoryPlaceholder): AsciiTable3 {
    return new AsciiTable3("Resultados " + gameName)
        .setWidths([11, 19, 19])
        .setTitleAlign(AlignmentEnum.CENTER)
        .setHeading("", uEmojiParser.parseToUnicode("ROJO"), uEmojiParser.parseToUnicode("AZUL"))
        .setHeadingAlign(AlignmentEnum.LEFT)
        .setAlign(1, AlignmentEnum.LEFT)
        .setAlign(2, AlignmentEnum.CENTER)
        .setAlign(3, AlignmentEnum.CENTER)
        .setWrappings([true, false, false])
        .setStyle(style)
        .addRowMatrix([
            [
                "Equipos",
                uEmojiParser.parseToUnicode(placeholder.redTeam),
                uEmojiParser.parseToUnicode(placeholder.blueTeam)
            ],
            [
                "Resultado",
                placeholder.redScore,
                placeholder.blueScore
            ],
            [
                "Posesion",
                placeholder.possTeamRed,
                placeholder.possTeamBlue
            ],
        ]);
}

function sendGameRecordingWebhook(recording: GameRecording) {
    if (gameWebhook != "") {
        const form = new FormData();
        form.append(
            "file",
            new File([recording.replay],
                createRecordingName(recording),
                { type: "text/plain" }
            )
        );
    
        const webhook = new XMLHttpRequest();
        webhook.open("POST", gameWebhook);
        webhook.send(form);
    }
}

function createRecordingName(recording: GameRecording): string {
    let name = "SIND-" + recording.date.toDateString() + "-" + window.gameRoom.currentTeams.red.shortName + "-vs-" + window.gameRoom.currentTeams.blue.shortName + ".hbr2";
    return name;
}
