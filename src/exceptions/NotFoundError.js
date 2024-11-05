const ClientError = require('./ClientError');

// Mendefinisikan kelas NotFoundError yang merupakan turunan dari ClientError
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError'; 
  }
}

module.exports = NotFoundError;