export class TeamUniform {
    angle: number;
    mainColor: number[];
    avatarColor: number;

    constructor(angle: number, mainColor: number[], avatarColor: number) {
        this.angle = angle;
        this.avatarColor = avatarColor;
        this.mainColor = mainColor;
    }
}