// from: https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Automation } from '../../src/models';
import { Database } from '../../src/application'
import { expect } from 'chai';
import Logger from '@tsemach/logger'
const logger = Logger.get('runner-test')

describe('Database API Test', async function() {
  let mongoServer: MongoMemoryServer;

  this.beforeAll(() => {
    Database.instance.disable()
  })
  
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  this.afterAll(() => {
    Database.instance.enable()
  })

  it('database.test.ts: test save automation', async () => {
    await Database.instance.connect()
    const testId = "7c9330ac-eada-4dd2-bebf-f1a10d23a000"

    const automation = new Automation({
      testId,
      test: "@SquadronLifeCycle",
      status: "schedule",
      parameters: { url: "https://someplace.com" },
    });

    automation.status = "success";

    await automation.validate();
    await automation.save();

    const document = await Automation.findOne({ testId })
    logger.info('document:', document)

    expect(document.testId).to.be.equal(document.testId)
    expect(document.parameters).deep.equal(document.parameters)
    expect(document.status).to.be.equal(document.status)

    await Database.instance.close()
  })
})
