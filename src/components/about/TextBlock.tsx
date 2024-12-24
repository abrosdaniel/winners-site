interface TextBlockProps {
  type: "scroller" | "description";
  className?: string;
  children: React.ReactNode;
}

export function TextBlock({ type, className, children }: TextBlockProps) {
  return type === "description" ? (
    <p
      className={`font-inter font-normal text-base text-[#D0D0D0] text-end mr-3 lg:mr-14 translate-y-full z-10 h-0 ${
        className || ""
      }`}
    >
      {children}
    </p>
  ) : (
    <p
      className={`font-inter font-normal text-5xl lg:text-8xl text-[#D0D0D03B] top-1/2 ml-4 z-10 ${
        className || ""
      }`}
    >
      {children}
    </p>
  );
}
