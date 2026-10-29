export function SectionMark({
  index,
  kicker,
  title,
  lede,
}: {
  index: string;
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mb-10 flex flex-col gap-4 border-t border-ink pt-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-10">
      <div>
        <p className="text-xs tracking-kicker text-cinnabar uppercase">
          {index} — {kicker}
        </p>
        <h2 className="mt-2 font-display text-section text-balance">{title}</h2>
      </div>
      <p className="max-w-sm text-pretty text-muted md:text-right">{lede}</p>
    </header>
  );
}
