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

## 🏁 Memulai (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

### 1. Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut:
-   [Node.js](https://nodejs.org/) (v18 atau lebih baru)
-   [pnpm](https://pnpm.io/installation)
-   [Docker](https://www.docker.com/products/docker-desktop/)

### 2. Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/[USERNAME_ANDA]/[NAMA_REPO_ANDA].git
    cd [NAMA_REPO_ANDA]
    ```

2.  **Install semua dependensi:**
    ```bash
    pnpm install
    ```

3.  **Setup variabel lingkungan:**
    Salin file `.env.example` menjadi file `.env` baru.
    ```bash
    cp .env.example .env
    ```
    Buka file `.env` dan pastikan `DATABASE_URL` sudah sesuai (konfigurasi default sudah disesuaikan untuk Docker).

4.  **Jalankan database MariaDB:**
    Perintah ini akan membuat dan menjalankan kontainer database di background.
    ```bash
    docker-compose up -d
    ```

5.  **Terapkan skema database:**
    Perintah ini akan membaca skema dari `prisma/schema.prisma` dan membuat tabel-tabel yang dibutuhkan di database Anda.
    ```bash
    npx prisma migrate dev
    ```

6.  **Jalankan server pengembangan:**
    ```bash
    pnpm dev
    ```

🎉 Aplikasi sekarang berjalan di **http://localhost:3000**.

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