import uEmojiParser from "universal-emoji-parser";

export function commentary(message: string, toPlayer: number | null = null){
    window.gameRoom._room.sendAnnouncement(uEmojiParser.parseToUnicode("Max el Relator🎙: " + message), toPlayer, style.colors.Green, "bold", 1);
}

export function message(message: string, toPlayer: number | null = null, sound = 1){
        window.gameRoom._room.sendAnnouncement(uEmojiParser.parseToUnicode("「🤖」MaxBotron: " + message), toPlayer, style.colors.Golden, "bold", sound);
}

export function importantMessage(message: string, toPlayer: number | null = null, sound = 2){
    window.gameRoom._room.sendAnnouncement(uEmojiParser.parseToUnicode("「🤖」MaxBotron: " + message), toPlayer, style.colors.Red, "bold", sound);        
}

// YOU CAN USE A PLACEHOLDER FOR INTERPOLATION. FOR EXAMPLE, 'Hello, My name is {name}.'
// THE TYPES OF PLACEHOLDER ARE LIMITED BY STRING SET.

export const style = {
    separator: '                                                                                                      ',
    colors: {
        Red: 0xFA5646,
        Orange: 0xFF5E3B,
        Green: 0x7DFA89,
        GreenConsole: 0x00FF00,
        Blue: 0x05C5FF,
        Yellow: 0xFFFF17,
        Golden: 0xFDC43A,
        Gray: 0xCCCCCC,
        White: 0xFFFFFF,
        LigthBlue: 0x6ECAFF,
        DarkBlue: 0x426AD6
    }
}

export const scheduler = {
    advertise: [
        `
        ╔╦╗╔═╗═╗ ╦╔╗ ╔═╗╔╦╗╦═╗╔═╗╔╗╔
        ║║║╠═╣╔╩╦╝╠╩╗║ ║ ║ ╠╦╝║ ║║║║
        ╩ ╩╩ ╩╩ ╚═╚═╝╚═╝ ╩ ╩╚═╚═╝╝╚╝
        `,
        `
        ░█▀▀░░▀░░█▀▀▄░█▀▄░░▀░░█▀▄░█▀▀▄░▀█▀░▄▀▀▄░░░█▀▄░█▀▀░█░░░░█░░░░█▀▀▄░█░█
        ░▀▀▄░░█▀░█░▒█░█░█░░█▀░█░░░█▄▄█░░█░░█░░█░░░█░█░█▀▀░█░░░░█▀▀█░█▄▄█░▄▀▄
        ░▀▀▀░▀▀▀░▀░░▀░▀▀░░▀▀▀░▀▀▀░▀░░▀░░▀░░░▀▀░░░░▀▀░░▀▀▀░▀▀░░░▀░░▀░▀░░▀░▀░▀
        https://discord.gg/KvfgRc7sfG
        `,

        '                                        📍 Discord Oficial! ➡ https://discord.gg/KvfgRc7sfG ',
        '                                        📍 Nuestras Redes! ➡ https://linktr.ee/sindicatodelhax '  ,
        'TIP: ¿Querés hablar con los pibes VIP? Entra al VC del discord: https://discord.com/channels/1122229514647371846/1189099455367094332',
        ' 😮‍💨 Ingresa a nuestro discord para ver las reglas de la sala ➡ https://discord.gg/KvfgRc7sfG'
    ]
    ,shutdown: '📢 La sala se esta por apagar. Gracias por jugar!'
    ,afkKick: '📢 kickeado: AFK'
    ,afkCommandTooLongKick: '📢 AFK por mas de 10 min'
    ,afkDetect: '⚠️ CUIDADO! ⚠️ {targetName}, si no te moves en {time} segundos sale kick!'
    ,autoUnmute: '🔊 Jugador @{targetName} ha sido desmuteado.'
    ,banVoteAutoNotify: '🗳️ Votacion para ban esta en progreso (!vote #ID) : {voteList}'
}

export const teamName = {
    specTeam: 'Spec'
    ,redTeam: 'Rojo'
    ,blueTeam: 'Azul'
}

