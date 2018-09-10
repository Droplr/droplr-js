const chai = require('chai');

const { expect } = chai;
const Droplr = require('../../index');

describe('RootRedirect', () => {
  let client;

  beforeEach(() => {
    client = new Droplr.Client();
  });

  it('should go over full flow', async () => {
    try {
      await client.rootRedirect.get({
        domain: `foo-bar-baz-${new Date().getTime()}.net`,
      });
      throw new Error('Should fail');
    } catch (error) {
      expect(error).includes({
        code: 'ReadTeam.NoSuchTeam',
        statusCode: 404,
      });
    }
  });
});
