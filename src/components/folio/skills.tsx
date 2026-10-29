import { skillGroups } from "@/data/folio";
import { SectionMark } from "@/components/folio/section-mark";

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="sheet">
        <SectionMark
          index="03"
          kicker="Указатель"
          title="Навыки"
          lede="Не ползунки и не облако слов. То, чем пользуюсь каждый месяц — от висячей пунктуации до сдачи в печать."
        />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li key={group.index} className="border-t border-ink py-6 md:pr-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl">{group.title}</h3>
                <span className="text-sm text-muted tabular-nums">{group.index}</span>
              </div>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-cinnabar" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