export const antitrolling = {
    joinFlood: {
        banReason: '🚫 Te reconectaste mucho (5mins)'
        ,floodWarning: '📢 Si te reconectas muchas veces rapido podes ser kickeado!'
    }
    ,chatFlood: {
        muteReason: '🔇 {playerName} fuiste muteado por spamero (3mins).'
    }
    ,ogFlood: {
        banReason: '🚫 Muchos goles en contra (10mins)'
    }
    ,banNoPermission: {
        banReason: '🚫 No podes banear (30secs)'
    }
    ,kickAbusing: {
        banReason: '🚫 Demasiados kicks (5mins)'
        ,abusingWarning: '📢 Si kickeas a muchos jugadores la sala te va a kickear!'
    }
    ,insufficientStartAbusing: {
        banReason: '🚫 No podes empezar el partido con pocos jugadores (5mins)'
        ,abusingWarning: '📢 No podes empezar el partido con pocos jugadores.'
    }
    ,afkAbusing: {
        cannotReason: '❌ You can\'t use afk command during a game.'
    }
    ,gameAbscond: {
        banReason: '🚫 Abandono (5mins)'
    }
    ,malAct: {
        banReason: '🚫 Actividad malisiosa'
    }
}

export const command = {
    _ErrorWrongCommand : '❌ Comando incorrecto. 📑 !help or !help COMMANDO para detalles'
    ,_ErrorNoPermission: '❌ No podes usar este comando.'
    ,_ErrorCooldown: '❌ Tenes que esperar para volver a usar {commandName}'
    ,_ErrorDisabled: '❌ Este comando esta desactivado.'
    ,help: '📄 !about, notice, stats, showstats, statsreset, tier, afk, vote, poss, streak, scout, list, clip\n📑 !help COMMANDO Para detalle. (ej. !help stats)\n📑 !help admin shows you commands list for administrator.'
    ,helpadmin: '📄 !freeze, mute\n📑 !help COMMAND for detail.'
    ,helpman: { // detailed description for a command
        _ErrorWrongMan : '❌ Failed to read manual about that command.'
        ,help: '📑 !help {NOMBRE_COMANDO} te muestra la descripcion del {NOMBRE_COMANDO}.'
        ,about: '📑 !about info del bot'
        ,stats: '📑 !stats Muestra tus estadisticas. !stats {#ID} : Muestra informacion de un jugador con id {#ID}.\n📑 Podes ver la lista de ids con !list red,blue,spec'
        ,statsreset: '📑 !statsreset resets your statistical information. It cannot be recovered.'
        ,poss: '📑 !poss Muestra la posesion actual del balon.'
        ,streak: '📑 !streak shows you which team is being on a winning streak.'
        ,afk: '📑 !afk {MSG} Para ir o salir de AFK. {MSG} es una razon de estar afk'
        ,list: '📑 !list {red/blue/spec/mute/afk} Muestra jugadores de esa lista.'
        ,freeze: '📑 !freeze Mutea o unmutea a todos los jugadores'
        ,mute: '📑 !mute {#ID} : Mutea a jugador con Id = {#ID}. (ej: !mute #12)\n📑 Podes ver la lista de ids con !list red,blue,spec,mute'
        ,scout: '📑 !scout Muestra las posibilidaddes de asdsa.'
        ,vote: '📑 !vote Muestra el voto actual.\n📑 !vote {#ID} : Vota para kickear al jugador con ese ID. (eg: !vote #12)'
        ,tier: '📑 !tier Muestra informacion del elo.'
        ,notice: '📑 !notice Muestra el anuncio actual.'
        ,clip: '📑 !clip {DESCRIPCION} - Guarda un recordatorio en el resumen del partido'
    } 
    ,about: '📄 {RoomName} ({_LaunchTime})\n💬 This room is powered by Maxbotron🤖 bot.'
    ,stats: {
        _ErrorNoPlayer: '❌ ID de jugador erroneo. Solo numeros ID.(ej: !stats #12)\n📑 Podes ver la lista de ids con !list red,blue,spec'
        ,statsMsg: '🏆 Rank: {targetStatsRatingAvatar}{targetStatsRatingName} 🎇Puntos: {targetPlayerPoints} \n🎮 Partidos: {targetStatsTotal} ✅ Ganados: {targetStatsWins} ❌ Perdidos: {targetStatsLoses} 🎉 Winrate: {targetStatsWinRate}% \n⚽️ Goles: {targetStatsGoals}  👟 Asistencias: {targetStatsAssists} 🥶En contra: {targetStatsOgs}\n⚽️ Goles x partido: {targetStatsGoalsPerGame}  👟 Asistencias x partido: {targetStatsAssistsPerGame} 🎯 G+A por partido: {targetPlayerGAPerGame} 🥶En contra x partido: {targetStatsOgsPerGame} \n 🧤 valla invicta: {targetPlayerPerfectGk} 🎢 goles recibidos: {targetPlayerGoalsAgainstPerGame} 🎲 goles recibidos x partido: {targetPlayerGoalsAgainstPerGame} 🧙Efectividad Pases: {targetStatsPassSuccess}%'
        ,matchAnalysis: '📊 En este partido: {targetStatsNowGoals} goles {targetStatsNowAssists} asistencias {targetStatsNowOgs} cgoles en contra. (Pases exitosos {targetStatsNowPassSuccess}%)'
    }
    ,statsreset: '📊 Reset for statistical information completed. You can\'t cancel it.'
    ,poss: '📊 Ball possession : Red {possTeamRed}%, Blue {possTeamBlue}%.'
    ,streak: '📊 {streakTeamName} is now hitting a winning streak of {streakTeamCount} games!'
    ,afk: {
        _WarnAfkTooLong: '📢 La sala te puede kickear si estas afk mucho tiempo. (afk por 10 mins)'
        ,setAfk: '💤 {targetName} esta AFK. ({targetAfkReason})'
        ,unAfk: '📢 {targetName} ya no esta mas AFK!'
        ,muteNotifyWarn: '❌ Notification messages for AFK will not be shown to other players when you are muted.'
        ,startRecord: '📊 Entraron sufientes jugadores, el resultado del partido sera grabado'
        ,stopRecord: '📊 Hacen falta mas jugadores. El resultado no sera grabado (necesarios {gameRuleNeedMin} jugadores)'
    }
    ,mute: {
        _ErrorNoPermission: '❌ No tenes permisos para ejecutar este comando.'
        ,_ErrorNoPlayer: '❌ ID de jugador erroneo. Solo podes usar un ID numerico.(ej: !mute #12)\n📑 Podes ver los ID con el comando !list red,blue,spec,mute'
        ,successMute: '🔇 {targetName}# esta muteado (3mins).'
        ,successUnmute: '🔊 Player {targetName} ya no esta muteado.'
        ,muteAbusingWarn: '❌ No podes mutearlo de nuevo en tan poco tiempo'
    }
    ,super: {
        _ErrorWrongCommand: '❌ Comando erroneo'
        ,_ErrorNoPermission: '❌ No tenes permisos'
        ,_ErrorLoginAlready: '❌ Ya sos super admin. 📑 Podes desloguearte con !super logout.'
        ,defaultMessage: '📄 Super admin system for control Haxbotron bot in the game.'
        ,loginSuccess: '🔑 Login exitoso, ahora tense el rango de '
        ,logoutSuccess: '🔑 Logout exitoso. You are not super admin from now.'
        ,loginFail: '❌ Error de login.'
        ,loginFailNoKey: '❌ Error de login.'
        ,thor: {
            noAdmins: '❌ There are no admin players to disqualify.'
            ,complete: '🔑 Ahora tenes permisos de admin.'
            ,deprive: '🔑 Se quitaron admines temporales.'
        }
        ,kick: {
            noID: '❌ Error: Wrong Player ID. You can only target numeric ID.(eg: !super kick #12)'
            ,kickMsg: '📢 kicked from the game'
            ,kickSuccess: '📢 That player is kicked.'
        }
        ,ban: {
            noID: '❌ Error: Wrong Player ID. You can only target numeric ID.(eg: !super ban #12)'
            ,banMsg: '📢 banned from the game'
            ,banSuccess: '📢 That player is banned.'
        }
        ,banclear: {
            noTarget: '❌ Error: You can\'t this. 📑 !super banclear all'
            ,complete: '🔑 Succeeded to clear ban list.'
        }
        ,banlist: {
            _ErrorNoOne: '❌ There\'s no one.'
            ,whoisList: '📜 {whoisResult}'
        }
    }
    ,list: {
        _ErrorNoTeam: '❌ You can only request red,blue,spec,mute,afk players list.'
        ,_ErrorNoOne: '❌ There\'s no one.'
        ,whoisList: '📜 {whoisResult}'
    }
    ,freeze: {
        _ErrorNoPermission : '❌ You are not admin. You can\'t do this command.'
        ,onFreeze: '🔇 The administrator freezed chatting on this room. Commands are available. 📄 !help'
        ,offFreeze: '🔊 The administrator unfreezed chatting.' 
    }
    ,scout: {
        _ErrorNoMode : '❌ No hay suficientes jugadores para calcular las chances de victoria.'
        ,scouting: '📊 Pythagorean Expectation : Red {teamExpectationRed}%, Blue {teamExpectationBlue}%, Spec {teamExpectationSpec}%.'
    }
    ,vote: {
        _ErrorNoPlayer: '❌ ❌ Id erroneo. Escribe in ID numerico. (ej: !vote #12)'
        ,_ErrorNoPermission: '❌ No hay suficientes jugadores para iniciar la votacion.'
        ,voteBanMessage: '🚫 Votando ban (30mins)'
        ,voteComplete: '🗳️ Votaste a {targetName}#{targetID}. Podes cancelar el voto escribiendo el comando nuevamente.'
        ,voteCancel: '🗳️ Cancelaste el voto a {targetName}#{targetID}.'
        ,voteIntroduce : '🗳️ Podes votar para banear a un jugador. (ej: !vote #12)'
        ,voteStatus : '🗳️ Votaste ban a {targetName}#{targetID}.'
        ,voteAutoNotify: '🗳️ Votacion para ban en progreso: {voteList}'
    }
    ,tier: '📄 El rango es determinado por tu performance en los partidos. (!stats te muestra tu rango)\n'
    ,notice: {
        _ErrorNoMessage: '❌ No hay noticias'
    }
    ,hc: {
        frases: [" {0} le robo el novio a {1}", 
        "{0} le meo la cara a {1}", 
        "{0} le hizo aplaudir las nalgas a {1}", 
        "{0} le hizo un brrr en la cola a {1}", 
        "{0} le toco el culo a {1}", 
        "{0} le ficho el bulto a {1}", 
        "{0} se caso con {1}", 
        "{0} embarazo a {1}", 
        "{0} fue embarazado por {1}", 
        "{0} le dio unos besitos a {1}", 
        "{0} se cago a trompadas con {1}", 
        "{0} chapo con {1}", 
        "{0} mecho uno con {1}", 
        "{0} reforzo amistad con {1}", 
        "{0} sale con el papa de {1}", 
        "{0} rechazo los avances sexuales no solicitados de {1}", 
        "{0} le pidio plata y nunca se la devolvio a {1}", 
        "{0} le dio un arrimon a {1}", 
        "{0} sale con la prima de {1}", 
        "{0} se unto en aceite y se le tiro encima a {1}", 
        "{0} se puso en tanga y le bailo a {1}", 
        "{0} y el admin salieron de travas y lo encontraron a {1}", 
        "{0} es un comilon como {1}", 
        "{0} piensa que el mejor jugador es {1}", 
        "{0} dice que el mas burro es {1}", 
        "{0} piensa que el mas puto es {1}", 
        "{0} entró a su casa y vio a su hermana con {1}", 
        "{0} ya vio el video porno de {1}", 
        "{0} se creo una cuenta en brazzers con el gmail de {1}", 
        "{0} esta pidiendo que lo solicite a {1}", 
        "{0} rompio en llanto cuando vio a su prima con {1}"]
    }
    ,memide: 'A {playerName} le mide {cm} cm {extra}'
    ,gk: {
        missingGk: 'El equipo {teamId} no tiene arquero porque a {playerName} no le da!! Escribi !gk para serlo!!',
        gkChange: '{playerName} es el nuevo arquero de {teamId}. Para liberar el puesto escribe !gk nuevamente.'
    }
    ,bb: 'chau {player}, nos vemos amigo!'
    ,ban:  {
        permanentBan: 'Al jugador {player} le saco la ROJA PERMANENTEMENTE el arbitro {mod}.\n Razon: {reason}',
        fixedTermBan: 'Al jugador {player} le saco la roja el arbitro {mod}. Queda suspendido x 30 minutos.'
    }
    ,clip:  {
        clipped: 'Se guardo indicador para clip. Autor: {authorName} Descripcion: {description}',
        
    }
}

