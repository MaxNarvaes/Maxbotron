export function SendRelato(message: string){
    window.gameRoom._room.sendAnnouncement("Max el Relator🎙: " + message , null, style.colors.Yellow, null, 1);
}

export function SendConsole(message: string){
        window.gameRoom._room.sendAnnouncement("「🤖」MaxBot: " + message , null, style.colors.Green, "italic", 1);        
}

// YOU CAN USE A PLACEHOLDER FOR INTERPOLATION. FOR EXAMPLE, 'Hello, My name is {name}.'
// THE TYPES OF PLACEHOLDER ARE LIMITED BY STRING SET.

export const style = {
    separator: '                                                                                                      ',
    colors: {
        Red: 0xFA5646,
        Orange: 0xFF5E3B,
        Green: 0x7DFA89,
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
        '📢 Maxbot🤖 ',
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
        banReason: '🚫 too much rejoin(5mins)'
        ,floodWarning: '📢 If you reconnect several times in a short period of time, you may be kicked.'
    }
    ,chatFlood: {
        muteReason: '🔇 You are muted for too many chats.(3mins) Admin player can unmute it.'
    }
    ,ogFlood: {
        banReason: '🚫 too much OGs(10mins)'
    }
    ,banNoPermission: {
        banReason: '🚫 do not ban(30secs)'
    }
    ,kickAbusing: {
        banReason: '🚫 too much kicks(5mins)'
        ,abusingWarning: '📢 You might be kicked if you kicked other players too much.'
    }
    ,insufficientStartAbusing: {
        banReason: '🚫 start with insufficient players(5mins)'
        ,abusingWarning: '📢 You might be kicked if you start game without sufficient players.'
    }
    ,afkAbusing: {
        cannotReason: '❌ You can\'t use afk command during a game.'
    }
    ,gameAbscond: {
        banReason: '🚫 Abscond from game(5mins)'
    }
    ,malAct: {
        banReason: '🚫 Malicious behaviour is detected'
    }
}

