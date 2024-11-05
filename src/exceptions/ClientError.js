// Mendefinisikan kelas ClientError yang merupakan turunan dari kelas Error
class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message); 
    this.statusCode = statusCode; 
    this.name = 'ClientError'; 
  }
}

module.exports = ClientError;
