'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { FormState } from '@/lib/definitions';

const GuruSchema = z.object({
  name: z.string().min(3, 'Nama harus lebih dari 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password harus lebih dari 6 karakter'),
  nuptk: z.string().min(1, 'NUPTK tidak boleh kosong'),
});

export async function createGuru(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = GuruSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Gagal membuat guru. Mohon periksa kembali isian Anda.',
    };
  }

  const { name, email, password, nuptk } = validatedFields.data;

  try {
    const hashedPassword = await hash(password, 10);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'GURU',
        },
      });

      await tx.guru.create({
        data: {
          nuptk,
          userId: newUser.id,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Gagal membuat guru.',
    };
  }

  revalidatePath('/dashboard/guru');
  return {
      message: 'Guru berhasil dibuat.',
  }
}

export async function deleteGuru(id: string) {
    try {
        await prisma.user.delete({
            where: { id }
        });
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Gagal menghapus guru.',
        };
    }
    revalidatePath('/dashboard/guru');
    return {
        message: 'Guru berhasil dihapus.',
    }
}
