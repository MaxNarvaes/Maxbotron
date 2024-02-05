import * as LangRes from "../resource/strings";
import { PlayerObject } from "../model/GameObject/PlayerObject";
import { cmdAbout } from "./commands/about";
import { cmdHelp } from "./commands/help";
import { cmdStats } from "./commands/stats";
import { cmdStreak } from "./commands/streak";
import { cmdStatsReset } from "./commands/statsreset";
import { cmdScout } from "./commands/scout";
import { cmdPoss } from "./commands/poss";
import { cmdAfk } from "./commands/afk";
import { cmdList } from "./commands/list";
import { cmdFreeze } from "./commands/freeze";
import { cmdMute } from "./commands/mute";
import { cmdVote } from "./commands/vote";
import { cmdSuper } from "./commands/super";
import { cmdTier } from "./commands/tier";
import { cmdNotice } from "./commands/notice";
import { cmdHc } from "./commands/hc";
import { cmdMeMide } from "./commands/memide";
import { cmdKsk } from "./commands/ksk";
import { cmdBb } from "./commands/bb";
import { cmdBan } from "./commands/ban";
import { commandList } from "./commands/commandList";

// if given string is command chat, this function returns true, nor false.
export function isCommandString(message: string): boolean {
    if(message.charAt(0) == "!") {
        // If message has prefix signature (default: !) as first character in it's string, return true.
        return true;
    } else {
        return false;
    }
}

// divide into 3 parts by sperator. !COMMAND FIRST-ARG SECOND-ARG
export function getCommandChunk(message: string): string[] { 
    return message.split(" ", 4);
}

// parse command message and excute it (need to check if it's command)
export function parseCommand(byPlayer: PlayerObject, message: string): void {
    let msgChunk: string[] = getCommandChunk(message);
    let commandSign: string = msgChunk[0].substring(1); // remove prefix character(default: !)
    /* if(window.gameRoom.config.commands._disabledCommandList?.includes(commandSign) === true) { // if this command is in disabled list
        window.gameRoom._room.sendAnnouncement(LangRes.command._ErrorDisabled, byPlayer.id, 0xFF7777, "normal", 2); // notify
        return; // exit this function
    } */
    
    if (Object.keys(commandList).find(commandName => commandName === commandSign)) {
        commandList[commandSign as keyof typeof commandList](byPlayer, msgChunk);
    } else {
        LangRes.SendConsole(LangRes.command._ErrorWrongCommand);
    }
}
