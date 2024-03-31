import Joi from 'joi';

export const playerModelSchema = Joi.object().keys({
    auth: Joi.string().required()
    ,conn: Joi.string().required()
    ,name: Joi.string().required()
    ,rating: Joi.number().required()
    ,totals: Joi.number().required()
    ,disconns: Joi.number().required()
    ,wins: Joi.number().required()
    ,loses: Joi.number().required()
    ,goals: Joi.number().required()
    ,assists: Joi.number().required()
    ,ogs: Joi.number().required()
    ,losePoints: Joi.number().required()
    ,balltouch: Joi.number().required()
    ,passed: Joi.number().required()
    ,mute: Joi.boolean().required()
    ,muteExpire: Joi.number().required()
    ,rejoinCount: Joi.number().required()
    ,superadmin: Joi.boolean().required()
    ,role: Joi.string().required()
    ,roleExpire: Joi.any()
    ,joinDate: Joi.number().required()
    ,leftDate: Joi.number().required()
    ,malActCount: Joi.number().required()
    ,gk: Joi.number().required()
    ,goalsAgainstGk: Joi.number().required()
    ,hatTricks: Joi.number().required()
    ,perfectGk: Joi.number().required()
    ,username: Joi.string().alphanum().min(3).max(30)
    ,password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    ,warningCount: Joi.number().required()
    ,goalsPlusAssistsPerGame: Joi.number().required()
    ,goalsPerGame: Joi.number().required()
    ,goalsAgainstPerGame: Joi.number().required()
    ,oGsPerGame: Joi.number().required()
    ,assistsPerGame: Joi.number().required()
    ,winrate: Joi.number().required()
    ,passPercentage: Joi.number().required()
});

export const banListModelSchema = Joi.object().keys({
    conn: Joi.string().required()
    ,reason: Joi.string().required()
    ,register: Joi.number().required()
    ,expire: Joi.number().required()
});

export const superAdminModelSchema = Joi.object().keys({
    key: Joi.string().required()
    ,description: Joi.string().required(),
    validDays: Joi.number().required(),
    singleUse: Joi.boolean().required()
});
