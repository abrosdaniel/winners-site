import { cn } from "@/lib/utils";

function Wrapper({
  children,
  classWrapper,
  classContainer,
  variant = "white",
  size = "big",
}: {
  children: React.ReactNode;
  classWrapper?: string;
  classContainer?: string;
  variant?: "white" | "blue";
  size?: "big" | "small" | "none";
}) {
  return (
    <div
      className={cn(
        variant === "blue"
          ? "bg-[#171D3D] text-white"
          : "bg-white text-[#171D3D]",
        size === "big"
          ? "px-2 lg:px-0 py-[70px] lg:py-20"
          : size === "small"
          ? "px-2 lg:px-0 py-10 lg:py-[60px]"
          : "",
        classWrapper
      )}
    >
      <div className={cn("container mx-auto", classContainer)}>{children}</div>
    </div>
  );
}

export { Wrapper };
