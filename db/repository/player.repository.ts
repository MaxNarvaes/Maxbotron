import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Player } from '../entity/player.entity';
import { PlayerModel } from '../model/PlayerModel';

export class PlayerRepository implements IRepository<Player> {
    public async findAll(ruid: string, pagination?: {start: number, count: number}): Promise<Player[]> {
        const repository: Repository<Player> = getRepository(Player);
        let players: Player[] = [];
        if(pagination) {
            players = await repository.find({where: {ruid: ruid}, skip: pagination.start, take: pagination.count});
        } else {
            players = await repository.find({ ruid: ruid });
        }
        if (players.length === 0) throw new Error('No hay jugadores.');
        return players;
    }

    public async findSingle(ruid: string, auth: string): Promise<Player | undefined> {
        const repository: Repository<Player> = getRepository(Player);
        let player: Player | undefined = await repository.findOne({ ruid: ruid, auth: auth });
        if (player === undefined) throw new Error('Ese jugador no se encuentra.');
        return player;
    }

    public async addSingle(ruid: string, player: PlayerModel): Promise<Player> {
        const repository: Repository<Player> = getRepository(Player);
        let newPlayer: Player | undefined = await repository.findOne({ ruid: ruid, auth: player.auth });
        if (newPlayer === undefined) {
            newPlayer = new Player();
            newPlayer.ruid = ruid;
            newPlayer.auth = player.auth;
            newPlayer.conn = player.conn;
            newPlayer.name = player.name;
            newPlayer.rating = player.rating;
            newPlayer.totals = player.totals;
            newPlayer.disconns = player.disconns;
            newPlayer.wins = player.wins;
            newPlayer.goals = player.goals;
            newPlayer.assists = player.assists;
            newPlayer.ogs = player.ogs;
            newPlayer.losePoints = player.losePoints;
            newPlayer.balltouch = player.balltouch;
            newPlayer.passed = player.passed;
            newPlayer.mute = player.mute;
            newPlayer.muteExpire = player.muteExpire;
            newPlayer.rejoinCount = player.rejoinCount;
            newPlayer.superadmin = player.superadmin;
            newPlayer.role = player.role;
            newPlayer.joinDate = player.joinDate;
            newPlayer.leftDate = player.leftDate;
            newPlayer.malActCount = player.malActCount;
            newPlayer.gk = player.gk;
            newPlayer.goalsAgainstGk = player.goalsAgainstGk;
            newPlayer.perfectGk = player.perfectGk;
            newPlayer.hatTricks = player.hatTricks;
        } else {
            throw new Error('Tal jugador ya existe.');
        }
        return await repository.save(newPlayer);
    }

    public async updateSingle(ruid: string, auth: string, player: PlayerModel): Promise<Player> {
        const repository: Repository<Player> = getRepository(Player);
        let newPlayer: Player | undefined = await repository.findOne({ ruid: ruid, auth: auth });
        if (newPlayer !== undefined) {
            newPlayer.ruid = ruid;
            newPlayer.auth = player.auth;
            newPlayer.conn = player.conn;
            newPlayer.name = player.name;
            newPlayer.rating = player.rating;
            newPlayer.totals = player.totals;
            newPlayer.disconns = player.disconns;
            newPlayer.wins = player.wins;
            newPlayer.goals = player.goals;
            newPlayer.assists = player.assists;
            newPlayer.ogs = player.ogs;
            newPlayer.losePoints = player.losePoints;
            newPlayer.balltouch = player.balltouch;
            newPlayer.passed = player.passed;
            newPlayer.mute = player.mute;
            newPlayer.muteExpire = player.muteExpire;
            newPlayer.rejoinCount = player.rejoinCount;
            newPlayer.superadmin = player.superadmin;
            newPlayer.role = player.role;
            newPlayer.joinDate = player.joinDate;
            newPlayer.leftDate = player.leftDate;
            newPlayer.malActCount = player.malActCount;
            newPlayer.gk = player.gk;
            newPlayer.goalsAgainstGk = player.goalsAgainstGk;
            newPlayer.perfectGk = player.perfectGk;
            newPlayer.hatTricks = player.hatTricks;
        } else {
            throw new Error('Ese jugador no se encuentra.');
        }
        return await repository.save(newPlayer);
    }

    public async deleteSingle(ruid: string, auth: string): Promise<void> {
        const repository: Repository<Player> = getRepository(Player);
        let player: Player | undefined = await repository.findOne({ ruid: ruid, auth: auth });
        if (player === undefined) {
            throw new Error('Ese jugador no se encuentra.');
        } else {
            await repository.remove(player);
        }
    }
}