import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { PlayerEntity } from '../entity/player.entity';
import { PlayerModel } from '../model/PlayerModel';

export class PlayerRepository implements IRepository<PlayerEntity> {
    public async findAll(ruid: string, pagination?: { start: number, count: number }): Promise<PlayerEntity[]> {
        const repository: Repository<PlayerEntity> = getRepository(PlayerEntity);
        let players: PlayerEntity[] = [];
        if (pagination) {
            players = await repository.find({ where: { ruid: ruid }, skip: pagination.start, take: pagination.count });
        } else {
            players = await repository.find({ ruid: ruid });
        }
        if (players.length === 0) throw new Error('There are no players.');
        return players;
    }

    public async findSingle(ruid: string, auth: string): Promise<PlayerEntity | undefined> {
        const repository: Repository<PlayerEntity> = getRepository(PlayerEntity);
        let player: PlayerEntity | undefined = await repository.findOne({ ruid: ruid, auth: auth });
        if (player === undefined) throw new Error('Such player is not found.');
        return player;
    }

    public async findSingleByUsername(ruid: string, username: string): Promise<PlayerEntity | undefined> {
        const repository: Repository<PlayerEntity> = getRepository(PlayerEntity);
        let player: PlayerEntity | undefined = await repository.findOne({
            where: { username: username, ruid: ruid }
        });
        if (player === undefined) throw new Error('Such player is not found.');
        return player;
    }

    public async addSingle(ruid: string, player: PlayerModel): Promise<PlayerEntity> {
        const repository: Repository<PlayerEntity> = getRepository(PlayerEntity);
        let newPlayer: PlayerEntity | undefined = await repository.findOne({ ruid: ruid, auth: player.auth });
        if (newPlayer === undefined) {
            newPlayer = new PlayerEntity();
            newPlayer.ruid = ruid;
            newPlayer.auth = player.auth;
            newPlayer.conn = player.conn;
            newPlayer.name = player.name;
            newPlayer.rating = player.rating;
            newPlayer.totals = player.totals;
            newPlayer.disconns = player.disconns;
            newPlayer.wins = player.wins;
            newPlayer.loses = player.loses;
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
            newPlayer.roleExpire = player.roleExpire;
            newPlayer.joinDate = player.joinDate;
            newPlayer.leftDate = player.leftDate;
            newPlayer.malActCount = player.malActCount;
            newPlayer.gk = player.gk;
            newPlayer.goalsAgainstGk = player.goalsAgainstGk;
            newPlayer.perfectGk = player.perfectGk;
            newPlayer.hatTricks = player.hatTricks;
            newPlayer.username = player.username;
            newPlayer.password = player.password;
            newPlayer.warningCount = player.warningCount;

            newPlayer.goalsPlusAssistsPerGame = player.goalsPlusAssistsPerGame;
            newPlayer.goalsPerGame = player.goalsPerGame;
            newPlayer.goalsAgainstPerGame = player.goalsAgainstPerGame;
            newPlayer.oGsPerGame = player.oGsPerGame;
            newPlayer.assistsPerGame = player.assistsPerGame;

            newPlayer.winrate = player.winrate;
            newPlayer.passPercentage = player.passPercentage;
        } else {
            throw new Error('Such player is exist already.');
        }
        return await repository.save(newPlayer);
    }

    public async updateSingle(ruid: string, auth: string, player: PlayerModel): Promise<PlayerEntity> {
        const repository: Repository<PlayerEntity> = getRepository(PlayerEntity);
        let players: PlayerEntity[] | undefined = await repository.find({ ruid: ruid, auth: auth });
        var newPlayer: PlayerEntity | null = null;
        if (players.length > 1) {
            newPlayer = players.filter((p) => player.username == player.username)[0];
        } else {
            newPlayer = players[0];
        }

        if (newPlayer !== undefined) {
            newPlayer.ruid = ruid;
            newPlayer.auth = player.auth;
            newPlayer.conn = player.conn;
            newPlayer.name = player.name;
            newPlayer.rating = player.rating;
            newPlayer.totals = player.totals;
            newPlayer.disconns = player.disconns;
            newPlayer.wins = player.wins;
            newPlayer.loses = player.loses;
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
            newPlayer.roleExpire = player.roleExpire;
            newPlayer.joinDate = player.joinDate;
            newPlayer.leftDate = player.leftDate;
            newPlayer.malActCount = player.malActCount;
            newPlayer.gk = player.gk;
            newPlayer.goalsAgainstGk = player.goalsAgainstGk;
            newPlayer.perfectGk = player.perfectGk;
            newPlayer.hatTricks = player.hatTricks;
            newPlayer.username = player.username;
            newPlayer.password = player.password;
            newPlayer.warningCount = player.warningCount;

            newPlayer.goalsPlusAssistsPerGame = player.goalsPlusAssistsPerGame;
            newPlayer.goalsPerGame = player.goalsPerGame;
            newPlayer.goalsAgainstPerGame = player.goalsAgainstPerGame;
            newPlayer.oGsPerGame = player.oGsPerGame;
            newPlayer.assistsPerGame = player.assistsPerGame;

            newPlayer.winrate = player.winrate;
            newPlayer.passPercentage = player.passPercentage
        } else {
            throw new Error('Such player is not found.');
        }
        return await repository.save(newPlayer);
    }

    public async deleteSingle(ruid: string, auth: string): Promise<void> {
        const repository: Repository<PlayerEntity> = getRepository(PlayerEntity);
        let player: PlayerEntity | undefined = await repository.findOne({ ruid: ruid, auth: auth });
        if (player === undefined) {
            throw new Error('Such player is not found.');
        } else {
            await repository.remove(player);
        }
    }
}