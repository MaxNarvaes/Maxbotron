import { cmdAbout } from "./about";
import { cmdAfk } from "./afk";
import { cmdBan } from "./ban";
import { cmdBb } from "./bb";
import { cmdFreeze } from "./freeze";
import { cmdGk } from "./gk";
import { cmdHc } from "./hc";
import { cmdHelp } from "./help";
import { cmdKsk } from "./ksk";
import { cmdList } from "./list";
import { cmdMeMide } from "./memide";
import { cmdMute } from "./mute";
import { cmdNotice } from "./notice";
import { cmdPoss } from "./poss";
import { cmdScout } from "./scout";
import { cmdShowStats, cmdStats } from "./stats";
import { cmdStatsReset } from "./statsreset";
import { cmdStreak } from "./streak";
import { cmdSuper } from "./super";
import { cmdTier } from "./tier";
import { cmdVote } from "./vote";

export const commandList = {
    ["about"]: cmdAbout,
    ["afk"]: cmdAfk,
    ["ban"]: cmdBan,
    ["bb"]: cmdBb,
    ["freeze"]: cmdFreeze,
    ["gk"]: cmdGk,
    ["hc"]: cmdHc,
    ["help"]: cmdHelp,
    ["ksk"]: cmdKsk,
    ["list"]: cmdList,
    ["memide"]: cmdMeMide,
    ["mute"]: cmdMute,
    ["notice"]: cmdNotice,
    ["poss"]: cmdPoss,
    ["scout"]: cmdScout,
    ["stats"]: cmdStats,
    ["showstats"]: cmdShowStats,
    ["statsreset"]: cmdStatsReset,
    ["streak"]: cmdStreak,
    ["super"]: cmdSuper,
    ["tier"]: cmdTier,
    ["vote"]: cmdVote,
}