export const command = {
    _ErrorWrongCommand : '❌ Comando incorrecto. 📑 !help or !help COMMANDO para detalles'
    ,_ErrorNoPermission: '❌ No sos admin. No podes usar este comando.'
    ,_ErrorDisabled: '❌ Este comando esta desactivado.'
    ,help: '📄 !about, notice, stats, showstats, statsreset, tier, afk, vote, poss, streak, scout, list\n📑 !help COMMANDO Para detalle. (ej. !help stats)\n📑 !help admin shows you commands list for administrator.'
    ,helpadmin: '📄 !freeze, mute\n📑 !help COMMAND for detail.'
    ,helpman: { // detailed description for a command
        _ErrorWrongMan : '❌ Failed to read manual about that command.'
        ,help: '📑 !help COMMAND shows you how to use COMMAND command.'
        ,about: '📑 !about shows you simple inforamtion of the bot running now.'
        ,stats: '📑 !stats shows you your statistical information. 📑 If you want to reset, do !statsreset\n📑 !stats #ID : shows you statistical inforamtion of the player who has ID.\n📑 You can check IDs by command !list red,blue,spec'
        ,statsreset: '📑 !statsreset resets your statistical information. It cannot be recovered.'
        ,poss: '📑 !poss shows you possessions rate of both Read and Blue team.'
        ,streak: '📑 !streak shows you which team is being on a winning streak.'
        ,afk: '📑 !afk MSG switches to idle status. MSG is the reason, and it can be skipped. You might be kicked if sleep too long.'
        ,list: '📑 !list red/blue/spec/mute/afk shows you all players list of that type.'
        ,freeze: '📑 !freeze mutes or unmutes all players.'
        ,mute: '📑 !mute #ID : prohibits the player whose id is ID to chat. Or unmute if the player is already muted. (eg: !mute #12)\n📑 You can check IDs by command !list red,blue,spec,mute'
        ,scout: '📑 !scout shows you expectation of each teams by customed Pythagorean Expectation.'
        ,vote: '📑 !vote shows you progress of the vote.\n📑 !vote #ID : vote for kick that player. (eg: !vote #12)'
        ,tier: '📑 !tier shows you information of tier and rating system.'
        ,notice: '📑 !notice shows you notice message.'
    } 
    ,about: '📄 {RoomName} ({_LaunchTime})\n💬 This room is powered by Maxbotron🤖 bot.'
    ,stats: {
        _ErrorNoPlayer: '❌ Wrong player ID. You can only target numeric ID.(eg: !stats #12)\n📑 You can check IDs by command !list red,blue,spec'
        ,statsMsg: '🏆 Rank: {targetStatsRatingAvatar}{targetStatsRatingName} 🎇Puntos: {targetPlayerPoints} \n🎮 Partidos: {targetStatsTotal} ✅ Ganados: {targetStatsWins} ❌ Perdidos: {targetStatsLoses} 🎉 Winrate: {targetStatsWinRate}% \n⚽️ Goles: {targetStatsGoals}  👟 Asistencias: {targetStatsAssists} 🥶En contra: {targetStatsOgs}\n⚽️ Goles x partido: {targetStatsGoalsPerGame}  👟 Asistencias x partido: {targetStatsAssistsPerGame} 🎯 G+A por partido: {targetPlayerGAPerGame} 🥶En contra x partido: {targetStatsOgsPerGame} \n 🧤 valla invicta: {targetPlayerPerfectGk} 🎢 goles recibidos: {targetPlayerGoalsAgainstPerGame} 🎲 goles recibidos x partido: {targetPlayerGoalsAgainstPerGame} 🧙Efectividad Pases: {targetStatsPassSuccess}%'
        ,matchAnalysis: '📊 In this match, {targetStatsNowGoals}goals {targetStatsNowAssists}assists {targetStatsNowOgs}ogs. (Pass Success Rate {targetStatsNowPassSuccess}%)'
    }
    ,statsreset: '📊 Reset for statistical information completed. You can\'t cancel it.'
    ,poss: '📊 Ball possession : Red {possTeamRed}%, Blue {possTeamBlue}%.'
    ,streak: '📊 {streakTeamName} is now hitting a winning streak of {streakTeamCount} games!'
    ,afk: {
        _WarnAfkTooLong: '📢 You might be kicked if sleep too long. (afk for 2mins)'
        ,setAfk: '💤 {targetName}#{ticketTarget} is now away from keyboard. ({targetAfkReason})'
        ,unAfk: '📢 {targetName}#{ticketTarget} has came back from afk mode!'
        ,muteNotifyWarn: '❌ Notification messages for AFK will not be shown to other players when you are muted.'
        ,startRecord: '📊 Enough players has joined, so the game\'s result will be recorded from now.'
        ,stopRecord: '📊 Need more players. The game\'s result will not be recorded from now. (needs {gameRuleNeedMin} players at least)'
    }
    ,mute: {
        _ErrorNoPermission: '❌ You are not admin. You can\'t do this command.'
        ,_ErrorNoPlayer: '❌ Wrong player ID. You can only target numeric ID.(eg: !mute #12)\n📑 You can check IDs by command !list red,blue,spec,mute'
        ,successMute: '🔇 {targetName}#{ticketTarget} player is muted.(3mins) You can command it againt for release.'
        ,successUnmute: '🔊 Player {targetName}#{ticketTarget} is unmuted.'
        ,muteAbusingWarn: '❌ You can\'t mute again this player in too short time. (3mins)'
    }
    ,super: {
        _ErrorWrongCommand: '❌ You did wrong command for super admin system.'
        ,_ErrorNoPermission: '❌ You are not super admin. You can\'t do this command.'
        ,_ErrorLoginAlready: '❌ You are already super admin. 📑 You can logout by command !super logout.'
        ,defaultMessage: '📄 Super admin system for control Haxbotron bot in the game.'
        ,loginSuccess: '🔑 Succeeded to login. You are super admin from now.'
        ,logoutSuccess: '🔑 Succeeded to logout. You are not super admin from now.'
        ,loginFail: '❌ Failed to login.'
        ,loginFailNoKey: '❌ Failed to login. You should submit authentication key for login.'
        ,thor: {
            noAdmins: '❌ There are no admin players to disqualify.'
            ,complete: '🔑 Succeeded to get admin permission.'
            ,deprive: '🔑 Succeeded to disqualify other admin players and make you admin.'
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
        _ErrorNoMode : '❌ There are not enough players for calculating winning expectation.'
        ,scouting: '📊 Pythagorean Expectation : Red {teamExpectationRed}%, Blue {teamExpectationBlue}%, Spec {teamExpectationSpec}%.'
    }
    ,vote: {
        _ErrorNoPlayer: '❌ ❌ Wrong player ID. You can only target numeric ID. (eg: !vote #12)'
        ,_ErrorNoPermission: '❌ There are not enough players for voting.'
        ,voteBanMessage: '🚫 ban vote(30mins)'
        ,voteComplete: '🗳️ You did vote to {targetName}#{targetID}. You can cancel the vote by type this command again.'
        ,voteCancel: '🗳️ You have cancelled the vote for that player {targetName}#{targetID}.'
        ,voteIntroduce : '🗳️ You can vote for or cancel a kick for a specific player. (eg: !vote #12)'
        ,voteStatus : '🗳️ You have currently voted for kick {targetName}#{targetID}.'
        ,voteAutoNotify: '🗳️ Voting to ban is in progress: {voteList}'
    }
    ,tier: '📄 El rango es determinado por tu performance en los partidos. (!stats te muestra tu rango)\n'
    ,notice: {
        _ErrorNoMessage: '❌ No notice message.'
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
    ,memide: 'A {playerName} le mide {cm} cm'
    ,gk: {
        missingGk: 'El equipo {teamId} no tiene arquero porque a {playerName} no le da!! Escribi !gk para serlo!!',
        gkChange: '{playerName} es el nuevo arquero de {teamId}. Para liberar el puesto escribe !gk nuevamente.'
    }
    ,bb: 'chau {player}, nos vemos amigo!'
    ,ban:  {
        permanentBan: 'El jugador {player} fue baneado PERMANENTEMENTE por el admin {mod}.\n Razon: {reason}',
        fixedTermBan: 'El jugador {player} fue baneado por el admin {mod}.'
    }
}

export const funcUpdateAdmins = {
    newAdmin: '📢 {playerName}#{playerID} has been new admin.\n📑 Changing stadium and banning other players are prohibited.\n📑 !help admin shows commands list for administrator.'
}

export const onJoin = {
    welcome: '📢 Bienvenido, {playerName}#{playerID}! 📄 Podes ver info de los commandos con !help'
    ,changename: '📢 #{playerID}{playerNameOld} se cambio el nombre, ahora es {playerName}'
    ,startRecord: '📊 Enough players has joined, so the game\'s result will be recorded from now.'
    ,stopRecord: '📊 Need more players. The game\'s result will not be recorded from now. (needs {gameRuleNeedMin} players at least)'
    ,doubleJoinningMsg: '🚫 {playerName}#{playerID} has already joined.'
    ,doubleJoinningKick: '🚫 No podes entrar 2 veces.'
    ,tooLongNickname: '🚫 Tu nombre es muy largo.'
    ,duplicatedNickname: '🚫 Nickname en uso'
    ,bannedNickname: '🚫 Nickname baneado'
    ,includeSeperator: '🚫 El mensaje incluye palabras baneadas. (|,|)'
    ,banList: {
        permanentBan: '{banListReason}'
        ,fixedTermBan: '{banListReason}'
    }
}

export const onLeft = {
    startRecord: '📊 Enough players has joined, so the game\'s result will be recorded from now.'
    ,stopRecord: '📊 Need more players. The game\'s result will not be recorded from now. (needs {gameRuleNeedMin} players at least)'
}

export const onChat = {
    mutedChat: '🔇 You are muted. You can\'t send message to others, and only can command by chat.'
    ,tooLongChat: '🔇 Chat message is too long.'
    ,bannedWords: '🚫 Chat message includes banned words.'
    ,includeSeperator: '🚫 Chat message includes banned word. (|,|)'
}

export const onTeamChange = {
    afkPlayer: '🚫 Cannot to change team. {targetPlayerName}#{targetPlayerID} is away from keyboard. ({targetAfkReason})'
}

export const onStart = {
    startRecord: '📊 Enough players has joined, so the game\'s result will be recorded from now.'
    ,stopRecord: '📊 Need more players. The game\'s result will not be recorded from now. (needs {gameRuleNeedMin} players at least)'
    ,expectedWinRate: '📊 The red team \'s expectation is {teamExpectationRed}%, and the blue\'s is {teamExpectationBlue}%. (Pythagorean Expectation)'
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
    ,notifyNotBan: '🚫 Banear a {kickedName}#{kickedID} esta prohibido.'
}

export const onStadium = {
    loadNewStadium: '📁 {stadiumName} fue cargado.'
    ,cannotChange: '🚫 No podes cambiar el estadio.'
}

export const onTouch = {

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
