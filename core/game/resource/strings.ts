export function SendRelato(message: string){
    window.gameRoom._room.sendAnnouncement("Max el Relator🎙: " + message , null, style.colors.Yellow, null, 1);
}

export function SendConsole(message: string){
        window.gameRoom._room.sendAnnouncement("SDH | " + message , null, style.colors.LigthBlue, "italic", 1);        
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
        'SDH | ¿Querés hablar con los pibes? Entra al VC del discord: https://discord.com/channels/1122229514647371846/1122229516186697757',
        'SDH | Reglas del host ➡ https://discord.gg/KvfgRc7sfG'
    ]
    ,shutdown: 'SDH 📢 La sala se esta por apagar. Gracias por jugar!'
    ,afkKick: 'SDH 📢 Kickeado: AFK'
    ,afkCommandTooLongKick: 'SDH 📢 Estuviste AFK por mas de 10 minutos!'
    ,afkDetect: 'SDH ⚠️ {targetName}, si no te moves en {time} segundos, sale kick! ⚠️'
    ,autoUnmute: 'SDH 🔊 El jugador @{targetName} ha sido desmuteado.'
    ,banVoteAutoNotify: 'SDH 📢 La votación de ban está en progreso! (!vote #ID) : {voteList}'
}

export const teamName = {
    specTeam: 'Spec'
    ,redTeam: 'Rojo'
    ,blueTeam: 'Azul'
}

export const antitrolling = {
    joinFlood: {
        banReason: 'SDH 🚫 Estas intentando entrar hace Duracion: (5mins)'
        ,floodWarning: 'SDH 📢 Si se vuelve a conectar varias veces en un corto período de tiempo, sale kick.'
    }
    ,chatFlood: {
        muteReason: 'SDH 🔇 Estás silenciado por hacer flood. Duracion: (3 minutos)'
    }
    ,ogFlood: {
        banReason: 'SDH 🚫 Demasiadas letras raras. Duracion: (10mins)'
    }
    ,banNoPermission: {
        banReason: 'SDH 🚫 No puedes banear(? Duración: (30secs)'
    }
    ,kickAbusing: {
        banReason: 'SDH 🚫 too much kicks(5mins)'
        ,abusingWarning: 'SDH 📢 Es posible que seas kickeado si expulsas seguido a la gente!'
    }
    ,insufficientStartAbusing: {
        banReason: 'SDH 🚫 Empezar sin suficientes jugadores. Duracion: (5mins)'
        ,abusingWarning: 'SDH 📢 Es posible que te kickeen si comienzas el juego sin suficientes jugadores.'
    }
    ,afkAbusing: {
        cannotReason: 'SDH ❌ No puedes usar el comando AFK durante un juego.'
    }
    ,gameAbscond: {
        banReason: 'SDH 🚫 Homacón del juego(5mins)'
    }
    ,malAct: {
        banReason: 'SDH 🚫 Se detecta el comportamiento malicioso'
    }
}

