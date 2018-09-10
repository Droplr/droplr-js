const AbstractResource = require('./AbstractResource');

class Teams extends AbstractResource {
  constructor(client) {
    super(client);
    this.path = 'teams';
  }
}

module.exports = Teams;
