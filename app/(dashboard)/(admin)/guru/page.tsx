import prisma from '@/lib/prisma';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { AddGuruDialog } from './components/add-guru-dialog';
import { DashboardLayout } from '../../_components/layout';

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
    <DashboardLayout title="Manajemen Data Guru & TU">
        <div className="flex items-center justify-end mb-4">
            <AddGuruDialog />
        </div>
        <DataTable columns={columns} data={users} />
    </DashboardLayout>
  );
}
