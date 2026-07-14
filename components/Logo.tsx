export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif font-bold tracking-[.02em] ${className}`}
      aria-label="Aldeano"
    >
      ald<em className="italic font-semibold text-achiote">ea</em>no
    </span>
  );
}