export const funcUpdateAdmins = {
    newAdmin: '📢 {playerName} has been new admin.\n📑 Changing stadium and banning other players are prohibited.\n📑 !help admin shows commands list for administrator.'
}

export const onJoin = {
    welcome: '♿ ¡Bienvenido ${playerName}, al Sindicato! ♿\n🔸Leé las reglas y juga sin trollear!\n🔹Ingresa a nuestro discord para enterarte nuevas noticias!'
    ,changename: '📢 {playerNameOld} se cambio el nombre, ahora es {playerName}'
    , startRecord: '📊 Entraron suficientes jugadores. Ahora se van a grabar las estadisticas del partido.'
    ,stopRecord: '📊 Hacen falta mas jugadores. Las estadisticas no se van a guardar'
    ,doubleJoinningMsg: '🚫 {playerName} has already joined.'
    ,doubleJoinningKick: '🚫 No podes entrar 2 veces.'
    ,tooLongNickname: '🚫 Tu nombre es muy largo.'
    ,duplicatedNickname: '🚫 Nickname en uso'
    ,bannedNickname: '🚫 Nickname baneado'
    ,includeSeperator: '🚫 El mensaje incluye palabras baneadas. (|,|)'
    ,banList: {
        permanentBan: 'Fuiste baneado permanentemente: {banListReason}'
        ,fixedTermBan: 'Fuiste baneado hasta {bannedUntil}: {banListReason}'
    }
}

