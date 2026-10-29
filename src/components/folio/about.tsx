import { facts, timeline } from "@/data/folio";
import { SectionMark } from "@/components/folio/section-mark";

export function About() {
  return (
    <section id="about" className="bg-paper-deep py-16 md:py-24">
      <div className="sheet">
        <SectionMark
          index="02"
          kicker="Редакция"
          title="Обо мне"
          lede="Небольшие цифровые задачи, ясный объём работы и проверяемый результат."
        />
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="drop text-lg text-pretty">Eklmn Digital — начинающее направление по созданию сайтов и проверке мобильных интерфейсов с помощью AI-инструментов.</p><p className="mt-4 text-pretty text-muted">Работаю с Android, GitHub и исходным кодом веб-проектов. Предлагаю понятные небольшие задачи: прототипы страниц, проверка отображения и отчёты с рекомендациями.</p><p className="mt-4 text-pretty text-muted">В портфолио пока демонстрационные работы. Они не выдаются за коммерческие заказы.</p>
            <dl className="mt-10 border-t border-ink">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule py-3 text-sm"
                >
                  <dt className="text-muted">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-6">
            <figure>
              <div className="relative aspect-plate overflow-hidden bg-paper">
                <img
                  src="/folio/studio.jpg"
                  alt="Стул, стопка несшитых тетрадей и льняная штора в светлой комнате"
                  width={1728}
                  height={1152}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex justify-between gap-4 text-xs tracking-kicker text-muted uppercase">
                <span>Рабочий процесс</span>
                <span>Не портрет</span>
              </figcaption>
            </figure>
            <ol className="mt-8 border-t border-ink">
              {timeline.map((item) => (
                <li
                  key={item.year}
                  className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-rule py-3"
                >
                  <span className="font-display text-xl tabular-nums">{item.year}</span>
                  <span className="text-pretty">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
