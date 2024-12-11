"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Cricket League</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Points Table
            </Link>
            {session?.user?.role === 'admin' && (
              <Link href="/manage" className="text-gray-700 hover:text-primary">
                Manage Teams
              </Link>
            )}
            {session ? (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}