export const onLeft = {
    startRecord: '📊 Entraron suficientes jugadores. Ahora se van a grabar las estadisticas del partido.'
    ,stopRecord: '📊 Hacen falta mas jugadores. Las estadisticas no se van a guardar'
}

export const onChat = {
    mutedChat: '🔇 Estas muteado por spamero. Pero podes seguir usando comandos.'
    ,tooLongChat: '🔇 El mensaje es muy largo amigo.'
    ,bannedWords: '🚫'
    ,includeSeperator: '🚫'
}

export const onTeamChange = {
    afkPlayer: '🚫 Cannot to change team. {targetPlayerName} is away from keyboard. ({targetAfkReason})'
}

export const onStart = {
    startRecord: '📊 Entraron suficientes jugadores. Ahora se van a grabar las estadisticas del partido.'
    ,stopRecord: '📊 Hacen falta mas jugadores. Las estadisticas no se van a guardar'
    ,expectedWinRate: '📊 Chances de ganar del rojo: {teamExpectationRed}% | chances de ganar del azul: {teamExpectationBlue}%'
}

export const onStop = {
    feedSocialDiscordWebhook: {
        replayMessage: '💽 Replay file from {roomName} ({replayDate})'
    }
}

export const onVictory = {
    victory:     '                                                          ¡EL PARTIDO TERMINA!'
    ,teams:      '                                               EQUIPOS: | {redTeam}🆚{blueTeam}'
    ,goals:      '                                               GOLES:   | {redScore} : {blueScore}'
    ,possession: '                                               POSESION:| {possTeamRed}% | {possTeamBlue}%'
    ,topScorer:  '                                               GOLEADOR:| {topScorer}'
    ,burning: '🔥 El equipo {streakTeamName} va ganando {streakTeamCount} partidos seguidos!!!'
    ,reroll: '📢 Ahora los equipos se van a mezclar.'
}

