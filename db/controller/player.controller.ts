import { Context } from "koa";
import { IRepository } from '../repository/repository.interface';
import { PlayerEntity } from '../entity/player.entity';
import { PlayerModel } from '../model/PlayerModel';
import { playerModelSchema } from "../model/Validator";
import { PlayerRepository } from "../repository/player.repository";
import { winstonLogger } from "../utility/winstonLoggerSystem";

export class PlayerController {
    private readonly _repository: PlayerRepository;

    constructor(repository: PlayerRepository) {
        this._repository = repository;
    }

    public async getAllPlayers(ctx: Context) {
        const { ruid } = ctx.params;
        const { start, count } = ctx.request.query;

        if (start && count) {
            return this._repository
                .findAll(ruid, { start: parseInt(<string>start), count: parseInt(<string>count) })
                .then((players) => {
                    ctx.status = 200;
                    ctx.body = players;
                })
                .catch((error) => {
                    ctx.status = 404;
                    winstonLogger.error('error.message');
                    ctx.body = { error: error.message };
                });
        } else {
            return this._repository
                .findAll(ruid)
                .then((players) => {
                    ctx.status = 200;
                    ctx.body = players;
                })
                .catch((error) => {
                    ctx.status = 404;
                    winstonLogger.error('error.message');
                    ctx.body = { error: error.message };
                });
        }
    }

    public async getTopPlayers(ctx: Context) {
        const { ruid } = ctx.params;
        const { start, count } = ctx.request.query;

        if (start && count) {
            return this._repository
                .findAll(ruid, { start: parseInt(<string>start), count: parseInt(<string>count) })
                .then((players) => {
                    ctx.status = 200;
                    ctx.body = players;
                })
                .catch((error) => {
                    ctx.status = 404;
                    winstonLogger.error('error.message')
                    ctx.body = { error: error.message };
                });
        } else {
            return this._repository
                .findAll(ruid)
                .then((players) => {
                    ctx.status = 200;
                    ctx.body = players;
                })
                .catch((error) => {
                    ctx.status = 404;
                    winstonLogger.error('error.message')
                    ctx.body = { error: error.message };
                });
        }
    }

    public async getPlayerRank(ctx: Context) {
        const { ruid } = ctx.params;
        const { start, count } = ctx.request.query;

        if (start && count) {
            return this._repository
                .findAll(ruid, { start: parseInt(<string>start), count: parseInt(<string>count) })
                .then((players) => {
                    ctx.status = 200;
                    ctx.body = players;
                })
                .catch((error) => {
                    ctx.status = 404;
                    winstonLogger.error('error.message')
                    ctx.body = { error: error.message };
                });
        } else {
            return this._repository
                .findAll(ruid)
                .then((players) => {
                    ctx.status = 200;
                    ctx.body = players;
                })
                .catch((error) => {
                    ctx.status = 404;
                    winstonLogger.error('error.message')
                    ctx.body = { error: error.message };
                });
        }
    }

    public async getPlayerByUsername(ctx: Context) {
        const { ruid, username } = ctx.params;

        return this._repository
            .findSingleByUsername(ruid, username)
            .then((player) => {
                ctx.status = 200;
                ctx.body = player;
            })
            .catch((error) => {
                ctx.status = 404;
                winstonLogger.error('error.message')
                ctx.body = { error: error.message };
            });
    }

    public async getPlayer(ctx: Context) {
        const { ruid, auth } = ctx.params;

        return this._repository
            .findSingle(ruid, auth)
            .then((player) => {
                ctx.status = 200;
                ctx.body = player;
            })
            .catch((error) => {
                ctx.status = 404;
                winstonLogger.error('error.message');
                ctx.body = { error: error.message };
            });
    }

    public async addPlayer(ctx: Context) {
        /* const validationResult = playerModelSchema.validate(ctx.request.body);

        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = validationResult.error;
            winstonLogger.error(validationResult.error.message);
            return;
        } */

        const { ruid } = ctx.params;
        const playerModel: PlayerModel = ctx.request.body as PlayerModel;

        return this._repository
            .addSingle(ruid, playerModel)
            .then((player) => {
                ctx.status = 204;
                ctx.body = player;
            })
            .catch((error) => {
                ctx.status = 400;
                winstonLogger.error('error.message');
                ctx.body = { error: error.message };
            });
    }

    public async updatePlayer(ctx: Context) {
/*         const validationResult = playerModelSchema.validate(ctx.request.body);

        if (validationResult.error) {
            ctx.status = 400;
            winstonLogger.error(validationResult.error.message);
            ctx.body = validationResult.error;
            return;
        } */

        const { ruid, auth } = ctx.params;
        const playerModel: PlayerModel = ctx.request.body as PlayerModel;

        return this._repository
            .updateSingle(ruid, auth, playerModel)
            .then((player) => {
                ctx.status = 204;
                ctx.body = player;
            })
            .catch((error) => {
                ctx.status = 404;
                winstonLogger.error('error.message');
                ctx.body = { error: error.message };
            });
    }

    public async deletePlayer(ctx: Context) {
        const { ruid, auth } = ctx.params;

        return this._repository
            .deleteSingle(ruid, auth)
            .then(() => {
                ctx.status = 204;
            })
            .catch((error) => {
                ctx.status = 404;
                winstonLogger.error('error.message');
                ctx.body = { error: error.message };
            });
    }
}