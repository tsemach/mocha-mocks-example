import express from 'express';
import { Server } from '../application'
import { RunnerService } from './runner-service'
import { Controller } from '../types';
import Logger from "@tsemach/logger";
const logger = Logger.get('runner-controller')

class RunnerController implements Controller {

  constructor() {    
    Server.instance.route('/', this);
  }

  public add(): express.Router {
    let router = express.Router();
                    
    router.get(['/health', '/liveness', '/readines'], async (req: express.Request, res: express.Response) => {      
      res.json({ status: 'ok', path: req.path})
    })       

    router.post('/v1/run', async (req: express.Request, res: express.Response) => {
      logger.info(`RunnerController:[POST] /v1/run`);
  
      const status =  await new RunnerService().run()
      res
        .status(status)
        .json({
          status: (status === 200) ? 'ok' : 'failed',
        });
    });
  
    return router;    
  }

}

export default new RunnerController();


