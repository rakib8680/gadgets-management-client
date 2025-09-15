import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md animate-pulse bg-gray-200 dark:bg-muted/40",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
