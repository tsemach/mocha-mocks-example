import Logger from "@tsemach/logger";
import { spec } from "pactum";
const logger = Logger.get('runner-service');

export class RunnerService {    
    
  constructor() {    
  }    
  
  public async run() {
    logger.info('runner-service is called')
        
    const reply = await spec()
      .post('http://localhost:5001/v2/resources/squadron/pool')
      .withHeaders('Content-Type', 'application/json')
      .withJson({ "template_name": "squadron74" })
      .expectStatus(200)

    logger.info('reply:', reply.body)
    return 200
  }
}