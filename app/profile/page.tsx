"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const checkUser = useCallback(async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      router.push("/auth/sign-in");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
      router.push("/auth/sign-in");
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card className="glass-card p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="mt-1">{user?.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="mt-1">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium">Account ID</label>
              <p className="mt-1 font-mono text-sm">{user?.$id}</p>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={handleSignOut}
            className="w-full sm:w-auto"
          >
            Sign out
          </Button>
        </div>
      </Card>
    </div>
  );
}