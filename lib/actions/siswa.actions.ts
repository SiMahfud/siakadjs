'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { hash } from 'bcryptjs';
import { FormState } from '@/lib/definitions';

const SiswaSchema = z.object({
  name: z.string().min(3, 'Nama harus lebih dari 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password harus lebih dari 6 karakter'),
  nis: z.string().min(1, 'NIS tidak boleh kosong'),
  nisn: z.string().min(1, 'NISN tidak boleh kosong'),
  kelasId: z.string().optional(),
});

export async function createSiswa(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SiswaSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Gagal membuat siswa. Mohon periksa kembali isian Anda.',
    };
  }

  const { name, email, password, nis, nisn, kelasId } = validatedFields.data;

  try {
    const hashedPassword = await hash(password, 10);

    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'SISWA',
        },
      });

      await tx.siswa.create({
        data: {
          nis,
          nisn,
          userId: newUser.id,
          kelasId: kelasId || null,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Gagal membuat siswa.',
    };
  }

  revalidatePath('/dashboard/siswa');
  return {
      message: 'Siswa berhasil dibuat.',
  }
}

export async function deleteSiswa(id: string) {
    try {
        await prisma.user.delete({
            where: { id }
        });
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Gagal menghapus siswa.',
        };
    }
    revalidatePath('/dashboard/siswa');
    return {
        message: 'Siswa berhasil dihapus.',
    }
}
