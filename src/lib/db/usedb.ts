import { USE_MYSQL } from "$env/static/private";

export const isMongo = (USE_MYSQL != "true")
