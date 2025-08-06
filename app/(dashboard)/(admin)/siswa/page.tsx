import prisma from '@/lib/prisma';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { AddStudentDialog } from './components/add-student-dialog';

export default async function SiswaPage() {
  const users = await prisma.user.findMany({
    where: {
      role: 'SISWA',
    },
    include: {
      siswa: true,
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manajemen Data Siswa</h1>
        <AddStudentDialog />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
