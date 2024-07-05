import { ConfigENV } from "../types"
import { ConfigDatabase } from "./config-database"

export class Config {
    public static readonly env: ConfigENV = (process.env.ENV ?? 'local') as ConfigENV
    public static readonly listen = {
        port: +(process.env.PORT ?? 3000)
    }

    public static readonly db = new ConfigDatabase(this.env)
}