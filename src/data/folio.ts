export type CategoryId = "identity" | "editorial" | "space" | "digital";

export type FilterId = "all" | CategoryId;

export type Project = {
  id: string;
  index: string;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  carriers: string;
  dek: string;
  story: string;
  image: string;
  alt: string;
};

export const categories: { id: FilterId; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "identity", label: "Идентичность" },
  { id: "editorial", label: "Редактура" },
  { id: "space", label: "Пространство" },
  { id: "digital", label: "Цифра" },
];

export const nav = [
  { href: "#works", id: "works", label: "Работы", note: "восемь вещей" },
  { href: "#about", id: "about", label: "Обо мне", note: "практика" },
  { href: "#skills", id: "skills", label: "Навыки", note: "указатель" },
  { href: "#letter", id: "letter", label: "Письмо", note: "в редакцию" },
] as const;

export const projects: Project[] = [
  { id: "grok-demo", index: "01", title: "Журнальное портфолио", category: "digital", categoryLabel: "Сайты", year: "2026", client: "Демонстрационный проект", role: "AI-прототип, React, TypeScript", carriers: "Адаптивный сайт, интерактивные карточки", dek: "Демонстрационный сайт в журнальном стиле, созданный Grok и адаптированный для портфолио.", story: "Это демонстрация возможностей AI-разработки, а не оплаченный заказ. Исходный шаблон подготовлен Grok, затем переработан для Eklmn Digital. Форма контактов открывает почтовое приложение и не отправляет данные на сервер.", image: "/folio/pole.jpg", alt: "Пример журнального оформления сайта" },
  { id: "qa-demo", index: "02", title: "Экспресс-аудит сайта", category: "identity", categoryLabel: "QA-аудит", year: "2026", client: "Демонстрационный разбор", role: "Проверка текстов и интерфейса", carriers: "Предварительный отчёт", dek: "Пример анализа публичных страниц сайта с рекомендациями по исправлению.", story: "Предварительный демонстрационный разбор публичных страниц. Полноценное тестирование мобильного интерфейса и отправки форм не проводилось. Это не заказ клиента и не сертификат безопасности.", image: "/folio/kabinet.jpg", alt: "Иллюстрация к демонстрационному QA-отчёту" },
];
export const facts = [
  { label: "Формат", value: "Удалённо, по России" },
  { label: "Инструменты", value: "Android, AI, GitHub" },
  { label: "Услуги", value: "Сайты и QA-аудиты" },
  { label: "Статус", value: "Начинающий исполнитель" },
];
export const timeline = [
  { year: "2026", text: "Начало практики создания сайтов с AI-инструментами." },
  { year: "2026", text: "Первый демонстрационный сайт на основе сборки Grok." },
  { year: "2026", text: "Подготовлен предварительный образец QA-анализа." },
];
export const skillGroups = [
  { index: "01", title: "Разработка", items: ["React и TypeScript с AI", "Адаптивные страницы", "Работа с исходниками", "GitHub"] },
  { index: "02", title: "Проверка", items: ["Мобильная навигация", "Проверка текстов", "Документирование ошибок", "QA-отчёты"] },
  { index: "03", title: "Рабочий процесс", items: ["Техническое задание", "Прототипирование", "Доработка", "Проверка результата"] },
];
export function worksWord(count: number) { return count === 1 ? "работа" : "работы"; }
