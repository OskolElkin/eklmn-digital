import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/folio/about";
import { Colophon } from "@/components/folio/colophon";
import { Cover } from "@/components/folio/cover";
import { Letter } from "@/components/folio/letter";
import { Masthead } from "@/components/folio/masthead";
import { Skills } from "@/components/folio/skills";
import { Works } from "@/components/folio/works";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <a
        href="#works"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        К работам
      </a>
      <p aria-hidden className="pointer-events-none fixed inset-y-0 left-3 z-20 hidden items-center xl:flex">
        <span className="spine text-xs tracking-kicker text-muted uppercase">
          Eklmn Digital · выпуск 01 · демонстрация
        </span>
      </p>
      <Masthead />
      <main>
        <Cover />
        <Works />
        <About />
        <aside className="bg-ink text-paper" aria-label="Заметка выпуска">
          <div className="sheet py-16 md:py-24">
            <p className="text-xs tracking-kicker text-mist uppercase">Заметка на полях</p>
            <blockquote className="mt-6 max-w-4xl font-display text-section text-balance italic">
              «Проверяем результат, а не только обещания.»
            </blockquote>
            <p className="mt-6 text-sm text-mist">Eklmn Digital · демонстрационный проект</p>
          </div>
        </aside>
        <Skills />
        <Letter />
      </main>
      <Colophon />
    </>
  );
}
