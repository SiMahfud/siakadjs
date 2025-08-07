'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

// A simple component for a visual school-related icon.
function SchoolIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <path d="M12 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
    </svg>
  );
}


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Use startTransition to avoid blocking the UI during the async operation
    startTransition(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
      } else if (result?.ok) {
        // Successful login, NextAuth will handle the redirect via middleware
        // but we can push to a default as a fallback.
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <SchoolIcon className="w-12 h-12 text-slate-800 dark:text-slate-200" />
          </div>
          <CardTitle className="text-2xl font-bold">SIAKAD SMAN 1 Campurdarat</CardTitle>
          <CardDescription>
            Silakan masuk untuk mengakses akun Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                />
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Memverifikasi...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center text-slate-500 w-full">
            &copy; {new Date().getFullYear()} SMAN 1 Campurdarat. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
