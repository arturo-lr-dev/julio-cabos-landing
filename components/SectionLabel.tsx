interface SectionLabelProps {
  index: string; // "01", "02"...
  label: string;
  className?: string;
}

/**
 * Numbered editorial label, e.g. "— 02 / GALERÍA"
 * Styled like a museum catalogue spine label.
 */
export default function SectionLabel({
  index,
  label,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`eyebrow flex items-center gap-3 text-foreground-muted ${className}`}
    >
      <span aria-hidden className="text-foreground-faint">—</span>
      <span>{label}</span>
    </div>
  );
}
