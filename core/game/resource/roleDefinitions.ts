import { PlayerRole } from "../model/GameObject/PlayerObject";

const roles: PlayerRole[] = [
    {
        key: 'master',
        superadmin: true,
        timeoutMultiplier: 0.0
    },
    {
        key: 'cm',
        superadmin: true,
        timeoutMultiplier: 1.0
    },
    {
        key: 'head',
        superadmin: true,
        timeoutMultiplier: 1.0
    },
    {
        key: 'mod',
        superadmin: true,
        timeoutMultiplier: 1.0
    },
    {
        key: 'admin',
        superadmin: true,
        timeoutMultiplier: 1.0
    },
    {
        key: 'vip',
        superadmin: false,
        timeoutMultiplier: 0.5
    },
    {
        key: 'supervip',
        superadmin: false,
        timeoutMultiplier: 0.3
    },
    {
        key: 'player',
        superadmin: false,
        timeoutMultiplier: 1.0
    }
];

export function getRole(role: string): PlayerRole {
    window.gameRoom.logger.i("getRole: ", "getrole: " + role);

    var foundRole = roles.filter((r: PlayerRole) =>  r.key.toLowerCase().trim().includes(role.toLowerCase().trim()))[0];
    window.gameRoom.logger.i("getRole: ", "foundrole: " + foundRole.key);
    if (foundRole != undefined) {
        return foundRole;
    }
    return {
        key: 'player',
        superadmin: false,
        timeoutMultiplier: 1.0
    }
}