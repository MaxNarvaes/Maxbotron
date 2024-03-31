import { SuperAdminResponse } from "../../lib/db.injection";
import { login } from "../../web/controller/api/v1/auth";
import { playerlistRouter } from "../../web/router/api/v1/playerlist";

export async function superAdminLogin(loginKey: string): Promise<SuperAdminResponse> { 
    // superadmin key validation function
    const loginResult: SuperAdminResponse | undefined =  await window._readSuperadminDB(window.gameRoom.config._RUID, loginKey);
    window.gameRoom.logger.i("superadminlogin", "login: " + loginResult);
    if(loginResult != undefined) {
        // if login is succeed, then 'description' string value will be returned.
        return loginResult; // return true if login is succeed.
    } else {
        return {
            role: "player",
            singleUse: false,
            validDays: 0
        }; // or return false.
    }
}