export const command = {
    _ErrorWrongCommand : 'SDH ❌ Comando incorrecto. 📑 Usa !help para mas detalles!'
    ,_ErrorNoPermission: 'SDH ❌ No sos admin. No podes usar este comando.'
    ,_ErrorDisabled: 'SDH ❌ Este comando esta desactivado.'
    ,help: 'SDH 📄 !about, notice, stats, showstats, statsreset, tier, afk, vote, poss, streak, scout, list\n📑 Usa !help para mas detalles. (ej. !help stats)\n📑 Usa !help admin para ver comandos de staff.'
    ,helpadmin: 'SDH 📄 !freeze, mute\n📑 Usa !help para mas detalles.'
    ,helpman: { // detailed description for a command
        _ErrorWrongMan : 'SDH ❌ No se pudo leer este comando.'
        ,help: 'SDH 📑 Usa !help (Comando) para ver detalles sobre este.'
        ,about: 'SDH 📑 !about | Te muestra información simple del bot que se ejecuta ahora.'
        ,stats: 'SDH 📑 !stats | Te muestra tus estadísticas. 📑 Si quieres reiniciarlas, usa !statsreset\n📑 !stats #ID : te muestra las estadísticas de un jugador en específico.'
        ,statsreset: 'SDH 📑 !statsreset | Reinicia tus estadísticas. No se pueden recuperar!'
        ,poss: 'SDH 📑 !poss | Muestra la posesión de los equipos.'
        ,streak: 'SDH 📑 !streak | Muestra tu racha de victorias.'
        ,afk: 'SDH 📑 !afk | Ponerse AFK!'
        ,list: 'SDH 📑 !list | (Comando sin funcionamiento aún, no usar)'
        ,freeze: 'SDH 📑 !freeze | Mutear o desmutear a todos los jugadores.'
        ,mute: 'SDH 📑 !mute #ID : Prohíbe al jugador cuya identificación es ID para chatear. O inmerso si el jugador ya está silenciado. (ej: !mute #12)'
        ,scout: 'SDH 📑 !scout Muestra la expectativa de cada equipo por expectativas de pitagoreas personalizadas.'
        ,vote: 'SDH 📑 !vote | Te muestra el progreso de la votación.\n📑 !vote #ID : Vota por kickear algun jugador. (ej: !vote #12)'
        ,tier: 'SDH 📑 !tier | Muestra información sobre tu nivel y el sistema de puntos!'
        ,notice: 'SDH 📑 !notice | Te muestra el mensaje de notaciones.'
    } 
    ,about: 'SDH 📄 {RoomName} ({_LaunchTime})\n💬 El sindicato es una pasión.'
    ,stats: {
        _ErrorNoPlayer: 'SDH ❌ ID Incorrecta. Utiliza el # para verlas correctamente.(ej: !stats #12)'
        ,statsMsg: '🏆 Rango: {targetStatsRatingAvatar}{targetStatsRatingName} 🎇 Puntos: {targetPlayerPoints} \n🎮 Partidos: {targetStatsTotal} ✅ Ganados: {targetStatsWins} ❌ Perdidos: {targetStatsLoses} 🎉 Winrate: {targetStatsWinRate}% \n⚽️ Goles: {targetStatsGoals}  👟 Asistencias: {targetStatsAssists} 🥶 En contra: {targetStatsOgs}\n⚽️ Goles x partido: {targetStatsGoalsPerGame}  👟 Asistencias x partido: {targetStatsAssistsPerGame} 🎯 G+A por partido: {targetPlayerGAPerGame} 🥶En contra x partido: {targetStatsOgsPerGame} \n 🧤 valla invicta: {targetPlayerPerfectGk} 🎢 goles recibidos: {targetPlayerGoalsAgainstPerGame} 🎲 goles recibidos x partido: {targetPlayerGoalsAgainstPerGame} 🧙Efectividad Pases: {targetStatsPassSuccess}%'
        ,matchAnalysis: 'SDH 📊 Estadísticas de el partido: Hubo {targetStatsNowGoals} Goles {targetStatsNowAssists} Asistencias {targetStatsNowOgs}ogs. (Porcentaje de pases concretados: {targetStatsNowPassSuccess}%)'
    }
    ,statsreset: 'SDH 📊 Estadísticas reseteadas! No hay vuelta atrás'
    ,poss: 'SDH 📊 Posesión de la pelota : Rojo: {possTeamRed}%, Azul: {possTeamBlue}%.'
    ,streak: 'SDH 📊 {streakTeamName} ahora tiene una racha de victorias de {streakTeamCount} partidos!'
    ,afk: {
        _WarnAfkTooLong: 'SDH 📢 Fuiste kickeado por estar mucho tiempo afk. (afk por 2mins)'
        ,setAfk: 'SDH 💤 {targetName}#{ticketTarget} cagoneó y se fue AFK. Razón: ({targetAfkReason})'
        ,unAfk: 'SDH 📢 {targetName}#{ticketTarget} volvió al partido!'
        ,muteNotifyWarn: 'SDH ❌ Los mensajes de notificación para AFK no se mostrarán a otros jugadores cuando estés muteado.'
        ,startRecord: 'SDH 📊 Suficientes jugadores se han unido, por lo que el resultado del juego se grabará a partir de ahora.'
        ,stopRecord: 'SDH 📊 Se necesitan más jugadores. El resultado del juego no se grabará a partir de ahora. (Se necesitan: {gameRuleNeedMin} Jugadores al menos)'
    }
    ,mute: {
        _ErrorNoPermission: 'SDH ❌ No sos admin. No podes usar este comando!'
        ,_ErrorNoPlayer: 'SDH ❌ ID Incorrecta. Utiliza el # para verlas correctamente.(ej: !mute #12)'
        ,successMute: 'SDH 🔇 El jugador {targetName}#{ticketTarget} fué silenciado por 3 minutos'
        ,successUnmute: 'SDH 🔊 El jugador {targetName}#{ticketTarget} fué desilenciado.'
        ,muteAbusingWarn: 'SDH ❌ No puede silenciar a este jugador en demasiado tiempo. (3mins)'
    }
    ,super: {
        _ErrorWrongCommand: 'SDH ❌ ¿Qué intentas hacer? Contactate con un Master para esto.'
        ,_ErrorNoPermission: 'SDH ❌ No sos super admin. Contacta con un Master para esto.'
        ,_ErrorLoginAlready: 'SDH ❌ Ahora sos super admin. 📑 Te lo podes sacar con el comando !super logout.'
        ,defaultMessage: 'SDH 📄 Sistema de super admin para el control total en el juego.'
        ,loginSuccess: 'SDH 🔑 Logeado correctamente. Ahora sos super admin'
        ,logoutSuccess: 'SDH 🔑 Deslogeado correctamente. Ya no sos super admin'
        ,loginFail: 'SDH ❌ Error al logear.'
        ,loginFailNoKey: 'SDH ❌ Error al logear, fijate bien el codigo de login.'
        ,thor: {
            noAdmins: 'SDH ❌ No hay jugadores staff para moderar!'
            ,complete: 'SDH 🔑 Logró obtener el permiso de administración.'
            ,deprive: 'SDH 🔑 Logró descalificar a otros jugadores administrativos y hacerte administrador.'
        }
        ,kick: {
            noID: 'SDH ❌ Error: ID Incorrecta. Utiliza el # para verlas correctamente.(ej: !super kick #12)'
            ,kickMsg: 'SDH 📢 Kickeado de la sala'
            ,kickSuccess: 'SDH 📢 Este jugador fué kickeado.'
        }
        ,ban: {
            noID: 'SDH ❌ Error: ID Incorrecta. Utiliza el # para verlas correctamente.(ej: !super ban #12)'
            ,banMsg: 'SDH 📢 Baneado de la sala'
            ,banSuccess: 'SDH 📢 Este jugador fué baneado.'
        }
        ,banclear: {
            noTarget: 'SDH ❌ Error: No podes usar esto. 📑 !super banclear all'
            ,complete: 'SDH 🔑 Se eliminaron los baneos.'
        }
        ,banlist: {
            _ErrorNoOne: 'SDH ❌ No hay baneos(?.'
            ,whoisList: 'SDH 📜 {whoisResult}'
        }
    }
    ,list: {
        _ErrorNoTeam: 'SDH ❌ Solo puede solicitar la lista de jugadores rojos, azules, espectadires, silenciados, AFK.'
        ,_ErrorNoOne: 'SDH ❌ No hay lista de jugadores(?.'
        ,whoisList: 'SDH 📜 {whoisResult}'
    }
    ,freeze: {
        _ErrorNoPermission : 'SDH ❌ No sos admin. No podes usar este comando!'
        ,onFreeze: 'SDH 🔇 Un administrador muteo el chat. Los comandos si funcionan. 📄 !help'
        ,offFreeze: 'SDH 🔊 Un administrador desmuteo el chat.' 
    }
    ,scout: {
        _ErrorNoMode : 'SDH ❌ No hay suficientes jugadores como para calcular la victoria.'
        ,scouting: 'SDH 📊 Expectativa pitagórica : Rojo {teamExpectationRed}%, Azul {teamExpectationBlue}%, Spec {teamExpectationSpec}%.'
    }
    ,vote: {
        _ErrorNoPlayer: 'SDH ❌ ID Incorrecta. Usa el # para verlas correctamente. (ej: !vote #12)'
        ,_ErrorNoPermission: 'SDH ❌ No hay suficientes jugadores para votar.'
        ,voteBanMessage: 'SDH 🚫 Empezó una votación de baneo por 30 minutos!'
        ,voteComplete: 'SDH 🗳️ Votaste a {targetName}#{targetID}. Puedes cancelar el voto escribiendo el mismo comando.'
        ,voteCancel: 'SDH 🗳️ Cancelaste el voto por {targetName}#{targetID}.'
        ,voteIntroduce : 'SDH 🗳️ Puedes votar o cancelar un ban para un jugador específico. (ej: !vote #12)'
        ,voteStatus : 'SDH 🗳️ Votaste correctamente para banear a {targetName}#{targetID}.'
        ,voteAutoNotify: 'SDH 🗳️ La votación de baneo sigue en progreso: {voteList}'
    }
    ,tier: 'SDH 📄 El rango es determinado por tu performance en los partidos. (!stats te muestra tu rango)\n'
    ,notice: {
        _ErrorNoMessage: 'SDH ❌ Sin mensaje de aviso.'
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
        missingGk: 'SDH 📣 El equipo {teamId} no tiene arquero porque a {playerName} no le da! Escribí !gk para serlo!',
        gkChange: 'SDH 📣 {playerName} es el nuevo arquero de {teamId}. Para liberar el puesto escribe !gk nuevamente.'
    }
    ,bb: 'SDH 📣 Nos vemos {player}!'
    ,ban:  {
        permanentBan: 'SDH 📣 El jugador {player} fue baneado PERMANENTEMENTE por el admin {mod}.\n Razón: {reason}',
        fixedTermBan: 'SDH 📣 El jugador {player} fue baneado por el admin {mod}.'
    }
}

