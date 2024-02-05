export class Tier {
    avatar: string;
    rating: number;
    name: string;

    constructor(avatar: string, elo: number, name: string) {
        this.avatar = avatar;
        this.rating = elo;
        this.name = name;
    }
}