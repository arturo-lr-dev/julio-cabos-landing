interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  narrow?: boolean;
  topRule?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  narrow = false,
  topRule = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-12 md:py-20 lg:py-24 px-6 md:px-12 ${className}`}
    >
      <div
        className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-6xl"} ${
          topRule ? "rule-t pt-10 md:pt-16" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