export const funcUpdateAdmins = {
    newAdmin: 'SDH 📢 {playerName}#{playerID} ahora es nuevo admin.\n📑 Cambiar el estadio o banear sin razón esta prohibido.\n📑 !help admin | Para ver los comandos.'
}

export const onJoin = {
    welcome: 'SDH 📢 Bienvenido, {playerName}#{playerID}! 📄 Podes ver info de los commandos con !help'
    ,changename: 'SDH 📢 #{playerID}{playerNameOld} se cambio el nombre, ahora es {playerName}'
    ,startRecord: 'SDH 📊 Ya empezamos el partido. El juego se empezó a transmitir por Sindicato Sports!'
    ,stopRecord: 'SDH 📊 Necesitamos mas jugadores. La grabación del partido finalizó! (Se necesitan: {gameRuleNeedMin} jugadores todavía)'
    ,doubleJoinningMsg: 'SDH 🚫 {playerName}#{playerID} ya ha ingresado(?).'
    ,doubleJoinningKick: 'SDH 🚫 No podes entrar 2 veces.'
    ,tooLongNickname: 'SDH 🚫 Tu nombre es muy largo.'
    ,duplicatedNickname: 'SDH 🚫 Nickname en uso'
    ,bannedNickname: 'SDH 🚫 Nickname baneado'
    ,includeSeperator: 'SDH 🚫 El mensaje incluye palabras baneadas. (|,|)'
    ,banList: {
        permanentBan: '{banListReason}'
        ,fixedTermBan: '{banListReason}'
    }
}

