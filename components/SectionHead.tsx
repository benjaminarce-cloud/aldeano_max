import type { ReactNode } from "react";

export default function SectionHead({
  num,
  title,
  lead,
  className = "",
}: {
  num: string;
  title: ReactNode;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={`mb-14 max-w-[640px] ${className}`}>
      <span className="sec-num">{num}</span>
      <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-[340] leading-[1.05]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-[18px] max-w-[520px] text-[1.02rem] font-light text-cal-dim">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
