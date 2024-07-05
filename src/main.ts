import Logger from '@tsemach/logger';
import { Application } from './application'
const logger = Logger.get('main')

import './runner/runner.controller';

export default async function main(port = -1, with_start = false) { 
  logger.info("ENV:", process.env)
  
  try {        
    await Application.instance.init()    
    logger.info('application init:')

    if ( with_start ) {
      Application.instance.start(port)       
    }       
  }
  catch (e) {
    logger.error("ERROR: unable to initialize application, e:", e.stack)
  }
}
