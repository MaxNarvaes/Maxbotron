import { PlayerRole } from "../model/GameObject/PlayerObject";
import * as LangRes from "../resource/strings";

const roles: PlayerRole[] = [
    {
        key: 'player',
        superadmin: false,
        timeoutMultiplier: 1.0,
        label: "",
        color: 0x8F8F8F,
        style: 'normal'
    },
    {
        key: 'master',
        superadmin: true,
        timeoutMultiplier: 0.0,
        label: "𝐌𝐀𝐍𝐀𝐆𝐄𝐑",
        color: 0x00FF00,
        style: 'bold'
    },
    {
        key: 'head',
        superadmin: true,
        timeoutMultiplier: 0.5,
        label: "𝐉𝐄𝐅𝐄-𝐀𝐃𝐌𝐈𝐍",
        color: 0xEAC274,
        style: 'bold'
    },
    {
        key: 'cm',
        superadmin: true,
        timeoutMultiplier: 0.5,
        label: "𝐂-𝐌𝐀𝐍𝐀𝐆𝐄𝐑",
        color: 0xFF9100,
        style: 'bold'
    },
    {
        key: 'admin',
        superadmin: true,
        timeoutMultiplier: 1.0,
        label: "𝐀𝐃𝐌",
        color: 0xFFFF00,
        style: 'normal'
    },
    {
        key: 'mod',
        superadmin: true,
        timeoutMultiplier: 1.0,
        label: "𝐌𝐎𝐃",
        color: 0x6BFFB5,
        style: 'normal'
    },
    {
        key: 'vip',
        superadmin: false,
        timeoutMultiplier: 0.5,
        label: "💎 𝐕𝐈𝐏",
        color: 0x3DA7FF,
        style: 'normal'
    },
    {
        key: 'supervip',
        superadmin: false,
        timeoutMultiplier: 0.3,
        label: "👑 𝐕𝐈𝐏-𝐒𝐔𝐏𝐑𝐄𝐌𝐎",
        color: 0xd733ff,
        style: 'normal'
    },
    {
        key: 'visitor',
        superadmin: false,
        timeoutMultiplier: 1.5,
        label: "VISITANTE",
        color: LangRes.style.colors.Gray,
        style: 'normal'
    }
];

export function getRole(role: String): PlayerRole {
    window.gameRoom.logger.i("getRole: ", "getrole: " + role);

    var foundRole = roles.filter((r: PlayerRole) =>  r.key.toLowerCase().trim().includes(role.toLowerCase().trim()))[0];
    window.gameRoom.logger.i("getRole: ", "foundrole: " + foundRole.key);
    if (foundRole != undefined) {
        return foundRole;
    }
    return roles[0];
}