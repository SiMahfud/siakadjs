import { auth, signOut } from '@/auth';
import {
  Bell,
  Home,
  Users,
  BookUser,
  PanelLeft,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NavLink } from './nav-link';

async function UserMenu() {
  const session = await auth();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          {/* Placeholder for user avatar */}
          <Users className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit" className="w-full">
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <NavLink href="/dashboard">
                    <Home className="h-5 w-5" />
                    Dashboard
                </NavLink>
                <NavLink href="/dashboard/guru">
                    <BookUser className="h-5 w-5" />
                    Manajemen Guru
                </NavLink>
                <NavLink href="/dashboard/siswa">
                    <Users className="h-5 w-5" />
                    Manajemen Siswa
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
    )
}

export function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Home className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">SIAKAD</span>
          </Link>
          <NavLink href="/dashboard">
            <Home className="h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink href="/dashboard/guru">
            <BookUser className="h-5 w-5" />
            Manajemen Guru
          </NavLink>
          <NavLink href="/dashboard/siswa">
            <Users className="h-5 w-5" />
            Manajemen Siswa
          </NavLink>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserMenu />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
