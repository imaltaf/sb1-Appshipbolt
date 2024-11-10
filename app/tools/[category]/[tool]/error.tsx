"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container section-padding">
      <div className="glass-card p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">
          We encountered an error while loading this tool. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/tools">Back to Tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}