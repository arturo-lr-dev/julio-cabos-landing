interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  narrow?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  narrow = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 lg:py-32 px-6 md:px-12 ${className}`}
    >
      <div className={`mx-auto ${narrow ? "max-w-2xl" : "max-w-6xl"}`}>
        {children}
      </div>
    </section>
  );
}
