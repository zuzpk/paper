import packageJson from "../package.json"
import { type IDBOptions } from "@zuzjs/ui"

export const APP_NAME = "Zuz"
export const APP_TAGLINE = "ZuzJS Frontend"
export const APP_DESCRIPTION = "Nextjs Boilerplate"
export const APP_URL = "http://cms.zuz.com.pk/"
export const API_URL = "http://localhost:3001/@/"
export const APP_VERSION = packageJson.version
export const SESS_ID = `ui`
export const GA_MEASUREMENT_ID = "__";
export const ADMIN_EMAIL = `hello@zuz.com.pk`;

export const REDIRECT_AFTER_OAUTH = `/`;

export const LocalDB = {
    you: <IDBOptions>{
        name: APP_NAME.toLowerCase(),
        version: APP_VERSION,
        meta: [
            {
                name: `you`,
                config: { keyPath: "ID", autoIncrement: false },
                schema: [
                    { name: "ID", unique: true },
                    { name: "utp" },
                    { name: "name" },
                    { name: "email" },
                    { name: "cc" },
                    { name: "status" },
                ],
            },
        ]
    }
}