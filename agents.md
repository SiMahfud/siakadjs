# Agents.md - Panduan & Roadmap Proyek SIAKAD SMAN 1 Campurdarat

Selamat datang, Agen! Dokumen ini adalah panduan pusat dan peta jalan (roadmap) untuk pengembangan Sistem Informasi Akademik (SIAKAD) SMAN 1 Campurdarat.

## 1. Visi & Tujuan Proyek

Membangun sebuah platform akademik yang **terintegrasi, modern, dan efisien**. Aplikasi ini bertujuan untuk menyederhanakan alur kerja administrasi, mempermudah proses belajar-mengajar bagi guru, dan memberikan akses informasi yang transparan bagi siswa.

## 2. Status Pengembangan Saat Ini (Roadmap)

Gunakan daftar ini untuk melacak progres. Tandai `[ ]` menjadi `[x]` setelah sebuah fitur selesai dan di-merge ke branch `main`.

### Fitur Inti (Prioritas Utama)
- [ ] **Fitur 1:** Autentikasi & Manajemen Peran
- [ ] **Fitur 2:** CRUD Data Master Siswa
- [ ] **Fitur 3:** CRUD Data Master Guru & TU
- [ ] **Fitur 4:** Pengelolaan Jadwal Pelajaran
- [ ] **Fitur 5:** Pengelolaan Jurnal Mengajar Guru (termasuk Absensi)
- [ ] **Fitur 6:** Pengelolaan Nilai oleh Guru
- [ ] **Fitur 7:** Portal Siswa (Lihat Jadwal, Nilai, Absensi)

### Fitur Penyempurnaan (Backlog)
- [ ] Sistem Pengumuman Sekolah
- [ ] Manajemen Keuangan (SPP)
- [ ] Cetak Rapor Digital (PDF)
- [ ] Modul Bimbingan Konseling (BK)
- [ ] Portal Orang Tua

## 3. Tumpukan Teknologi

- **Framework:** Next.js (App Router)
- **Database:** MariaDB
- **ORM:** Prisma
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Komponen UI:** Shadcn/ui
- **Autentikasi:** Next-Auth.js
- **Validasi:** Zod

## 4. Panduan Setup Lokal

1.  **Clone Repositori:**
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    cd siakad-sman-1
    ```
2.  **Install Dependensi:**
    ```bash
    pnpm install
    ```
3.  **Jalankan Database (via Docker):**
    ```bash
    docker-compose up -d
    ```
4.  **Setup Variabel Lingkungan:**
    Salin `.env.example` menjadi `.env` dan sesuaikan `DATABASE_URL`.
    ```bash
    cp .env.example .env
    ```
5.  **Migrasi Database:**
    Terapkan skema Prisma ke database Anda.
    ```bash
    npx prisma migrate dev --name init
    ```
6.  **Jalankan Server Pengembangan:**
    ```bash
    pnpm dev
    ```
    Buka `http://localhost:3000` di browser Anda.

## 5. Arsitektur & Prinsip Kerja

-   **Struktur Kode:** Proyek menggunakan **App Router** Next.js. Rute didefinisikan oleh struktur folder di dalam `/app`.
-   **Server Components:** Secara default, semua komponen adalah Server Components. Gunakan untuk mengambil data langsung dari database (`async/await`).
-   **Client Components:** Tambahkan `'use client';` di baris atas file jika komponen memerlukan interaktivitas (e.g., `useState`, `onClick`).
-   **Mutasi Data:** Gunakan **Server Actions** untuk semua operasi Create, Update, dan Delete. Ini adalah fungsi yang aman dan dijamin berjalan di server.
-   **Interaksi Database:** Semua operasi database **wajib** melalui **Prisma Client**. Skema database didefinisikan di `prisma/schema.prisma`.

## 6. Daftar Fitur & Panduan Implementasi

### **Fitur 1: Autentikasi & Manajemen Peran**
-   **Deskripsi:** Mengamankan aplikasi dan membatasi akses berdasarkan peran (Admin, Guru, Siswa).
-   **Rute Utama:** `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`
-   **Kunci Implementasi:** Gunakan `CredentialsProvider` Next-Auth, simpan `role` di session, dan lindungi rute `/dashboard` dengan `middleware.ts`.
-   **Model DB:** `User`

