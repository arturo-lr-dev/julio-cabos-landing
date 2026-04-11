import SectionWrapper from "./SectionWrapper";
import { siteContent } from "@/lib/data";

export default function TextBlock() {
  const { message } = siteContent;

  return (
    <SectionWrapper narrow>
      <div className="text-center">
        {message.text.map((line, i) =>
          line === "" ? (
            <br key={i} />
          ) : (
            <p
              key={i}
              className="text-lg md:text-xl leading-relaxed text-foreground-muted font-light"
            >
              {line}
            </p>
          )
        )}
      </div>
    </SectionWrapper>
  );
}
