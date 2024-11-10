import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Appship</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your ultimate web tools platform for productivity and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Tools</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/tools#ai" className="text-muted-foreground hover:text-foreground">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="/tools#productivity" className="text-muted-foreground hover:text-foreground">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/tools#development" className="text-muted-foreground hover:text-foreground">
                  Development
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Social</h3>
            <div className="mt-2 flex space-x-4">
              <Link href="https://twitter.com/appship" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/appship" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Appship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}