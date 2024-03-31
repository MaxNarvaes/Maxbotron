import { string } from "joi";
import { randomInteger } from "../../controller/RoomTools";
import { getUnixTimestamp } from "../../controller/Statistics";
import { Player } from "./Player"
import uEmojiParser from "universal-emoji-parser";

export interface PlayerAnimations {
    default: Animation[],
    onGoal: Animation[],
    onKick: Animation[],
    onJoin: Animation[],
    onHatTrick: Animation[],
    onAssist: Animation[],
    onOwnGoal: Animation[],
    onVictory: Animation[],
    onDefeat: Animation[],
    onMvp: Animation[],
    ownGoalTeam: Animation[],
    ownGoalOponent: Animation[],
    
}

export interface Animation {
    name: string,
    frames: Frame[],
    currentFrame: Frame | null,
    repeats: boolean,
    times: number,
    animating: boolean
}

export interface Frame {
    index: number,
    bitmaps: string[] | null,
    delayInMs: number,
    startedTimestamp: number,
    animating: boolean
}

export class Animator {
    animate(playerId: number): void {

        //window.gameRoom.logger.i("animate", "animate: entra a funcion " + playerId);
        var player: Player = window.gameRoom.playerList.get(playerId)!;
        if (player.currentAnimation === null) {
            //window.gameRoom.logger.e("animate", "animate: current animation = null");
            player.currentAnimation = {...player.gk ? player.animations.default[1] : player.animations.default[0]};
        }

        if (player.currentAnimation.animating === false) {
            //window.gameRoom.logger.e("animate", "animate: current animation not animating");
            if (player.currentAnimation.currentFrame === null) {
                //window.gameRoom.logger.e("animate", "animate: current frame null");
                player.currentAnimation.currentFrame = {...player.currentAnimation.frames[0]};
                player.currentAnimation.animating = true;
            }

        } else {
            if (player.currentAnimation!.currentFrame && player.currentAnimation!.currentFrame.animating === false) {
                //window.gameRoom.logger.e("animate", "animate: current frame not animating");
                player.currentAnimation!.currentFrame.startedTimestamp = getUnixTimestamp();
        
                var emoji: string | null = null;
                if(player.currentAnimation!.currentFrame.bitmaps !== null) {
                    emoji = pickRandomElement(player.currentAnimation!.currentFrame.bitmaps);
                }
                //window.gameRoom.logger.e("animate", "animate: set avatar " + playerId + player.currentAnimation!.currentFrame.bitmaps!.toString());
                
                window.gameRoom._room.setPlayerAvatar(player.id, emoji ? uEmojiParser.parseToUnicode(emoji): emoji);
                player.currentAnimation!.currentFrame.startedTimestamp = getUnixTimestamp();
                player.currentAnimation!.currentFrame.animating = true;
            }
            if (//player.currentAnimation!.currentFrame!.animating &&
                getUnixTimestamp() >= (player.currentAnimation!.currentFrame!.startedTimestamp + player.currentAnimation!.currentFrame!.delayInMs)) {
                //next frame
                //window.gameRoom.logger.e("animate", "animate: change frame " + getUnixTimestamp() + " - " + player.currentAnimation!.currentFrame!.startedTimestamp);
                if (player.currentAnimation.currentFrame!.index === player.currentAnimation.frames.length - 1) {
                    //last frame
                    if (player.currentAnimation.repeats === true) {
                        //repeats
                        player.currentAnimation.currentFrame!.animating = false;
                        player.currentAnimation.currentFrame!.startedTimestamp = getUnixTimestamp();
                        player.currentAnimation.currentFrame = {...player.currentAnimation.frames[0]};
                        //window.gameRoom.logger.i("animate", "animate: back to 1st frame " + playerId + player.currentAnimation!.currentFrame!.bitmaps);
                        return;
                    }
                    //window.gameRoom.logger.e("animate", "animate: last frame. go back to default animation");
                    
                    // back to default animation
                    player.currentAnimation = {...player.gk ? player.animations.default[1] : player.animations.default[0]};
                    return;
                }
                
                // current frame = next frame
                player.currentAnimation.currentFrame = {...player.currentAnimation.frames[player.currentAnimation.currentFrame!.index + 1]};
                //window.gameRoom.logger.i("animate", "animate: next frame " + playerId + player.currentAnimation!.currentFrame!.bitmaps);
            }
        }
    }
}

export function pickRandomElement<T>(array: T[]): T{
    var index = randomInteger(0, array.length - 1);
    //window.gameRoom.logger.e("pick random element","Pickrandom: Ramdon int entre 0 y " + array.length + ": " + index);
    return array[index]
}

