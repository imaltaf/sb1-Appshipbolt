"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu, X, Rocket, User } from "lucide-react";
import { account } from "@/lib/appwrite";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    // Only check user if we have Appwrite configured
    if (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
      checkUser();
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="logo-text text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Appship
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/tools" className="text-foreground/60 hover:text-foreground transition-colors">
            All Tools
          </Link>
          <Link href="/tools#ai" className="text-foreground/60 hover:text-foreground transition-colors">
            AI Tools
          </Link>
          <Link href="/tools#productivity" className="text-foreground/60 hover:text-foreground transition-colors">
            Productivity
          </Link>
          <ThemeToggle />
          {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID && user ? (
            <Button variant="ghost" asChild>
              <Link href="/profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b lg:hidden">
            <nav className="container py-4 flex flex-col space-y-4">
              <Link
                href="/tools"
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Tools
              </Link>
              <Link
                href="/tools#ai"
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link
                href="/tools#productivity"
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productivity
              </Link>
              <div className="flex flex-col space-y-2">
                <ThemeToggle />
                {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID && user ? (
                  <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link href="/auth/sign-in">Sign in</Link>
                    </Button>
                    <Button asChild onClick={() => setIsMenuOpen(false)}>
                      <Link href="/auth/sign-up">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}