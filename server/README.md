# Library System with Geolocation (UCP 1)

Backend sederhana untuk manajemen perpustakaan dengan fitur peminjaman berbasis lokasi.

## Deskripsi
Aplikasi ini adalah RESTful API yang dibangun menggunakan Node.js, Express.js, dan Sequelize (MySQL). Memiliki fitur autentikasi sederhana menggunakan simulasi Header (`x-user-role`, `x-user-id`) dan pencatatan geolocation saat peminjaman buku.

## Fitur
1.  **CRUD Buku** (Admin only)
2.  **Peminjaman Buku** (User only) - Mencatat lokasi (lat, long) dan mengurangi stok.
3.  **Autentikasi Middleware** - Validasi role Admin dan User.

## Prasyarat
- Node.js
- MySQL Database

## Instalasi & Menjalankan

1.  **Clone Repository** (atau extract folder)
    ```bash
    cd server
    ```

2.  **Instal Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi Database**
    - Buat database MySQL dengan nama `buku_db`.
    - Sesuaikan konfigurasi di `.env` jika perlu (username/password).
    ```env
    DB_NAME=buku_db
    DB_USER=root
    DB_PASS=
    DB_HOST=localhost
    ```

4.  **Jalankan Server**
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:5001`.

## Struktur Database
- **Books**: `id`, `title`, `author`, `stock`, `createdAt`, `updatedAt`
- **BorrowLogs**: `id`, `userId`, `bookId`, `borrowDate`, `latitude`, `longitude`, `createdAt`, `updatedAt`

## Endpoint API

### User / Auth
- **POST /api/users** - Register User
    - Body: `{ "username": "budi", "password": "password123", "role": "user" }`
- **POST /api/users/login** - Login
    - Body: `{ "username": "budi", "password": "password123" }`
    - Response: Mengembalikan `id` dan `role` untuk Header.

### Public
- **GET /api/books** - Melihat semua buku
- **GET /api/books/:id** - Detail buku

### Admin (Header `x-user-role: admin`)
- **POST /api/books** - Tambah buku
    - Body: `{ "title": "Judul", "author": "Penulis", "stock": 10 }`
- **PUT /api/books/:id** - Update buku
- **DELETE /api/books/:id** - Hapus buku

### User (Header `x-user-role: user`, `x-user-id: [id]`)
- **POST /api/borrow** - Pinjam buku
    - Body: `{ "bookId": 1, "latitude": -6.2, "longitude": 106.8 }`

## Pengujian (Testing)
Jalankan script `verify_api.sh` untuk melakukan test otomatis menggunakan cURL (pastikan server sudah berjalan).

```bash
sh ../verify_api.sh
```
