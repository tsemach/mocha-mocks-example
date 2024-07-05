import express from 'express';
import bodyParser from 'body-parser';
import { Service, Middleware as Middlewares }  from '../types'
import Logger from "@tsemach/logger";
const logger = Logger.get('server')

export class Server {
  private static _instance: Server = new Server();
  private _server: any
  private _port: number

  public app: express.Application = express();  
    
  private constructor() {     
    const { NODE_ENV = "local" } = process.env;
    logger.info(`SERVER: env = ${NODE_ENV} _dirname=${__dirname + '/..'}`);
  }

  public static get instance() {
    return Server._instance || (Server._instance = new Server());    
  }
  
  private logger(req: express.Request, res: express.Response, next: express.NextFunction) {
    // logger.info("request:", JSON.stringify(req, undefined, 2));
    next()
  }

  public init(middlewares: Middlewares[] = []): void { 
    this.app.use(bodyParser.json())
    
    if (middlewares) {
      middlewares.forEach(middleware => this.use(middleware));
    }
  }

  use(middleware: express.Handler) {
    this.app.use(middleware);
  }

  middleware(where: string, middleware: express.Handler) {
    this.app.use(where, middleware);
  }  

  /**
   * Services are all to add their routes into express application
   *    
   * @param where - thed of which the service is route (regular express path)
   * @param service - a class which implement this route using the add method
   */
  route(where: string, service: Service) {
    logger.info("going to add service at: " + where);
    this.app.use(where, service.add(this.app));
  }

  listen(port: number, message = '') {
    message = message || `iot-am service is listening on port http://localhost:${port}/`

    this._port = port
    this._server = this.app.listen(port, () => {
      logger.info(message);
    });

    // for (let signal of ["SIGTERM", "SIGINT"])
    //   process.on(signal, () => {
    //     logger.info(`${signal} signal received.`);
    //     logger.info("Closing http server.");
    //     this._server.close((err) => {
    //         logger.info("Http server closed.");
    //         process.exit(err ? 1 : 0);
    //     });
    // });
  }

  close() {
    this._server.close((err: Error) => {
      logger.error("server closed on port err:", err);
    })
  }
  
}


