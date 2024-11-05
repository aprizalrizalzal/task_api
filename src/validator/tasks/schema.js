const Joi = require('joi');

// Mendefinisikan skema validasi untuk payload tugas
const TaskPayloadSchema = Joi.object({
  title: Joi.string().required(), 
  description: Joi.string().required(), 
  due_date: Joi.date().iso().required(), 
  status: Joi.string().valid('in progress', 'pending', 'complete').required() 
});

module.exports = { TaskPayloadSchema };
