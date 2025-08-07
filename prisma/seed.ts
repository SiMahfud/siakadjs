import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const saltRounds = 10;
  const password = 'belajarlah'; // Ganti dengan password yang kuat
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Membuat user admin default menggunakan upsert
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' }, // Kunci unik untuk mencari user
    update: {}, // Biarkan kosong jika tidak ada yang perlu diupdate jika user sudah ada
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log(`Created default admin user: ${adminUser.email}`);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Tutup koneksi prisma
    await prisma.$disconnect();
  });
