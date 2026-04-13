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
      className={`relative py-24 md:py-32 lg:py-40 px-6 md:px-12 ${className}`}
    >
      <div
        className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-6xl"} ${
          topRule ? "rule-t pt-24 md:pt-28" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
