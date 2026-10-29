import { nav } from "@/data/folio";

export function Cover() {
  return (
    <section id="cover" className="relative overflow-hidden">
      <div className="sheet pt-8 pb-16 md:pt-14 md:pb-24">
        <p className="text-xs tracking-kicker text-muted uppercase">
          Выпуск 01 · 2026 · Работаем удалённо
        </p>
        <div className="relative mt-8">
          <p
            aria-hidden
            className="pointer-events-none absolute -top-10 right-0 hidden font-display text-watermark text-rule select-none md:block"
          >
            09
          </p>
          <p className="relative text-sm tracking-kicker uppercase">Eklmn</p>
          <h1 className="relative font-display text-display text-balance">Digital</h1>
        </div>
        <p className="relative mt-4 max-w-xl text-lg text-pretty">
          Сайты, AI-разработка и мобильный QA.
        </p>

        <div className="relative mt-10 grid items-start gap-12 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="max-w-md text-lg text-pretty">
              Помогаю небольшим компаниям с прототипами сайтов и проверкой мобильных страниц.
              Показываю реальные демонстрации и честно обозначаю их статус.
            </p>
            <blockquote className="mt-8 border-l-2 border-cinnabar pl-4 font-display text-2xl leading-snug text-balance italic">
              «Работающий результат важнее красивого обещания.»
            </blockquote>
            <a
              href="#letter"
              className="mt-8 inline-flex min-h-11 items-center border-b border-ink"
            >
              Обсудить задачу
            </a>
            <ol className="mt-10 border-t border-ink">
              {nav.map((item, index) => (
                <li key={item.id} className="border-b border-rule">
                  <a
                    href={item.href}
                    className="flex min-h-12 items-baseline justify-between gap-4 py-3 hover:text-cinnabar"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-muted tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl">{item.label}</span>
                    </span>
                    <span className="text-xs tracking-kicker text-muted uppercase">
                      {item.note}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <figure className="md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-portrait overflow-hidden bg-paper-deep">
              <img
                src="/folio/cover.jpg"
                alt="Стол редакции: бумага, ножницы, киноварная лента и чашка кофе"
                width={1200}
                height={1600}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 text-xs tracking-kicker text-muted uppercase">
              <span>Обложка</span>
              <span>Стол, октябрь</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
