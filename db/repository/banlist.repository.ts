import { getRepository, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { BanList } from '../entity/banlist.entity';
import { BanListModel } from '../model/BanListModel';

export class BanListRepository implements IRepository<BanList> {
    public async findAll(ruid: string, pagination?: {start: number, count: number}): Promise<BanList[]> {
        const repository: Repository<BanList> = getRepository(BanList);
        let banlist: BanList[] = [];
        if(pagination) {
            banlist = await repository.find({where: {ruid: ruid}, skip: pagination.start, take: pagination.count});
        } else {
            banlist = await repository.find({ ruid: ruid });
        }
        if (banlist.length === 0) throw new Error('No hay jugadores prohibidos.');
        return banlist;
    }

    public async findSingle(ruid: string, conn: string): Promise<BanList | undefined> {
        const repository: Repository<BanList> = getRepository(BanList);
        let banPlayer: BanList | undefined = await repository.findOne({ ruid: ruid, conn: conn });
        if (banPlayer === undefined) throw new Error('Ese jugador no está prohibido.');
        return banPlayer;
    }

    public async addSingle(ruid: string, banlist: BanListModel): Promise<BanList> {
        const repository: Repository<BanList> = getRepository(BanList);
        let newBan: BanList | undefined = await repository.findOne({ ruid: ruid, conn: banlist.conn });
        if (newBan === undefined) {
            newBan = new BanList();
            newBan.ruid = ruid;
            newBan.conn = banlist.conn;
            newBan.reason = banlist.reason;
            newBan.register = banlist.register;
            newBan.expire = banlist.expire;
        } else {
            throw new Error('Tal jugador ya está prohibido.');
        }
        return await repository.save(newBan);
    }

    public async updateSingle(ruid: string, conn: string, banlist: BanListModel): Promise<BanList> {
        const repository: Repository<BanList> = getRepository(BanList);
        let newBan: BanList | undefined = await repository.findOne({ ruid: ruid, conn: conn });
        if (newBan !== undefined) {
            newBan.ruid = ruid;
            newBan.conn = banlist.conn;
            newBan.reason = banlist.reason;
            newBan.register = banlist.register;
            newBan.expire = banlist.expire;
        } else {
            throw new Error('Tal jugador aún no está prohibido.');
        }
        return await repository.save(newBan);
    }

    public async deleteSingle(ruid: string, conn: string): Promise<void> {
        const repository: Repository<BanList> = getRepository(BanList);
        let banPlayer: BanList | undefined = await repository.findOne({ ruid: ruid, conn: conn });
        if (banPlayer === undefined) {
            throw new Error('Tal jugador aún no está prohibido.');
        } else {
            await repository.remove(banPlayer);
        }
    }
}
