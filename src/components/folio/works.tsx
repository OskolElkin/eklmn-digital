import { useState } from "react";
import { X } from "lucide-react";
import { categories, projects, worksWord, type FilterId, type Project } from "@/data/folio";
import { cn } from "@/lib/cn";
import { SectionMark } from "@/components/folio/section-mark";

function Plate({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="relative block aspect-plate overflow-hidden bg-paper-deep">
      {failed ? (
        <span className="absolute inset-0 flex flex-col justify-between p-4">
          <span className="text-xs tracking-kicker text-muted uppercase">
            {project.categoryLabel}
          </span>
          <span className="font-display text-6xl">{project.index}</span>
        </span>
      ) : (
        <img
          src={project.image}
          alt=""
          width={1600}
          height={1066}
          loading="lazy"
          className="work-photo"
          onError={() => setFailed(true)}
        />
      )}
      <span className="work-reveal border-t-2 border-cinnabar px-4 py-3 text-left">
        <span className="block text-sm text-pretty">{project.dek}</span>
      </span>
    </span>
  );
}

export function Works() {
  const [category, setCategory] = useState<FilterId>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible =
    category === "all" ? projects : projects.filter((project) => project.category === category);
  const open = projects.find((project) => project.id === openId) ?? null;
  const spread = open && visible.some((project) => project.id === open.id) ? open : null;

  function selectCategory(next: FilterId) {
    setCategory(next);
    setOpenId((current) => {
      if (!current) return current;
      const project = projects.find((item) => item.id === current);
      if (!project) return null;
      if (next !== "all" && project.category !== next) return null;
      return current;
    });
  }

  function toggle(id: string) {
    setOpenId((current) => {
      const next = current === id ? null : id;
      if (next) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        requestAnimationFrame(() => {
          document.getElementById("spread")?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
          document.getElementById("spread-title")?.focus();
        });
      }
      return next;
    });
  }

  return (
    <section id="works" className="pb-16 md:pb-24">
      <div className="sheet">
        <SectionMark
          index="01"
          kicker="Содержание"
          title="Работы"
          lede="Восемь вещей из практики. Короткая аннотация живёт на карточке, полный разворот открывается по нажатию."
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по разделам">
            {categories.map((item) => {
              const selected = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "press min-h-11 border px-4 text-sm",
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-transparent text-ink hover:border-ink",
                  )}
                  aria-pressed={selected}
                  onClick={() => selectCategory(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-muted tabular-nums" aria-live="polite">
            {String(visible.length).padStart(2, "0")} {worksWord(visible.length)}
          </p>
        </div>

        {spread ? (
          <article id="spread" className="mt-8 scroll-mt-24 border border-ink">
            <div className="grid md:grid-cols-2">
              <div className="border-b border-rule p-6 md:border-r md:border-b-0 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs tracking-kicker text-cinnabar uppercase">
                    {spread.categoryLabel} · {spread.year}
                  </p>
                  <button
                    type="button"
                    className="press inline-flex min-h-11 items-center gap-2 text-sm"
                    onClick={() => setOpenId(null)}
                  >
                    Закрыть
                    <X aria-hidden className="size-4" />
                  </button>
                </div>
                <h3
                  id="spread-title"
                  tabIndex={-1}
                  className="mt-4 font-display text-section text-balance outline-none"
                >
                  {spread.title}
                </h3>
                <p className="mt-6 text-lg text-pretty">{spread.dek}</p>
                <p className="mt-4 text-pretty text-muted">{spread.story}</p>
              </div>
              <div>
                <img
                  src={spread.image}
                  alt={spread.alt}
                  width={1728}
                  height={1152}
                  className="aspect-plate w-full object-cover"
                />
                <dl className="grid grid-cols-[7rem_1fr] gap-y-3 p-6 text-sm">
                  <dt className="text-muted">Клиент</dt>
                  <dd>{spread.client}</dd>
                  <dt className="text-muted">Роль</dt>
                  <dd>{spread.role}</dd>
                  <dt className="text-muted">Носители</dt>
                  <dd>{spread.carriers}</dd>
                  <dt className="text-muted">Год</dt>
                  <dd className="tabular-nums">{spread.year}</dd>
                </dl>
              </div>
            </div>
          </article>
        ) : null}

        <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {visible.map((project, index) => {
            const featured = category === "all" && index === 0;
            const isOpen = spread?.id === project.id;
            return (
              <li key={project.id} className={cn(featured && "md:col-span-2")}>
                <article className={cn("group", isOpen && "force-dek")}>
                  <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`${project.title}, ${project.year}, ${project.categoryLabel}. Открыть разворот`}
                      onClick={() => toggle(project.id)}
                      className={cn(
                        "w-full text-left",
                        featured && "md:grid md:grid-cols-2 md:items-end md:gap-10",
                      )}
                    >
                      <Plate project={project} />
                      <span className={cn("block pt-4", featured && "md:pt-0")}>
                        <span className="flex items-baseline justify-between gap-4 text-xs tracking-kicker text-muted uppercase">
                          <span className="tabular-nums">{project.index}</span>
                          <span className="tabular-nums">{project.year}</span>
                        </span>
                        <span className="mt-2 block font-display text-4xl tracking-tight text-balance">
                          {project.title}
                        </span>
                        <span className="mt-2 block text-sm text-cinnabar">{project.categoryLabel}</span>
                        <span className="work-dek mt-3 block text-sm text-pretty text-muted">
                          {project.dek}
                        </span>
                        {featured ? (
                          <span className="mt-4 hidden text-xs tracking-kicker text-muted uppercase md:block">
                            Открывает номер
                          </span>
                        ) : null}
                      </span>
                    </button>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
