import { cn } from "@/lib/utils";

type SkeletonProps = React.ComponentProps<"div"> & {
  variant?: "subtle" | "strong";
};

function Skeleton({ className, variant = "subtle", ...props }: SkeletonProps) {
  const tone =
    variant === "strong"
      ? "bg-gray-300 dark:bg-muted"
      : "bg-gray-200 dark:bg-muted/40";
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md animate-pulse", tone, className)}
      {...props}
    />
  );
}

export { Skeleton };
