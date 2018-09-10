const chai = require('chai');

const { expect } = chai;
const Droplr = require('../../index');

describe('Users', () => {
  let client;

  beforeEach(() => {
    client = new Droplr.Client();
  });

  it('should go over full flow', async () => {
    const userData = {
      email: `test-${new Date().getTime()}@test.com`,
      password: 'dummy-dummy-dummy',
    };

    const user = await client.users.create(userData);
    expect(user).to.have.property('id');
  });
});