export const onLeft = {
    startRecord: 'SDH 📊 Suficiente jugadores se ha unido, por lo que el resultado del juego se grabará a partir de ahora.'
    ,stopRecord: 'SDH 📊 SDH 📊 Necesitamos mas jugadores. La grabación del partido finalizó! (Se necesitan: {gameRuleNeedMin} jugadores todavía)'
}

export const onChat = {
    mutedChat: 'SDH 🔇 Fuiste silenciado. No puedes enviar mensajes solo ver tus comandos.'
    ,tooLongChat: 'SDH 🔇 El mensaje es muy largo...'
    ,bannedWords: 'SDH 🚫 Pará flaco.'
    ,includeSeperator: 'SDH 🚫 Escribiste caracteres prohibidos en el chat. (|,|)'
}

export const onTeamChange = {
    afkPlayer: 'SDH 🚫 No lo podes mover. {targetPlayerName}#{targetPlayerID} esta AFK. Razón: ({targetAfkReason})'
}

export const onStart = {
    startRecord: 'SDH 📊 Suficiente jugadores se ha unido, por lo que el resultado del juego se grabará a partir de ahora.'
    ,stopRecord: 'SDH 📊 Necesitamos mas jugadores. La grabación del partido finalizó! (Se necesitan: {gameRuleNeedMin} jugadores todavía)'
    ,expectedWinRate: 'SDH 📊 Las expectativas del Rojo son de: {teamExpectationRed}%, y las del Azul de: {teamExpectationBlue}%. (Pythagorean Expectation)'
}

export const onStop = {
    feedSocialDiscordWebhook: {
        replayMessage: 'SDH 💽 Se envió la grabación al discord! | {roomName} ({replayDate})'
    }
}

export const onVictory = {
    victory:     '                                                          ¡EL PARTIDO TERMINA!'
    ,teams:      '                                               EQUIPOS: | {redTeam}🆚{blueTeam}'
    ,goals:      '                                               RESULTADO:   | {redScore} : {blueScore}'
    ,possession: '                                               POSESION:| {possTeamRed}% | {possTeamBlue}%'
    ,topScorer:  '                                               MVP:| {topScorer}'
    ,burning: 'SDH 🔥 El equipo {streakTeamName} va ganando {streakTeamCount} partidos seguidos!'
    ,reroll: 'SDH 📢 Ahora los equipos se van a mezclar.'
}

export const onKick = {
    cannotBan: 'SDH 🚫 No podes banear otros jugadores. Usa kick.'
    ,notifyNotBan: 'SDH 🚫 Banear a {kickedName}#{kickedID} esta prohibido.'
}

export const onStadium = {
    loadNewStadium: 'SDH 📁 {stadiumName} fue cargado.'
    ,cannotChange: 'SDH 🚫 No podes cambiar el estadio.'
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
        " ⚽⚽⚽    HAT-TRICK DE {scorerName}"
    ]
}

export const onAdminChange = {
    afknoadmin: 'SDH 🚫 El reproductor en modo AFK no puede ser administrador.'
}

export const onGamePause = {
    readyForStart: 'SDH 📢 El partido empieza pronto!'
}
