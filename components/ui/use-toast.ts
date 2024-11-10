"use client";

import { Toast } from "@/components/ui/toast";

type ToastProps = React.ComponentProps<typeof Toast>;

export function useToast() {
  return {
    toast: ({ title, description, variant }: { 
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      // Implementation will be handled by the toast component
    },
  };
}