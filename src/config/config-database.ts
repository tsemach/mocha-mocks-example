import { ConfigENV } from "../types";

export class ConfigDatabase {
    public readonly PROTOCOL = process.env.DATABASE_PROTOCOL ?? "mongodb";
    public readonly HOST = process.env.DATABASE_HOST ?? "localhost";
    public readonly PORT = +(process.env.DATABASE_PORT ?? 27017);
    public readonly DB_NAME = process.env.DATABASE_DB_NAME = 'elementor';
    public readonly USERNAME = process.env.DATABASE_USERNAME;
    public readonly PASSWORD = process.env.DATABASE_PASSWORD;

    constructor(private _env: ConfigENV) {
        this._env = _env;
    }

    getConnectionURL() {
        return `${this.PROTOCOL}://${this.HOST}:${this.PORT}/`;
    }

    getDBName() {
        if (this.env === "local") {
            return "elementor";
        }

        return this.DB_NAME;
    }

    get env() {
        return this._env;
    }
}