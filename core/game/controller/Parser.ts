import * as LangRes from "../resource/strings";
import { PlayerObject } from "../model/GameObject/PlayerObject";
import { commandList } from "./commands/commandList";
import { registerCommandTimeout } from "./commands/commandHelper";
import { maketext } from "./Translator";

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
    return message.trim().split(" ");
}

// parse command message and excute it (need to check if it's command)
export function parseCommand(byPlayer: PlayerObject, message: string): void {
    let msgChunk: string[] = getCommandChunk(message);
    let commandName: string = msgChunk[0].substring(1); // remove prefix character(default: !)
    let args: string[] = msgChunk;
    
    if (isValidCommand(commandName)) {
        let key = commandName + byPlayer.auth;
        if (window.gameRoom.playerTimeouts.has(key)) {
            LangRes.message(maketext(LangRes.command._ErrorCooldown, {commandName: commandName}), byPlayer.id);
            return;
        }
        commandList[commandName as keyof typeof commandList].execute(byPlayer, args);
    } else {
        LangRes.message(LangRes.command._ErrorWrongCommand, byPlayer.id);
    }
}
function isValidCommand(commandName: string) {
    return Object.keys(commandList).includes(commandName);
}

