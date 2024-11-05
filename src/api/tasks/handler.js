class TasksHandler {
    // Konstruktor untuk TasksHandler
    constructor(service, validator) {
      this._service = service; 
      this._validator = validator; 
  
      // Mengikat metode handler ke konteks kelas ini
      this.postTaskHandler = this.postTaskHandler.bind(this);
      this.getTasksHandler = this.getTasksHandler.bind(this);
      this.getTasksByIdHandler = this.getTasksByIdHandler.bind(this);
      this.putTaskByIdHandler = this.putTaskByIdHandler.bind(this);
      this.deleteTaskByIdHandler = this.deleteTaskByIdHandler.bind(this);
    }
  
    // Handler untuk menangani permintaan POST untuk menambahkan tugas
    async postTaskHandler(request, h) {
      this._validator.validateTaskPayload(request.payload);
      const taskId = await this._service.addTask(request.payload);
      const response = h.response({
        status: 'success',
        message: 'Tugas berhasil ditambahkan',
        data: {
          id: taskId
        }
      });
      response.code(201);
      return response; 
    }
  
    // Handler untuk menangani permintaan GET untuk mendapatkan semua tugas
    async getTasksHandler(request, h) {
      const { status, due_date } = request.query;
      const tasks = await this._service.getTasks({ status, due_date });
      const response = h.response({
        status: 'success',
        data: {
          tasks
        }
      });
      response.code(200); 
      return response; 
    }
  
    // Handler untuk menangani permintaan GET untuk mendapatkan tugas berdasarkan ID
    async getTasksByIdHandler(request, h) {
      const { id } = request.params;
      const task = await this._service.getTasksById(id); 
      const response = h.response({
        status: 'success', 
        data: {
          task
        }
      });
      response.code(200); 
      return response; 
      
    }
  
    // Handler untuk menangani permintaan PUT untuk memperbarui tugas berdasarkan ID
    async putTaskByIdHandler(request, h) {
      this._validator.validateTaskPayload(request.payload);
      const { id } = request.params; 
      const task = await this._service.editTaskById(id, request.payload);
      const response = h.response({
        status: 'success', 
        message: 'Tugas berhasil diperbarui', 
        data: {
          task
        }
      });
      response.code(200); 
      return response; 
    }
  
    // Handler untuk menangani permintaan DELETE untuk menghapus tugas berdasarkan ID
    async deleteTaskByIdHandler(request, h) {
      const { id } = request.params; 
      await this._service.deleteTaskById(id); 
  
      const response = h.response({
        status: 'success', 
        message: 'Tugas berhasil dihapus',
      });
      response.code(200); 
      return response;
    }
  }
  
  module.exports = TasksHandler;
  