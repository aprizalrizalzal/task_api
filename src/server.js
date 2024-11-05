require('dotenv').config();

const Hapi = require('@hapi/hapi');
const tasks = require('./api/tasks');
const TasksService = require('./service/task/TasksService');
const TasksValidator = require('./validator/tasks');
const ClientError = require('./exceptions/ClientError');

// Fungsi untuk menginisialisasi server Hapi
const init = async () => {
  const tasksService = new TasksService(); 
  
  const server = Hapi.server({
    port: process.env.PORT, 
    host: process.env.HOST, 
    routes: {
      cors: {
        origin: ['*'], 
      },
    },
  });

  // Mendaftarkan plugin API tasks ke server
  await server.register({
    plugin: tasks,
    options: {
      service: tasksService,
      validator: TasksValidator,
    },
  });

  // Menambahkan ekstensi untuk menangani respons sebelum dikirim ke klien
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message, 
      });
      newResponse.code(response.statusCode); 
      return newResponse; 
    }

    return h.continue; 
  });

  // Memulai server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`); 
};

init();
