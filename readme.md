# Sistem Informasi Akademik (SIAKAD) - SMAN 1 Campurdarat

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Sebuah aplikasi web modern yang dibangun untuk mendigitalisasi dan menyederhanakan manajemen akademik di SMAN 1 Campurdarat. Platform ini melayani kebutuhan Admin, Guru, dan Siswa dalam satu ekosistem yang terintegrasi.

## ✨ Tampilan Aplikasi

*(Catatan: Sangat disarankan untuk mengganti link placeholder di bawah ini dengan screenshot nyata dari aplikasi Anda setelah beberapa halaman berhasil dibuat)*

| Dashboard Admin | Jurnal Mengajar Guru | Portal Siswa |
| :-------------: | :-------------: | :-------------: |
| ![Dashboard Admin](link-ke-screenshot-dashboard.png) | ![Jurnal Mengajar](link-ke-screenshot-jurnal.png) | ![Portal Siswa](link-ke-screenshot-portal.png) |

## 🚀 Fitur Utama

-   **🔐 Autentikasi Berbasis Peran:** Sistem login aman yang membedakan akses antara Admin, Guru, dan Siswa.
-   **👤 Manajemen Data Induk:** Admin dapat mengelola data Siswa, Guru, dan staf TU dengan mudah (CRUD).
-   **🗓️ Pengelolaan Jadwal:** Antarmuka visual bagi Admin untuk menyusun jadwal pelajaran per kelas.
-   **📓 Jurnal Mengajar Guru:** Guru dapat mengisi jurnal setiap sesi pelajaran, mencatat materi, dan sekaligus merekam absensi siswa secara terintegrasi.
-   **💯 Manajemen Nilai:** Guru dapat menginput berbagai jenis nilai (tugas, UTS, UAS) dengan mudah.
-   ** portal_siswa: Portal Siswa:** Siswa dapat melihat jadwal pelajaran, rekap absensi, dan rincian nilai mereka secara real-time.

## 🛠️ Tumpukan Teknologi (Tech Stack)

| Komponen | Teknologi |
| :--- | :--- |
| Framework | **Next.js** (App Router) |
| Database | **MariaDB** (dijalankan via Docker) |
| ORM | **Prisma** |
| Bahasa | **TypeScript** |
| Styling | **Tailwind CSS** |
| Komponen UI | **Shadcn/ui** |
| Autentikasi | **Next-Auth.js** |
| Validasi Skema | **Zod** |

## 🏁 Panduan Instalasi dan Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini di lingkungan lokal Anda.

### 1. Prasyarat (Prerequisites)

Pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:
-   [Node.js](https://nodejs.org/) (v18 atau yang lebih baru)
-   [pnpm](https://pnpm.io/installation) (sebagai package manager)
-   [Docker](https://www.docker.com/products/docker-desktop/) (untuk menjalankan database)

### 2. Langkah-langkah Instalasi

1.  **Clone Repositori**

    Jika Anda belum memiliki kode sumbernya, clone repositori ini ke mesin lokal Anda.
    ```bash
    # Ganti URL berikut dengan URL repositori yang sesuai
    git clone https://github.com/[USERNAME_ANDA]/[NAMA_REPO_ANDA].git
    cd [NAMA_REPO_ANDA]
    ```

2.  **Install Dependensi Proyek**

    Gunakan `pnpm` untuk menginstal semua paket yang dibutuhkan.
    ```bash
    pnpm install
    ```

3.  **Konfigurasi Variabel Lingkungan (.env)**

    Salin file contoh `.env.example` menjadi file baru bernama `.env`. File ini akan digunakan untuk menyimpan konfigurasi dan kredensial penting.
    ```bash
    cp .env.example .env
    ```
    *Catatan: Konfigurasi default di dalam `.env.example` sudah disesuaikan untuk berjalan dengan Docker, jadi Anda tidak perlu mengubah `DATABASE_URL` pada tahap ini.*

4.  **Jalankan Database (MariaDB via Docker)**

    Perintah berikut akan mengunduh image MariaDB (jika belum ada) dan menjalankan kontainer database di latar belakang.
    ```bash
    docker-compose up -d
    ```

5.  **Terapkan Migrasi Database**

    Jalankan perintah ini untuk membuat semua tabel yang didefinisikan di `prisma/schema.prisma` dan menerapkan semua data awal, termasuk membuat pengguna admin default.
    ```bash
    npx prisma migrate dev
    ```

6.  **Jalankan Server Pengembangan**

    Setelah semua langkah di atas berhasil, jalankan aplikasi Next.js dalam mode pengembangan.
    ```bash
    pnpm dev
    ```

    🎉 **Selesai!** Aplikasi Anda sekarang berjalan dan dapat diakses di **[http://localhost:3000](http://localhost:3000)**.

### 3. Akses Aplikasi

Setelah aplikasi berjalan, Anda dapat masuk menggunakan akun admin default yang telah dibuat secara otomatis oleh sistem.

-   **Email:** `admin@siakad.com`
-   **Password:** `admin123`

Akun ini memiliki hak akses tertinggi dan dapat digunakan untuk mengelola seluruh aspek data master di dalam aplikasi.

## 📂 Struktur Proyek

Berikut adalah gambaran singkat struktur folder utama dalam proyek ini:

```
/
├── /app/             # Inti aplikasi (semua rute dan halaman)
├── /components/      # Komponen React yang dapat digunakan kembali
├── /lib/             # Fungsi utilitas (koneksi DB, konfigurasi auth)
├── /prisma/          # Skema dan migrasi database
├── .env              # File variabel lingkungan (Rahasia!)
└── README.md         # Anda sedang membaca ini
```

## 🤝 Kontribusi

Kontribusi sangat kami hargai! Jika Anda tertarik untuk membantu mengembangkan proyek ini, silakan baca panduan lengkap, daftar fitur, dan roadmap pengembangan kami di file **[Panduan Kontributor (AGENTS.MD)](./AGENTS.MD)**.

## 📄 Lisensi

Proyek ini dilisensikan di bawah **Lisensi MIT**. Lihat file `LICENSE` untuk detailnya.