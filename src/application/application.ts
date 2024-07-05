import { getLogger } from 'log4js';
import { Server } from './server'
import { Config } from '../config'
const logger = getLogger('application')   

export class Application {
  private static _instance: Application;    
  private _isInit = false

  private constructor() {     
  }

  public static get instance(): Application {
    return Application._instance || (Application._instance = new Application());    
  }
     
  start(port?: number) {
    console.log(Config.listen.port)

    port = (port && port > 0) ? port : Config.listen.port
    logger.info('aws proxy going to listen on:' + port + '!');
    
    Server.instance.listen(port, `aws proxy going is listening on port: ${port} + '!'`)
  }

  async init() {
    if (this._isInit) {
      return 
    }
       
    this._isInit = true
  }

  get initStatus() {
    return this._isInit
  }

}