export const onKick = {
    cannotBan: '🚫 No podes banear otros jugadores. Usa kick.'
    ,notifyNotBan: '🚫 Banear a {kickedName} esta prohibido.'
}

export const onStadium = {
    loadNewStadium: '📁 {stadiumName} fue cargado.'
    ,cannotChange: '🚫 No podes cambiar el estadio.'
}

export const onGoal = {
    goal: [
        " 🔥 ¡PERO QUÉ GOLAZO CLAVO EL HDP DE {scorerName}!", 
        " 💥 ¡LE PEGO A FUNDIR Y GOLAZO DE {scorerName}!", 
        " ⚽ ¡GOL GOL GOL CANTALO, TENIA QUE APARECER {scorerName}!", 
        " 🤩 ¿QUIEN SINO? GOLON DE {scorerName}!", 
        " 👟 ¡LE PEGO DE PUNTIN Y GOLAZO DE {scorerName}!", 
        " 🎯 ¡AH NO PERO QUE DISTINGUIDO! GOLCITO DE {scorerName}!"
    ]
    ,goalWithAssist: [
        " 🤝 ¡CON ASISTENCIA DE {assistName}!", 
        " 👌 ¡CON HERMOSA ASISTENCIA DE {assistName}!", 
        " 💫 ¡CON PRECISO PASE DE {assistName}!", 
        " 👏 ¡CON EXCELENTE PASE DE {assistName}!"
    ] 
    ,og: [
        " 🚫 MOMMY, GOL EN CONTRA DEL PAYASO DE {ogName}", 
        " ❌ SOS BOLUDO HERMANO? GOL EN CONTRA DE {ogName}", 
        " 😖 AUTOGOL DEL TROLO DE ... {ogName}", 
        " 😵 UFF! GOLAZO!! EN CONTRA DEL BOLUDO DE {ogName}"
    ]
    , hatTrick: [
        " ⚽⚽⚽    TRIPLETE DEL CRACK {scorerName}"
    ]
}

export const onAdminChange = {
    afknoadmin: '🚫 The player in afk mode can\'t be admin.'
}

export const onGamePause = {
    readyForStart: '📢 El partido empieza pronto!'
}

export const maxbotron = { myName: "MAXBOTRON🤖" };
