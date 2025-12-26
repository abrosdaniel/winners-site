import { cn } from "@/lib/utils";

function MenuShape({ className }: { className?: string }) {
  return <div className={cn("w-full h-16", className)} />;
}

export { MenuShape };
