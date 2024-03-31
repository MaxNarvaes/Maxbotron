import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { BanEntity } from '../entity/banlist.entity';
import { BanListModel } from '../model/BanListModel';

export class BanListRepository implements IRepository<BanEntity> {
    public async findAll(ruid: string, pagination?: {start: number, count: number}): Promise<BanEntity[]> {
        const repository: Repository<BanEntity> = getRepository(BanEntity);
        let banlist: BanEntity[] = [];
        if(pagination) {
            banlist = await repository.find({where: {ruid: ruid}, skip: pagination.start, take: pagination.count});
        } else {
            banlist = await repository.find({ ruid: ruid });
        }
        if (banlist.length === 0) throw new Error('There are no banned players.');
        return banlist;
    }

    public async findSingle(ruid: string, conn: string): Promise<BanEntity | undefined> {
        const repository: Repository<BanEntity> = getRepository(BanEntity);
        let banPlayer: BanEntity | undefined = await repository.findOne({ ruid: ruid, conn: conn });
        if (banPlayer === undefined) throw new Error('Such player is not banned.');
        return banPlayer;
    }

    public async addSingle(ruid: string, banlist: BanListModel): Promise<BanEntity> {
        const repository: Repository<BanEntity> = getRepository(BanEntity);
        let newBan: BanEntity | undefined = await repository.findOne({ ruid: ruid, conn: banlist.conn });
        if (newBan === undefined) {
            newBan = new BanEntity();
            newBan.ruid = ruid;
            newBan.conn = banlist.conn;
            newBan.reason = banlist.reason;
            newBan.register = banlist.register;
            newBan.expire = banlist.expire;
        } else {
            throw new Error('Such player is already banned.');
        }
        return await repository.save(newBan);
    }

    public async updateSingle(ruid: string, conn: string, banlist: BanListModel): Promise<BanEntity> {
        const repository: Repository<BanEntity> = getRepository(BanEntity);
        let newBan: BanEntity | undefined = await repository.findOne({ ruid: ruid, conn: conn });
        if (newBan !== undefined) {
            newBan.ruid = ruid;
            newBan.conn = banlist.conn;
            newBan.reason = banlist.reason;
            newBan.register = banlist.register;
            newBan.expire = banlist.expire;
        } else {
            throw new Error('Such player is not banned yet.');
        }
        return await repository.save(newBan);
    }

    public async deleteSingle(ruid: string, conn: string): Promise<void> {
        const repository: Repository<BanEntity> = getRepository(BanEntity);
        let banPlayer: BanEntity | undefined = await repository.findOne({ ruid: ruid, conn: conn });
        if (banPlayer === undefined) {
            throw new Error('Such player is not banned yet.');
        } else {
            await repository.remove(banPlayer);
        }
    }
}
