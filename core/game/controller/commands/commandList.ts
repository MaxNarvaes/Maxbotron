import { CmdAbout } from "./about";
import { CmdAfk } from "./afk";
import { CmdBan } from "./ban";
import { CmdBb } from "./bb";
import { CmdFreeze } from "./freeze";
import { CmdGk } from "./gk";
import { CmdHc } from "./hc";
import { CmdHelp } from "./help";
import { CmdKsk } from "./ksk";
import { CmdList } from "./list";
import { CmdMeMide } from "./memide";
import { CmdMute } from "./mute";
import { CmdNotice } from "./notice";
import { CmdPoss } from "./poss";
import { CmdScout } from "./scout";
import { CmdShowStats, CmdStats } from "./stats";
import { CmdStatsReset } from "./statsreset";
import { CmdSuper } from "./super";
import { CmdTier } from "./tier";
import { CmdVote } from "./vote";
import { CmdAdmin } from "./admin";
import { CmdClip } from "./clip";
import { CmdTeams } from "./teams";
import { CmdField } from "./field";
import { CmdLogin } from "./login";
import { CmdMix } from "./mix";
import { CmdWarn } from "./warn";
import { CmdRegister } from "./register";
import { CmdRestart } from "./restart";


export const commandList = {
    ["about"]: new CmdAbout(),
    ["afk"]: new CmdAfk(),
    ["ban"]: new CmdBan,
    ["bb"]: new CmdBb(),
    ["freeze"]: new CmdFreeze(),
    ["gk"]: new CmdGk(),
    ["hc"]: new CmdHc(),
    ["help"]: new CmdHelp(),
    ["ksk"]: new CmdKsk(),
    ["list"]: new CmdList(),
    ["memide"]: new CmdMeMide(),
    ["mute"]: new CmdMute(),
    ["noticias"]: new CmdNotice(),
    ["poss"]: new CmdPoss(),
    ["scout"]: new CmdScout(),
    ["stats"]: new CmdStats(),
    ["showstats"]: new CmdShowStats(),
    ["statsreset"]: new CmdStatsReset(),
    ["super"]: new CmdSuper(),
    ["elo"]: new CmdTier(),
    ["vote"]: new CmdVote(),
    ["admin"]: new CmdAdmin(),
    ["clip"]: new CmdClip(),
    ["teams"]: new CmdTeams(),
    ["cancha"]: new CmdField(),
    ["mix"]: new CmdMix(),
    ["login"]: new CmdLogin(),
    ["register"]: new CmdRegister(),
    ["tarjeta"]: new CmdWarn(),
    ["rr"]: new CmdRestart(),
}