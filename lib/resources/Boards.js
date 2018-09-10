const AbstractResource = require('./AbstractResource');

class Boards extends AbstractResource {
  constructor(client) {
    super(client);
    this.path = 'boards';
  }

  watch(id, options = {}) {
    return this._put(`${this.path}/${id}/watch`, undefined, options);
  }
}

module.exports = Boards;
