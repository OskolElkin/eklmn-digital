import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/folio";
import { cn } from "@/lib/cn";

const sections = ["cover", "works", "about", "skills", "letter"] as const;

function useActiveSection() {
  const [active, setActive] = useState<string>("cover");

  useEffect(() => {
    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Masthead() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper">
      <div className="sheet flex min-h-16 items-center justify-between gap-4">
        <a href="#cover" className="font-display text-2xl">
          Eklmn Digital
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Разделы номера">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center border-b-2 text-sm",
                active === item.id
                  ? "border-cinnabar text-ink"
                  : "border-transparent text-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="hidden text-xs tracking-kicker text-muted uppercase md:block">Вып. 09</p>
        <button
          type="button"
          className="press inline-flex min-h-11 min-w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
        </button>
      </div>
      <div id="mobile-nav" className="menu-panel" data-open={open ? "true" : "false"}>
        <div className="overflow-hidden">
          <nav className="sheet flex flex-col pb-4" aria-label="Разделы номера">
            {nav.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                className="flex min-h-14 items-baseline justify-between border-t border-rule py-2"
                aria-current={active === item.id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="font-display text-3xl">{item.label}</span>
                <span className="text-xs tracking-kicker text-muted uppercase tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
