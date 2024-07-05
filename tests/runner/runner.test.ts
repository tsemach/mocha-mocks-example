import '../../src/runner/runner.controller'
import request from 'supertest';
import nock from "nock";
import { Server } from '../../src/application';
import squadron74CreateReply from './squaron74-create-reply.json'
import squadron81CreateReply from './squaron81-create-reply.json'

import Logger from '@tsemach/logger'
const logger = Logger.get('runner-test')

describe('Runner API Test', async function() {

  it('runner.test.ts: test health api', async () => {
    const reply = await request(Server.instance.app)
      .get('/health')
      .expect(200)

    logger.info('reply:', reply.body)
  })

  it('runner.test.ts: test runner service call', async () => {
    const scope = nock('http://localhost:5001')
      .post('/v2/resources/squadron/pool')
      .reply(200, squadron74CreateReply)


    const reply = await request(Server.instance.app)
      .post('/v1/run')
      .send({ test: '@SomeTest'})
      .expect(200)

    logger.info('reply:', reply.body)
  })
})
