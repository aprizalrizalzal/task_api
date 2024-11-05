const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const mysql = require('mysql');

class TasksService {
  constructor() {
    // Membuat koneksi pool ke database MySQL untuk efisiensi dalam menangani koneksi berganda
    this._pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

   // Fungsi untuk menambahkan tugas baru ke database
  async addTask({ title, description, due_date, status }) {
    const id = nanoid(16);

    const query = `
      INSERT INTO tasks (id, title, description, due_date, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    return new Promise((resolve, reject) => {
      this._pool.query(query, [id, title, description, due_date, status], (error, results) => {
        if (error) {
          return reject(new InvariantError('Tugas gagal ditambahkan'));
        }
  
        if (results.affectedRows === 0) {
          return reject(new InvariantError('Gagal menambahkan tugas'));
        }
  
        resolve(id);
      });
    });
  }

  // Fungsi untuk mengambil tugas berdasarkan status dan due_date
  async getTasks({ status, due_date } = {}) {
    let query = `
      SELECT * FROM tasks
    `;
    const queryParams = [];
    const conditions = [];
  
    if (status) {
      conditions.push(`status = ?`);
      queryParams.push(status);
    }
  
    if (due_date) {
      conditions.push(`due_date = ?`);
      queryParams.push(due_date);
    }
  
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }
  
    return new Promise((resolve, reject) => {
      this._pool.query(query, queryParams, (error, results) => {
        if (error) {
          return reject(new InvariantError('Tugas gagal ditemukan'));
        }
  
        if (results.length === 0) {
          return reject(new NotFoundError('Tugas tidak ditemukan'));
        }
  
        resolve(results);
      });
    });
  }

  // Fungsi untuk mengambil tugas berdasarkan ID
  async getTasksById(taskId) {
    const query = `
      SELECT * FROM tasks WHERE id = ?
    `;
  
    return new Promise((resolve, reject) => {
      this._pool.query(query, [taskId], (error, results) => {
        if (error) {
          return reject(new InvariantError('Tugas gagal ditemukan'));
        }
  
        if (results.length === 0) {
          return reject(new NotFoundError('Tugas tidak ditemukan'));
        }
  
        const task = results[0];
        resolve({
          id: task.id,
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          status: task.status,
          created_at: task.created_at,
          updated_at: task.updated_at,
        });
      });
    });
  }

  // Fungsi untuk memperbarui tugas berdasarkan ID
  async editTaskById(taskId, { title, description, due_date, status }) {
    const query = `
      UPDATE tasks
      SET title = ?, description = ?, due_date = ?, status = ?
      WHERE id = ?
    `;
  
    return new Promise((resolve, reject) => {
      this._pool.query(query, [title, description, due_date, status, taskId], (error, results) => {
        if (error) {
          return reject(new InvariantError('Tugas gagal diperbarui'));
        }
  
        if (results.affectedRows === 0) {
          return reject(new NotFoundError('Gagal memperbarui tugas. Id tidak ditemukan'));
        }
  
        resolve({
            id: taskId,
            title,
            description,
            due_date,
            status
        });
      });
    });
  }

  // Fungsi untuk menghapus tugas berdasarkan ID
  async deleteTaskById(taskId) {
    const query = `
      DELETE FROM tasks WHERE id = ?
    `;
  
    return new Promise((resolve, reject) => {
      this._pool.query(query, [taskId], (error, results) => {
        if (error) {
          return reject(new InvariantError('Tugas gagal ditemukan'));
        }
  
        if (results.affectedRows === 0) {
          return reject(new NotFoundError('Tugas gagal dihapus. ID tidak ditemukan'));
        }
  
        resolve(results);
      });
    });
  }
}

module.exports = TasksService;