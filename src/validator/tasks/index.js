const InvariantError = require('../../exceptions/InvariantError');
const { TaskPayloadSchema } = require('./schema');

// Mendefinisikan objek TasksValidator
const TasksValidator = {
  // Fungsi untuk memvalidasi payload tugas
  validateTaskPayload: (payload) => {
    const validationResult = TaskPayloadSchema.validate(payload);
    
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TasksValidator;
