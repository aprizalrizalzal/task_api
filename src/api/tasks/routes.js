const routes = (handler) => [
    // Rute untuk menambahkan tugas baru
    {
      method: 'POST',
      path: '/tasks', 
      handler: handler.postTaskHandler,
    },

    // Rute untuk mendapatkan daftar semua tugas
    {
      method: 'GET',
      path: '/tasks', 
      handler: handler.getTasksHandler,
    },

    // Rute untuk mendapatkan tugas berdasarkan ID
    {
      method: 'GET',
      path: '/tasks/{id}',  
      handler: handler.getTasksByIdHandler,
    },

    // Rute untuk memperbarui tugas berdasarkan ID
    {
      method: 'PUT',
      path: '/tasks/{id}',
      handler: handler.putTaskByIdHandler,
    },

    // Rute untuk menghapus tugas berdasarkan ID
    {
      method: 'DELETE',
      path: '/tasks/{id}', 
      handler: handler.deleteTaskByIdHandler,
    },
  ];
  
  module.exports = routes;
  