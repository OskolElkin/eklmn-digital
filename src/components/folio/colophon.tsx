import { nav } from "@/data/folio";

const colophon = [
  { label: "Издание", value: "Личный журнал, не продаётся" },
  { label: "Город", value: "Удалённо" },
  { label: "Набор", value: "Fraunces и Manrope" },
  { label: "Бумага", value: "Слоновая кость" },
  { label: "Акцент", value: "Киноварь" },
  { label: "Выпуск", value: "09, осень 2026" },
];

export function Colophon() {
  return (
    <footer>
      <div className="h-1.5 bg-cinnabar" />
      <div className="h-2 bg-ink" />
      <div className="sheet py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl">Eklmn Digital</p>
            <p className="mt-4 max-w-xs text-pretty text-muted">
              Разработка сайтов, мобильное тестирование и QA-аудиты.
            </p>
            <a
              href="mailto:elkin519128@internet.ru"
              className="mt-6 inline-flex min-h-11 items-center border-b border-ink text-sm"
            >
              elkin519128@internet.ru
            </a>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs tracking-kicker text-muted uppercase">В номере</p>
            <ul className="mt-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="inline-flex min-h-11 items-center hover:text-cinnabar">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs tracking-kicker text-muted uppercase">Колофон</p>
            <dl className="mt-4">
              {colophon.map((row) => (
                <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule py-2 text-sm">
                  <dt className="text-muted">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Eklmn Digital. Представленные работы — демонстрационные.</p>
          <a href="#cover" className="inline-flex min-h-11 items-center">
            Наверх
          </a>
        </div>
      </div>
      <div className="endpaper" aria-hidden>
        <p>Eklmn Digital</p>
      </div>
    </footer>
  );
}
