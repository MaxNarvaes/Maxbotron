import { PlayerObject } from "../../model/GameObject/PlayerObject";

export abstract class Command {
    public abstract commandId: string;
    public abstract helpMan: string;
    public abstract timeout: number;

    abstract execute(byPlayer: PlayerObject, message: string[]): void
}