import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import yMain from "../../assets/yMain.svg";
import y1 from "../../assets/y1.svg";
import y2 from "../../assets/y2.svg";
import y3 from "../../assets/y3.svg";
import y4 from "../../assets/y4.svg";
import y5 from "../../assets/y5.svg";
import y6 from "../../assets/y6.svg";
import "./Services.css";

const directions = [
  {
    id: "design",
    number: "01",
    title: "Проектирование",
    tags: "СТУ / МОПБ / ПД",
    subtitle: "Проектные решения для безопасности объектов",
    text: "Разрабатываем проектную документацию 9-го раздела Постановления Правительства РФ от 16.02.2008 № 87 «О составе разделов проектной документации и требованиях к их содержанию» с учётом требований нормативной базы и особенностей объекта.",
    cta: "Обсудить проект",
    image: y1,
    imageAlt: "Проектирование решений пожарной безопасности",
    works: [
      "Разработка раздела № 9 «Мероприятия по обеспечению пожарной безопасности»",
      "Разработка специальных технических условий (СТУ)",
      "Корректировка специальных технических условий (СТУ)",
      "Разработка рабочей документации (РД)",
      "Проектирование СПС (пожарная сигнализация)",
      "Проектирование СОУЭ (система оповещения и управления эвакуацией)",
      "Проектирование АУПТ, АУГПТ, АУППТ (системы пожаротушения)",
      "Проектирование ВПВ (внутренний противопожарный водопровод)",
      "Проектирование спринклерных систем пожаротушения",
      "Проектирование дренчерных систем пожаротушения",
      "Консультирование и сопровождение при прохождении экспертизы",
      "Подготовка материалов для дальнейшего проектирования",
    ],
  },
  {
    id: "modeling",
    number: "02",
    title: "Расчёты и моделирование",
    tags: "РР / FDS / РК",
    subtitle: "Инженерные расчёты для обоснованных решений",
    text: "Выполняем комплексные расчёты и компьютерное моделирование процессов распространения опасных факторов пожара, тепловых потоков, а также систем противодымной вентиляции. ",
    cta: "Обсудить расчёты",
    image: y2,
    imageAlt: "Расчёты и моделирование процессов пожара",
    works: [
      "Производство расчёта по оценке индивидуального пожарного риска",
      "FDS моделирование системы противодымной вентиляции",
      "Расчёт пожарной нагрузки",
      "Категорирование помещений по взрывопожарной и пожарной опасности",
      "Расчёт тепловых потоков при обосновании сокращения противопожарных расстояний между зданиями",
      "Оценка эффективности систем противопожарной защиты",
      "Расчёт времени эвакуации",
      "Моделирование сценариев развития пожара",
      "Рицензирование расчетов компьтерного моделирования вобласти пожарной безопасности",
      "Подготовка отчётной документации по результатам расчётов и моделирования",
      "Сопровождение при прохождении экспертизы",
      "Консультирование по результатам расчётов",
    ],
  },
  {
    id: "installation",
    number: "03",
    title: "Монтаж и обслуживание",
    tags: "АПС / СОУЭ / АУПТ / СПЗ",
    subtitle: "Надёжные системы залог вашей безопасности",
    text: "Выполняем монтаж, пусконаладочные работы и техническое обслуживание систем пожарной безопасности и инженерных систем. Обеспечиваем бесперебойную и корректную работу оборудования на всех этапах жизненного цикла объекта.",
    cta: "Обсудить монтаж",
    image: y3,
    imageAlt: "Монтаж и обслуживание систем пожарной безопасности",
    works: [
      "Монтаж систем пожарной сигнализации (СПС)",
      "Монтаж систем оповещения и управления эвакуацией (СОУЭ)",
      "Монтаж автоматических систем пожаротушения (АУПТ, АУГПТ, АУППТ)",
      "Монтаж систем противодымной вентиляции (ПДВ)",
      "Монтаж систем охранной сигнализации (ОС)",
      "Монтаж систем контроля и управления доступом (СКУД)",
      "Монтаж систем видеонаблюдения (СВН)",
      "Пусконаладочные работы",
      "Техническое обслуживание и регламентные работы",
      "Модернизация существующих систем",
      "Аварийное обслуживание и оперативный выезд",
      "Поставка оборудования и расходных материалов",
    ],
  },
  {
    id: "audit",
    number: "04",
    title: "Аудит, экспертиза и консалтинг",
    tags: "Аудит / Консалтинг / Экспертиза",
    subtitle: "Иследование проблемных решений и экспертная оценка",
    text: "Проводим аудит объектов, иследование проектных решений и действующих систем, разрабатываем рекомендации по устранению нарушений и повышению уровня пожарной безопасности.",
    cta: "Заказать аудит",
    image: y4,
    imageAlt: "Аудит и консалтинг по пожарной безопасности",
    works: [
      "Обследование объектов и систем противопожарной защиты",
      "Иследование проектной и исполнительной и исполнительной документации",
      "Оценка соответствия требованиям нормативной базы",
      "Разработка рекомендаций по устранению нарушений",
      "Консультирование на всех этапах проекта",
      "Подготовка к проверкам надзорных органов",
      "Сопровождение при взаимодействии с МЧС",
      "Раследование пожаров и производство судебных пожарно-технических экспертиз. Представление интересов в суде",
      "Независимая оценка пожарных рисков",
      "Техническое заключение специалиста/независимое экспертное заключение в области пожарной безопасности",
      "Сопровождение при реконструкции и изменении функционального назначения",
      "Комплексные решения по повышению уровня пожарной безопасности",
    ],
  },
  {
    id: "systems",
    number: "05",
    title: "Системы пожарной безопасности",
    tags: "ПС / СОУЭ / АУПТ",
    subtitle: "Комплексные решения для пожарной безопасности",
    text: "Проектируем, поставляем, монтируем и обслуживаем системы пожарной безопасности любой сложности. Обеспечиваем надёжную защиту жизни и имущества.",
    cta: "Подробнее об услуге",
    image: y5,
    imageAlt: "Системы пожарной безопасности",
    works: [
      "Системы пожарной сигнализации (ПС)",
      "Системы оповещения и управления эвакуацией (СОУЭ)",
      "Системы автоматического пожаротушения (АУПТ)",
      "Противопожарное водоснабжение (ВПВ)",
      "Дымоудаление и подпор воздуха",
      "Поставка оборудования и комплектующих",
      "Монтаж и пусконаладочные работы",
      "Техническое обслуживание и регламентные проверки",
      "Разработка специальной документации",
      "Интеграция с инженерными системами здания",
      "Модернизация и реконструкция действующих систем",
      "Консультации и сопровождение при проверках",
    ],
  },
  {
    id: "consulting",
    number: "06",
    title: "Сопровождение",
    tags: "Консультации / Экспертиза",
    subtitle: "Экспертная поддержка на всех этапах",
    text: "Консультируем, сопровождаем и представляем ваши интересы при проектировании, согласовании и проверках. Помогаем пройти все этапы — от разработки документации до ввода объекта в эксплуатацию.",
    cta: "Получить консультацию",
    image: y6,
    imageAlt: "Консалтинг и сопровождение по пожарной безопасности",
    works: [
      "Консультирование по требованиям пожарной безопасности",
      "Техническое сопровождение при прохождении экспертизы",
      "Подготовка материалов для проектирования",
      "Экспертная оценка проектно-технических решений",
      "Представительство интересов заказчика при проверках",
      "Сопровождение при взаимодействии с надзорными органами",
      "Подготовка к проверкам контролирующих органов",
      "Актуализация документации и внесение изменений",
      "Консультационная поддержка на всех этапах реализации",
      "Контроль соответствия нормативным требованиям",
      "Сопровождение до ввода объекта в эксплуатацию",
      "Долгосрочное сопровождение и сервисное консультирование",
    ],
  },
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const [activeId, setActiveId] = useState(null);

  const activeIndex = directions.findIndex((item) => item.id === activeId);
  const activeDirection = activeIndex >= 0 ? directions[activeIndex] : null;
  const nextDirection =
    activeIndex >= 0 ? directions[(activeIndex + 1) % directions.length] : null;

  const scrollToConsultation = () => {
    document
      .getElementById("consultation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCardClick = (id) => {
    setActiveId(id);
  };

  const goToNextDirection = () => {
    if (!nextDirection) return;
    setActiveId(nextDirection.id);
  };

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (!serviceId) return;
    if (!directions.some((item) => item.id === serviceId)) return;
    setActiveId(serviceId);
  }, [searchParams]);

  useEffect(() => {
    if (!activeId) return undefined;

    const panel = document.getElementById("services-direction-panel");
    if (!panel) return undefined;

    panel.classList.remove("is-animated");
    // force reflow so the enter animation can replay on each selection
    void panel.offsetWidth;
    panel.classList.add("is-animated");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });

    return undefined;
  }, [activeId]);

  return (
    <div className="services">
      <div className="container">
        <section
          className="services__hero services__hero--enter"
          aria-labelledby="services-hero-title"
        >
          <div className="services__hero-content">
            <p className="services__hero-eyebrow">услуги</p>
            <h1 className="services__hero-title" id="services-hero-title">
              Ваш партнёр
              <br />
              <span className="services__hero-title-muted">
                в пожарной безопасности
              </span>
            </h1>
            <span className="services__hero-rule" aria-hidden="true" />
            <p className="services__hero-text">
              Проектирование, расчёты, моделирование, исследования и
              сопровождение объектов любой сложности — в одной точке
              ответственности.
            </p>
            <button
              type="button"
              className="services__hero-button"
              onClick={scrollToConsultation}
            >
              Обсудить задачу
              <span className="services__hero-button-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="services__hero-tags">СТУ / МПОБ / РР / РСС</p>
          </div>

          <div className="services__hero-media">
            <img
              src={yMain}
              alt=""
              className="services__hero-image"
              decoding="async"
            />
          </div>
        </section>

        <section
          className="services__directions"
          aria-labelledby="services-directions-title"
        >
          <div className="services__directions-head" data-reveal>
            <div className="services__directions-heading">
              <p className="services__directions-eyebrow">направления работ</p>
              <h2
                className="services__directions-title"
                id="services-directions-title"
              >
                Комплексные услуги для безопасности объектов
              </h2>
            </div>
            <p className="services__directions-lead">
              Полный цикл работ — от проектирования и расчётов до сопровождения
              на проверках и экспертизы. Выберите направление, чтобы открыть
              состав услуг.
            </p>
          </div>

          <ul className="services__directions-grid">
            {directions.map((direction, index) => {
              const isActive = activeId === direction.id;

              return (
                <li
                  key={direction.id}
                  data-reveal
                  data-reveal-fade
                  style={{
                    "--reveal-delay": `${Math.min(index, 5) * 80}ms`,
                  }}
                >
                  <button
                    type="button"
                    className={`services__direction-card${
                      isActive ? " is-active" : ""
                    }`}
                    aria-expanded={isActive}
                    aria-controls="services-direction-panel"
                    onClick={() => handleCardClick(direction.id)}
                  >
                    <span className="services__direction-number">
                      {direction.number}
                    </span>
                    <span className="services__direction-card-title">
                      {direction.title}
                    </span>
                    <span className="services__direction-tags">
                      {direction.tags}
                    </span>
                    <span
                      className="services__direction-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {activeDirection ? (
            <div
              className="services__direction-panel"
              id="services-direction-panel"
            >
              <div className="services__direction-panel-top">
                <span className="services__direction-panel-number">
                  {activeDirection.number}
                </span>
                {nextDirection ? (
                  <button
                    type="button"
                    className="services__direction-next"
                    onClick={goToNextDirection}
                  >
                    Далее: {nextDirection.title}
                    <span aria-hidden="true">→</span>
                  </button>
                ) : null}
              </div>

              <div className="services__direction-panel-main">
                <div className="services__direction-panel-copy">
                  <h3 className="services__direction-panel-title">
                    {activeDirection.title}
                  </h3>
                  <p className="services__direction-panel-subtitle">
                    {activeDirection.subtitle}
                  </p>
                  <p className="services__direction-panel-text">
                    {activeDirection.text}
                  </p>
                  <button
                    type="button"
                    className="services__direction-cta"
                    onClick={scrollToConsultation}
                  >
                    {activeDirection.cta}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="services__direction-media">
                  {activeDirection.image ? (
                    <img
                      src={activeDirection.image}
                      alt={activeDirection.imageAlt || ""}
                      className="services__direction-media-image"
                      decoding="async"
                    />
                  ) : (
                    <span className="services__direction-media-label">
                      Изображение направления
                    </span>
                  )}
                </div>
              </div>

              <div className="services__direction-works">
                <p className="services__direction-works-eyebrow">виды работ</p>
                <ul className="services__direction-works-grid">
                  {activeDirection.works.map((work, index) => {
                    const tones = [
                      "white",
                      "soft",
                      "dash",
                      "soft",
                      "dash",
                      "white",
                      "muted",
                      "dash",
                      "soft",
                      "dash",
                      "white",
                      "soft",
                    ];
                    const tone = tones[index % tones.length];

                    return (
                      <li
                        key={work}
                        className={`services__direction-work services__direction-work--${tone}`}
                      >
                        <p className="services__direction-work-text">{work}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
