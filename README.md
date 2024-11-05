# Task Management API

Task Management API, dibuat menggunakan Node.js dan menggunakan MySQL sebagai database.

## Persyaratan

- [Node.js](https://nodejs.org/) - Versi 20.17.0
- [XAMPP](https://www.apachefriends.org/download.html) - Versi 8.2.12 (dengan PHP 8.2.12) untuk menjalankan database MySQL
- [Visual Studio Code](https://code.visualstudio.com/) - Untuk mengedit dan menjalankan proyek
- [Postman](https://www.postman.com/) - Untuk pengujian endpoint API

## Instalasi dan Konfigurasi

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/aprizalrizalzal/task_api.git 
   cd task_api
   ```
    
2. **Instal dependensi:**
   
   Perintah untuk menginstal dependensi.
   ```bash
   npm install
   ```
3. **Instal devDependencies:**
   
   Menggunakan nodemon sebagai devDependency untuk proses pengembangan.
   ```bash
   npm install --save-dev
   ```
4. **Konfigurasi environment variable:**
   
   Buat file .env di root folder seperti di bawah ini:
   ```bash
   # server configuration
   HOST=localhost
   PORT=3000
   
   # MySQL configuration
   DB_HOST=localhost
   DB_USER=root
   DB_DATABASE=api_test
   DB_PASSWORD=

5. **Menjalankan migration**
   
   Perintah untuk mengelola migrasi database:
   - `:add` untuk menambahkan migrasi baru `migrate:add create_table_tasks`
   - `:up` untuk menjalankan migrasi dan memperbarui database
   - `:down` untuk membatalkan migrasi sebelumnya

   - Untuk menjalankan migrasi:
   ```bash
   npm run migrate:up
   ```
   
## Dependensi Utama
| Package               | Version                                      | Keterangan                                 |
|-----------------------|----------------------------------------------|--------------------------------------------|
| [`@hapi/hapi`]((https://www.npmjs.com/package/@hapi/hapi))           | 21.3.12   | Server framework untuk Node.js |
| [`dotenv`](https://www.npmjs.com/package/dotenv)                     | 16.4.5    | Manajemen variabel lingkungan  |
| [`joi`](https://www.npmjs.com/package/joi)                           | 17.13.3   | Validasi skema data            |
| [`mysql`](https://www.npmjs.com/package/mysql)                       | 2.18.1    | Driver MySQL untuk Node.js     |
| [`mysql-migrations`](https://www.npmjs.com/package/mysql-migrations) | 1.0.7     | Alat migrasi untuk MySQL       |
| [`nanoid`](https://www.npmjs.com/package/nanoid/v/3.3.7)             | 3.3.7     | Generator ID unik              |

## Dependensi Pengembangan
| Package                                            | Version   | Keterangan                 |
|----------------------------------------------------|-----------|----------------------------|
| [`nodemon`](https://www.npmjs.com/package/nodemon) | 21.3.12   | [Untuk proses pengembangan |

## Menjalankan Server

Untuk menjalankan server dalam pengembangan `:dev`:
```bash
npm run start:dev
```
## Struktur Tabel `tasks`

| Kolom        | Tipe Data      | Atribut                                                   | Keterangan                                     |
|--------------|----------------|-----------------------------------------------------------|------------------------------------------------|
| `id`         | `CHAR(36)`     | `PRIMARY KEY`                                             | Identifikasi unik untuk setiap task            |
| `title`      | `VARCHAR(50)`  | `NOT NULL`                                                | Judul task                                     |
| `description`| `TEXT`         |                                                           | Deskripsi rinci tentang task                   |
| `due_date`   | `TIMESTAMP`    |                                                           | Tanggal dan waktu batas penyelesaian task      |
| `status`     | `ENUM`         | `'in progress', 'pending', 'complete'`                    | Status saat ini dari task                      |
| `created_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`                               | Tanggal dan waktu saat task dibuat             |
| `updated_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`   | Tanggal dan waktu saat task terakhir diperbarui|

## Endpoints API

1. **Menambahkan Task Baru**
   - **Metode:** `POST`
   - **Endpoint:** `/tasks`
   - **Deskripsi:** Menambahkan task baru ke dalam database.
   - **Body:**
     ```json
     {
       "title": "Nama Task",
       "description": "Deskripsi Task"
       "due_date": "2024-11-06"
       "status": "pending"
     }
     ```

2. **Melihat Semua Task**
   - **Metode:** `GET`
   - **Endpoint:** `/tasks`
   - **Dengan parameter query(due_date AND status):** `/tasks?due_date=2024-11-06&status=in progress`
   - **Deskripsi:** Mengambil daftar semua task yang ada atau mengambil daftar task yang memenuhi kriteria tertentu berdasarkan parameter query.

3. **Melihat Detail Task Berdasarkan ID**
   - **Metode:** `GET`
   - **Endpoint:** `/tasks/{id}`
   - **Deskripsi:** Mengambil detail dari task tertentu berdasarkan ID.

4. **Memperbarui Task Berdasarkan ID**
   - **Metode:** `PUT`
   - **Endpoint:** `/tasks/{id}`
   - **Deskripsi:** Memperbarui informasi task yang ada.
   - **Body:**
     ```json
     {
       "title": "Edit Nama Task",
       "description": "Edit Deskripsi Task"
       "due_date": "2024-11-06"
       "status": "in progress"
     }
     ```

5. **Menghapus Task Berdasarkan ID**
   - **Metode:** `DELETE`
   - **Endpoint:** `/tasks/{id}`
   - **Deskripsi:** Menghapus task tertentu dari database.
  
## Pengujian API dengan Postman

1. **Impor Koleksi Postman**
   - Impor koleksi dari folder postman dengan nama file `Lombok Asap.postman_collection`.

2. **Impor Environment**
   - Impor environment dari folder postman dengan nama file `Lombok Asap.postman_environment`.

3. **Pengujian Endpoint**
   - Uji endpoint untuk menambahkan, melihat, memperbarui, dan menghapus task.
