import mongoose from "mongoose";
import { Config } from "../config";
import Logger from "@tsemach/logger";
const logger = Logger.get("database");

export class Database {
    public static _instance: Database;
    private refCount = 0;
    private _enable = true;

    private constructor() {}

    public static get instance(): Database {
      return Database._instance || (Database._instance = new Database());
    }

    async connect() {
      if ( ! this._enable ) {
        logger.info('database is disable, abort')

        return
      }

      console.log("DATABASE CONNECT: refCount", this.refCount);
      this.refCount++;
      if (this.refCount > 1) {
        logger.info(`refCount is larger then zero, refCount: ${this.refCount}`);

        return;
      }

      try {        
        await mongoose.connect(Config.db.getConnectionURL(), {
          dbName: Config.db.getDBName(),          
          user: Config.db.USERNAME,          
          pass: Config.db.PASSWORD,
        });

        logger.info(`database connected at: ${Config.db.getConnectionURL()}`);
      } catch (e) {
        logger.error(
          `error: failed on connect to database, url: ${Config.db.getConnectionURL} params: ${{
            dbName: Config.db.getDBName(),
            user: Config.db.USERNAME,
            pass: '****************',
          }}`,
        );
        logger.error('error: failed on connect to database, e:', e);
      }
    }

    enable() {
      this._enable = true
    }

    async close() {
      if ( ! this._enable ) {
        logger.info('database is disable, abort')

        return
      }

      console.log("DATABASE CLOSE: refCount", this.refCount);
      this.refCount--;
      if (this.refCount === 0) {
        await mongoose.connection.close();
      }
    }

    disable() {
      this._enable = false
    }

}