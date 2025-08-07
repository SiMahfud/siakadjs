import prisma from '@/lib/prisma';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { AddStudentDialog } from './components/add-student-dialog';
import { DashboardLayout } from '../../_components/layout';

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
    <DashboardLayout title="Manajemen Data Siswa">
        <div className="flex items-center justify-end mb-4">
            <AddStudentDialog />
        </div>
        <DataTable columns={columns} data={users} />
    </DashboardLayout>
  );
}
