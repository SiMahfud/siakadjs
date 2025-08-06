'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createSiswa } from '@/lib/actions/siswa.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { FormState } from '@/lib/definitions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Menyimpan...' : 'Simpan'}
    </Button>
  );
}

export function StudentForm() {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSiswa, initialState);

  useEffect(() => {
    if (state.message?.includes('berhasil')) {
      toast.success('Sukses', {
        description: state.message,
      });
    } else if (state.message) {
      toast.error('Error', {
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" name="name" required />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name.join(', ')}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email.join(', ')}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        {state.errors?.password && <p className="text-red-500 text-sm mt-1">{state.errors.password.join(', ')}</p>}
      </div>
      <div>
        <Label htmlFor="nis">NIS</Label>
        <Input id="nis" name="nis" required />
        {state.errors?.nis && <p className="text-red-500 text-sm mt-1">{state.errors.nis.join(', ')}</p>}
      </div>
      <div>
        <Label htmlFor="nisn">NISN</Label>
        <Input id="nisn" name="nisn" required />
        {state.errors?.nisn && <p className="text-red-500 text-sm mt-1">{state.errors.nisn.join(', ')}</p>}
      </div>

      <SubmitButton />
    </form>
  );
}
