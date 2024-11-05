const ClientError = require('./ClientError');

// Mendefinisikan kelas InvariantError yang merupakan turunan dari ClientError
class InvariantError extends ClientError {
  constructor(message) {
    super(message); 
    this.name = 'InvariantError'; 
  }
}

module.exports = InvariantError;
