const { expect } = require('chai');
const runAsync = require('../');

describe('reactor-runasync', () => {
  let doneCalled = false;
  let loggerCalled = false;

  before(() => {
    global.logger = {
      error: () => {
        loggerCalled = true;
      },
    };
    global.done = () => {
      doneCalled = true;
    };
  });

  beforeEach(() => {
    loggerCalled = false;
    doneCalled = false;
  });

  it('should export the function', () => {
    expect(runAsync).to.be.a('function');
  });

  it('should call done() after an async function', async () => {
    const f = async () => {};
    await runAsync(f);

    expect(doneCalled).to.equal(true);
  });

  it('should call logger.error() for Errors thrown', async () => {
    const badF = async () => {
      throw new Error('oh no');
    };
    await runAsync(badF);

    expect(loggerCalled).to.equal(true);
    expect(doneCalled).to.equal(true);
  });

  it('should call logger.error() for EVRYTHNG errors thrown', async () => {
    const badF = async () => {
      throw { errors: ['oh no!'] };
    };
    await runAsync(badF);

    expect(loggerCalled).to.equal(true);
    expect(doneCalled).to.equal(true);
  });
});
