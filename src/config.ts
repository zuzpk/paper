import packageJson from "../package.json";
export const APP_NAME = "Zuz";
export const APP_DESCRIPTION = "Nextjs Boilerplate";
export const APP_URL = "http://cms.zuz.com.pk/"
export const API_URL = "http://localhost:3001/@/"
export const APP_VERSION = packageJson.version;
export const SESS_KEYS = ['ui','ut','si','fp'];
export const SESS_PREFIX = `__`;
export const GA_MEASUREMENT_ID = "__";
export const ADMIN_EMAIL = `hello@zuz.com.pk`;

export const REDIRECT_AFTER_OAUTH = `/`;