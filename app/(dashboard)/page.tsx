import { auth } from "@/auth";
import { DashboardLayout } from "./_components/layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { BookUser, Users } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();
    const user = session?.user;

    return (
        <DashboardLayout title="Dashboard">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight">
                    Selamat Datang, {user?.name || 'Pengguna'}!
                </h2>
                <p className="text-muted-foreground">
                    Pilih menu di bawah untuk mulai mengelola data.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <Link href="/dashboard/guru">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Manajemen Guru</CardTitle>
                                <BookUser className="h-6 w-6 text-primary" />
                            </div>
                            <CardDescription>
                                Tambah, lihat, dan kelola data guru & TU.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="/dashboard/siswa">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Manajemen Siswa</CardTitle>
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <CardDescription>
                                Tambah, lihat, dan kelola data semua siswa.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </DashboardLayout>
    );
}
