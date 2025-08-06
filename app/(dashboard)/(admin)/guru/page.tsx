import prisma from '@/lib/prisma';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { AddGuruDialog } from './components/add-guru-dialog';

export default async function GuruPage() {
  const users = await prisma.user.findMany({
    where: {
      role: 'GURU',
    },
    include: {
      guru: true,
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manajemen Data Guru & TU</h1>
        <AddGuruDialog />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
