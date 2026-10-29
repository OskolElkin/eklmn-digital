import { useState, type FormEvent } from "react";
import { SectionMark } from "@/components/folio/section-mark";
import { cn } from "@/lib/cn";

const topics = [
  { id: "project", label: "Проект" },
  { id: "collab", label: "Сотрудничество" },
  { id: "talk", label: "Аудит" },
  { id: "other", label: "Другое" },
] as const;

type TopicId = (typeof topics)[number]["id"];

type Fields = {
  name: string;
  email: string;
  topic: TopicId;
  message: string;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const empty: Fields = {
  name: "",
  email: "",
  topic: "project",
  message: "",
};

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Как к вам обращаться?";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Нужна настоящая почта.";
  }
  if (values.message.trim().length < 12) {
    errors.message = "Хотя бы пара строк: задача, срок и где это будет жить.";
  }
  return errors;
}

export function Letter() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentName, setSentName] = useState<string | null>(null);
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    const first = (["name", "email", "message"] as const).find((key) => next[key]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    if (!contactEmail) {
      setSentName("DEMO");
      return;
    }
    const subject = `Запрос с сайта: ${topics.find(t => t.id === values.topic)?.label ?? "Другое"}`;
    const body = `Имя: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`;
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="letter" className="bg-paper-deep py-16 md:py-24">
      <div className="sheet">
        <SectionMark
          index="04"
          kicker="Контакты"
          title="Связаться"
          lede="Расскажите о задаче по сайту или мобильной проверке."
        />
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-pretty">
              Опишите ссылку на сайт, ожидаемый результат и сроки.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-xs tracking-kicker text-muted uppercase">Почта</dt>
                <dd className="mt-1">
                  <a className="border-b border-ink" href="mailto:elkin519128@internet.ru">
                    elkin519128@internet.ru
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-kicker text-muted uppercase">Город</dt>
                <dd className="mt-1">Работаю удалённо по России</dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {sentName ? (
              <div role="status" className="border border-ink bg-paper p-6 md:p-10">
                <p className="text-xs tracking-kicker text-cinnabar uppercase">Контактная форма</p>
                <p className="mt-3 font-display text-section text-balance">{sentName === "DEMO" ? "Демонстрационный режим" : `Спасибо, ${sentName}.`}</p>
                <p className="mt-4 max-w-md text-pretty text-muted">
                  Почта получателя не настроена. Чтобы включить создание письма в почтовом приложении, задайте VITE_CONTACT_EMAIL в файле .env.local. Автоматической отправки с сервера нет.
                </p>
                <button
                  type="button"
                  className="press mt-8 inline-flex min-h-11 items-center border-b border-ink"
                  onClick={() => {
                    setSentName(null);
                    setValues(empty);
                    setErrors({});
                  }}
                >
                  Написать другое
                </button>
              </div>
            ) : (
              <form noValidate className="grid gap-6" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="name" className="text-xs tracking-kicker text-muted uppercase">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={80}
                    value={values.name}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Мария Кольцова"
                    onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                    className="h-12 w-full border-b border-rule bg-transparent text-ink outline-none placeholder:text-muted focus:border-ink"
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-sm text-cinnabar">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="text-xs tracking-kicker text-muted uppercase">
                    Почта
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={120}
                    value={values.email}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="maria@pochta.ru"
                    onChange={(event) =>
                      setValues((current) => ({ ...current, email: event.target.value }))
                    }
                    className="h-12 w-full border-b border-rule bg-transparent text-ink outline-none placeholder:text-muted focus:border-ink"
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-2 text-sm text-cinnabar">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <fieldset>
                  <legend className="text-xs tracking-kicker text-muted uppercase">Тема</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topics.map((topic) => {
                      const selected = values.topic === topic.id;
                      return (
                        <label
                          key={topic.id}
                          className={cn(
                            "choice press inline-flex min-h-11 cursor-pointer items-center border px-4 text-sm",
                            selected
                              ? "border-ink bg-ink text-paper"
                              : "border-rule bg-transparent text-ink",
                          )}
                        >
                          <input
                            type="radio"
                            name="topic"
                            value={topic.id}
                            checked={selected}
                            className="sr-only"
                            onChange={() =>
                              setValues((current) => ({ ...current, topic: topic.id }))
                            }
                          />
                          {topic.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="message" className="text-xs tracking-kicker text-muted uppercase">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={800}
                    value={values.message}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    placeholder="Коротко: что за задача, срок и где это будет жить."
                    onChange={(event) =>
                      setValues((current) => ({ ...current, message: event.target.value }))
                    }
                    className="mt-2 w-full resize-y border border-rule bg-transparent px-3 py-3 text-ink outline-none placeholder:text-muted focus:border-ink"
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-sm text-cinnabar">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="press inline-flex min-h-12 items-center justify-center bg-cinnabar px-6 text-paper hover:bg-cinnabar-deep"
                  >
                    Отправить в редакцию
                  </button>
                  <p className="max-w-xs text-sm text-pretty text-muted">
                    После настройки адреса откроется почтовое приложение пользователя. Автоматической отправки нет.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
