import { getRepository, Repository } from 'typeorm';
import { SuperAdminEntity } from '../entity/superadmin.entity';
import { SuperAdminModel } from '../model/SuperAdminModel';
import { IRepository } from './repository.interface';

export class SuperAdminRepository implements IRepository<SuperAdminEntity> {
    public async findAll(ruid: string, pagination?: {start: number, count: number}): Promise<SuperAdminEntity[]> {
        const repository: Repository<SuperAdminEntity> = getRepository(SuperAdminEntity);
        let superlist: SuperAdminEntity[] = [];
        if(pagination) {
            superlist = await repository.find({where: {ruid: ruid}, skip: pagination.start, take: pagination.count});
        } else {
            superlist = await repository.find({ ruid: ruid });
        }
        if (superlist.length === 0) throw new Error('There are no registered superadmin keys.');
        return superlist;
    }

    public async findSingle(ruid: string, key: string): Promise<SuperAdminEntity | undefined> {
        const repository: Repository<SuperAdminEntity> = getRepository(SuperAdminEntity);
        let superadmin: SuperAdminEntity | undefined = await repository.findOne({ ruid: ruid, key: key});
        if (superadmin === undefined) throw new Error('Such superadmin is not registered.');
        return superadmin;
    }

    public async addSingle(ruid: string, superadmin: SuperAdminModel): Promise<SuperAdminEntity> {
        const repository: Repository<SuperAdminEntity> = getRepository(SuperAdminEntity);
        let newSuperadmin: SuperAdminEntity | undefined = await repository.findOne({ ruid: ruid, key: superadmin.key });
        if (newSuperadmin === undefined) {
            newSuperadmin = new SuperAdminEntity();
            newSuperadmin.ruid = ruid;
            newSuperadmin.key = superadmin.key;
            newSuperadmin.description = superadmin.description;
            newSuperadmin.singleUse = superadmin.singleUse;
            newSuperadmin.validDays = superadmin.validDays;
        } else {
            throw new Error('Such superadmin is already registered.');
        }
        return await repository.save(newSuperadmin);
    }

    public async updateSingle(ruid: string, key: string, superadmin: SuperAdminModel): Promise<SuperAdminEntity> {
        const repository: Repository<SuperAdminEntity> = getRepository(SuperAdminEntity);
        let newSuperadmin: SuperAdminEntity | undefined = await repository.findOne({ ruid: ruid, key: key });
        if (newSuperadmin !== undefined) {
            newSuperadmin.ruid = ruid;
            newSuperadmin.key = superadmin.key;
            newSuperadmin.description = superadmin.description;
            newSuperadmin.singleUse = superadmin.singleUse;
            newSuperadmin.validDays = superadmin.validDays;
        } else {
            throw new Error('Such player is not registered yet.');
        }
        return await repository.save(newSuperadmin);
    }

    public async deleteSingle(ruid: string, key: string): Promise<void> {
        const repository: Repository<SuperAdminEntity> = getRepository(SuperAdminEntity);
        let superadmin: SuperAdminEntity | undefined = await repository.findOne({ ruid: ruid, key: key });
        if (superadmin === undefined) {
            throw new Error('Such player is not registered yet.');
        } else {
            await repository.remove(superadmin);
        }
    }
}