### **Fitur 2 & 3: CRUD Data Master (Siswa, Guru, TU)**
-   **Deskripsi:** Admin dapat mengelola data induk untuk Siswa, Guru, dan staf TU.
-   **Rute Utama:** `/app/(dashboard)/(admin)/siswa`, `/app/(dashboard)/(admin)/guru`
-   **Kunci Implementasi:** Gunakan `DataTable` dari `shadcn/ui`. Buat Server Actions untuk CUD dan `prisma.$transaction` saat membuat user baru. Panggil `revalidatePath` untuk menyegarkan data.
-   **Model DB:** `User`, `Siswa`, `Guru`, `Kelas`

### **Fitur 4: Pengelolaan Jadwal Pelajaran**
-   **Deskripsi:** Admin menyusun jadwal pelajaran untuk setiap kelas per semester.
-   **Rute Utama:** `/app/(dashboard)/(admin)/jadwal`
-   **Kunci Implementasi:** Buat antarmuka visual (misal tabel) untuk memudahkan admin menempatkan Guru dan Mata Pelajaran ke dalam slot hari dan jam untuk setiap Kelas.
-   **Model DB:** `Jadwal`, `Kelas`, `MataPelajaran`, `Guru`

### **Fitur 5: Pengelolaan Jurnal Mengajar Guru**
-   **Deskripsi:** Guru mengisi jurnal untuk setiap sesi mengajar, mencakup materi yang diajarkan dan sekaligus mencatat kehadiran siswa.
-   **Rute Utama:** `/app/(dashboard)/(guru)/jurnal`
-   **Kunci Implementasi:**
    1.  Guru memilih jadwal mengajar.
    2.  Form menampilkan input untuk "Materi Pembahasan" dan daftar siswa untuk diabsen.
    3.  Gunakan `prisma.$transaction` dalam Server Action untuk menyimpan data ke model `JurnalMengajar` dan `Absensi` secara bersamaan.
-   **Model DB:** `JurnalMengajar` (Baru), `Absensi` (Dimodifikasi), `Siswa`, `Jadwal`
-   **Catatan DB:** Fitur ini memerlukan modifikasi skema. Buat model `JurnalMengajar` dan ubah relasi pada model `Absensi` agar terhubung ke `jurnalMengajarId`.

### **Fitur 6: Pengelolaan Nilai oleh Guru**
-   **Deskripsi:** Guru menginput nilai (Tugas, UTS, UAS, dll.) untuk siswa.
-   **Rute Utama:** `/app/(dashboard)/(guru)/nilai`
-   **Kunci Implementasi:** Gunakan `prisma.nilai.upsert` dalam Server Action. Ini memungkinkan guru untuk memasukkan nilai baru atau memperbarui nilai yang sudah ada dengan mudah.
-   **Model DB:** `Nilai`, `Siswa`, `MataPelajaran`

### **Fitur 7: Portal Siswa**
-   **Deskripsi:** Siswa dapat melihat data akademik mereka (read-only).
-   **Rute Utama:** `/app/(dashboard)/(siswa)/...`
-   **Kunci Implementasi:** Gunakan Server Components untuk mengambil data dari database berdasarkan `ID siswa` yang tersimpan di sesi. Sajikan data dalam antarmuka yang bersih.
-   **Model DB:** `Siswa`, `Nilai`, `Jadwal`, `JurnalMengajar`, `Absensi`

## 7. Alur Kontribusi

1.  **Ambil Tugas:** Lihat bagian **Status Pengembangan** dan pilih fitur yang berstatus `[ ]`.
2.  **Buat Branch:** Buat branch baru dari `main` dengan nama yang deskriptif.
    ```bash
    git checkout -b fitur/nama-fitur-yang-dikerjakan
    ```
3.  **Kembangkan Fitur:** Lakukan perubahan sesuai panduan.
4.  **Commit & Push:** Commit pekerjaan Anda dengan pesan yang jelas dan push ke repositori.
5.  **Pull Request:** Buat Pull Request (PR) ke branch `main`. Jelaskan perubahan yang Anda buat dan pastikan semua pengecekan otomatis (jika ada) berhasil.
6.  **Update Status:** Setelah PR di-merge, update status fitur di dokumen ini menjadi `[x]`.

```