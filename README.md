Aplikasi ini merupakan aplikasi sederhana untuk manajemen data buku.
Aplikasi terdiri dari Frontend (React) dan Backend (Express / Node.js) serta menyediakan API CRUD buku dan fitur peminjaman.

Fitur Aplikasi
- Login
- Register
- Dashboard Admin
- Dashboard User
- CRUD Data Buku (Create, Read, Update, Delete)
- Peminjaman Buku

Yang Digunakan
- Frontend : React JS (Vite)
- Backend : Node.js + Express
- Database : MySQL
- Package Manager : npm

Struktur Folder
20230140197_D_REMED_UTS
│
├── react        # Frontend (React)
├── server       # Backend (Express API)
└── README.md

Cara Menjalankan Aplikasi
1. Clone Repository
bash
git clone https://github.com/D-PPAW-TI503P-2025/20230140197_D_REMED_UTS.git
cd 20230140197_D_REMED_UTS

2. Menjalankan Backend (Server)
Masuk ke folder server:
cd server
npm install

3. Konfigurasi Database
Buat database terlebih dahulu di MySQL, lalu sesuaikan konfigurasi database di file server.

Contoh konfigurasi:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nama_database
PORT=5000

Jalankan Server
node server.js

Server akan berjalan di:
http://localhost:5000

Menjalankan Frontend (React)
Buka terminal baru, lalu masuk ke folder react:
cd react
npm install

Jalankan aplikasi React:
npm run dev

Aplikasi akan otomatis terbuka di browser:
http://localhost:5137

Endpoints:
• Public:
o GET /api/books : Melihat semua buku.
o GET /api/books/:id : Detail buku.

• Admin (Header x-user-role: admin):
o POST /api/books : Tambah buku baru.
o PUT /api/books/:id : Update buku.
o DELETE /api/books/:id : Hapus buku.

• User (Header x-user-role: user & x-user-id: [id]):
o POST /api/borrow : Meminjam buku.


Halaman Login <img width="1600" height="842" alt="image" src="https://github.com/user-attachments/assets/59554d3f-b4ec-4c2d-afaa-f1a72e22a68b" />
Halaman Register <img width="1600" height="837" alt="image" src="https://github.com/user-attachments/assets/4658f535-15af-40e4-af9a-a053161d605c" />
Dashboard Admin <img width="1600" height="840" alt="image" src="https://github.com/user-attachments/assets/715e18b3-9f13-4fe5-a1ba-6d03aeb4acd6" />
Dashboard User <img width="1600" height="839" alt="image" src="https://github.com/user-attachments/assets/3a79e860-4a83-4f2e-b7b8-a3772543ffe3" />
Get Buku <img width="1600" height="812" alt="image" src="https://github.com/user-attachments/assets/52983779-0970-415c-8d5a-420b708aeb30" />
Get Buku By Id <img width="1600" height="813" alt="image" src="https://github.com/user-attachments/assets/f3965383-be45-4745-8407-91e16fb1c3c3" />
Post Buku <img width="1600" height="841" alt="image" src="https://github.com/user-attachments/assets/6228de8c-4cf3-4d85-9324-1de9fe284bd5" />
Put Buku <img width="1600" height="838" alt="image" src="https://github.com/user-attachments/assets/e2afc074-ffa0-47d1-a595-1d03658f5a55" />
Delete Buku <img width="1600" height="831" alt="image" src="https://github.com/user-attachments/assets/1e67f3b9-6142-478f-8534-90a34d413482" />
Borrow <img width="1600" height="842" alt="image" src="https://github.com/user-attachments/assets/a52c9657-ca71-4158-bf07-424d8688032b" />
database user <img width="1600" height="837" alt="image" src="https://github.com/user-attachments/assets/e3acb047-e72d-4239-8062-268bd86713aa" />
database borrow <img width="1600" height="899" alt="image" src="https://github.com/user-attachments/assets/30e6a318-715b-4208-be5b-f8a6efb7d246" />
database book <img width="1600" height="898" alt="image" src="https://github.com/user-attachments/assets/a58311d8-9159-4940-9c68-9f5b27636386" />
