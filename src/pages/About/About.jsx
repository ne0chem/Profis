import React, { useEffect, useState } from "react";
import heroImage from "../../assets/main2.svg";
import liz1 from "../../assets/liz1.svg";
import liz2 from "../../assets/liz2.svg";
import liz3 from "../../assets/liz3.png";
import "./About.css";

const licenses = [
  {
    id: "liz1",
    src: liz1,
    title: "Разрешительная документация",
    meta: "Допуск к работам",
  },
  {
    id: "liz2",
    src: liz2,
    title: "Лицензия МЧС",
    meta: "№ 77-Б/02974",
  },
  {
    id: "liz3",
    src: liz3,
    title: "Сертификат соответствия",
    meta: "Система сертификации",
  },
];

const audiences = [
  {
    title: "Заказчикам строительства",
    text: "Нужна понятная документация и сопровождение до положительного заключения экспертизы.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 20V9.5L12 4l8 5.5V20H4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 20v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Генпроектировщикам",
    text: "Подключаемся точечно: расчёты, FDS, СТУ и защита решений в составе проектной команды.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 17L10 5l4 7 2-4 4 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Девелоперам и УК",
    text: "Работаем со сложными и уникальными объектами, где стандартных нормативных решений недостаточно.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 20V8l7-4 7 4v12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 20v-5h6v5M9 11h.01M15 11h.01M12 14h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Проектным командам",
    text: "Один ответственный подрядчик на всех этапах расчётов — без передачи между исполнителями.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3.5 19c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5M11.5 19c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const reasons = [
  {
    number: "01",
    title: "Полный цикл",
    text: "Ведём объект от аудита и расчётов до сопровождения в экспертизе — один подрядчик на всех этапах.",
  },
  {
    number: "02",
    title: "Сложные объекты",
    text: "Театры, академии, усадьбы и крупные комплексы, где стандартных нормативных решений недостаточно.",
  },
  {
    number: "03",
    title: "Точный состав работ",
    text: "Обосновываем каждый раздел: расчёт риска, категории, FDS или СТУ. Без навязанных услуг.",
  },
];

export default function About() {
  const [activeLicense, setActiveLicense] = useState(null);

  useEffect(() => {
    if (!activeLicense) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveLicense(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeLicense]);

  return (
    <div className="about">
      <div className="container">
        <section
          className="about__hero about__hero--enter"
          aria-labelledby="about-hero-title"
        >
          <div className="about__hero-content">
            <p className="about__hero-eyebrow">о компании</p>
            <h1 className="about__hero-title" id="about-hero-title">
              Инженерные расчёты
              <br />
              <span className="about__hero-title-muted">
                для сложных объектов
              </span>
            </h1>
            <span className="about__hero-rule" aria-hidden="true" />
            <p className="about__hero-text">
              Проектирование, моделирование и сопровождение объектов любой
              сложности — от аудита и FDS до СТУ и положительного заключения.
            </p>
            <button
              type="button"
              className="about__hero-button"
              onClick={() => {
                document
                  .getElementById("consultation")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Обсудить задачу
              <span className="about__hero-button-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="about__hero-tags">
              Проектирование / Расчёты / Сопровождение
            </p>
          </div>

          <div className="about__hero-media">
            <img
              src={heroImage}
              alt=""
              className="about__hero-image"
              decoding="async"
            />
          </div>
        </section>

        <section className="about__story" aria-labelledby="about-story-title">
          <div className="about__section-head" data-reveal>
            <p className="about__eyebrow">история</p>
            <h2 className="about__title" id="about-story-title">
              Как мы пришли к точным расчётам
            </h2>
          </div>

          <div className="about__story-grid">
            <article
              className="about__panel about__panel--soft about__panel--focus"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "0ms" }}
            >
              <div className="about__focus-mark" aria-hidden="true">
                <span>15+</span>
                <p>лет в инженерной безопасности</p>
              </div>
              <p className="about__panel-text">
                PROFIS вырос из практики сопровождения сложных объектов:
                театров, академий, усадеб и крупных общественных комплексов, где
                ошибка в расчёте стоит слишком дорого.
              </p>
            </article>

            <article
              className="about__panel about__panel--dark about__panel--origin"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "160ms" }}
            >
              <div className="about__origin-copy">
                <p className="about__panel-kicker">основа подхода</p>
                <p className="about__panel-lead">
                  Мы собираем не «пакет услуг», а доказательную базу для
                  экспертизы: от аудита и категорий до FDS-моделирования и СТУ.
                </p>
                <p className="about__panel-text about__panel-text--muted">
                  Каждый раздел обосновываем инженерно — без лишних работ и с
                  понятной ответственностью за результат.
                </p>
              </div>

              <div className="about__origin-aside">
                <p className="about__panel-kicker">в составе работ</p>
                <ul className="about__origin-list">
                  <li>Расчёт пожарного риска</li>
                  <li>FDS-моделирование</li>
                  <li>СТУ и категории</li>
                  <li>Сопровождение экспертизы</li>
                </ul>
                <p className="about__panel-text about__panel-text--on-dark">
                  Одна команда ведёт объект от старта до положительного
                  заключения — без передачи между подрядчиками.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="about__now" aria-labelledby="about-now-title">
          <div className="about__now-grid">
            <article
              className="about__panel about__panel--dark about__panel--now"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "0ms" }}
            >
              <p className="about__panel-kicker">profis сегодня</p>
              <h2 className="about__panel-title" id="about-now-title">
                Документация, которая проходит экспертизу
              </h2>
              <p className="about__panel-text about__panel-text--on-dark">
                Работаем по всей России с объектами разного масштаба: от
                культурных и образовательных зданий до комплексных территорий.
              </p>
              <p className="about__panel-text about__panel-text--on-dark">
                Ведём полный цикл — от исходных данных и расчётов до ответов на
                замечания экспертов и защиты принятых решений.
              </p>
            </article>

            <article
              className="about__panel about__panel--accent"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "140ms" }}
            >
              <p className="about__accent-label">главный принцип</p>
              <p className="about__accent-text">
                Точный состав работ.
                <br />
                Прозрачный результат.
                <br />
                Сопровождение до заключения.
              </p>
            </article>

            <article
              className="about__panel about__panel--soft about__panel--note"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "280ms" }}
            >
              <p className="about__panel-text">
                Не продаём лишние разделы. Если объекту достаточно расчёта риска
                — делаем расчёт риска. Если нужны СТУ — обосновываем именно их.
              </p>
              <p className="about__panel-text">
                Клиенту важно спокойствие на этапе экспертизы — на этом и
                держится наша работа.
              </p>
            </article>
          </div>
        </section>

        <section
          className="about__audience"
          aria-labelledby="about-audience-title"
        >
          <div className="about__section-head" data-reveal>
            <p className="about__eyebrow">аудитория</p>
            <h2 className="about__title" id="about-audience-title">
              Для кого мы делаем проекты
            </h2>
            <p className="about__lead">
              Подключаемся там, где нужны инженерные обоснования и уверенное
              прохождение экспертизы.
            </p>
          </div>

          <div className="about__audience-grid">
            {audiences.map((item, index) => (
              <article
                className="about__audience-card"
                key={item.title}
                data-reveal
                data-reveal-fade
                style={{ "--reveal-delay": `${Math.min(index, 4) * 120}ms` }}
              >
                <span className="about__audience-icon">{item.icon}</span>
                <h3 className="about__audience-title">{item.title}</h3>
                <p className="about__audience-text">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about__why" aria-labelledby="about-why-title">
          <div className="about__section-head" data-reveal>
            <p className="about__eyebrow">преимущества</p>
            <h2 className="about__title" id="about-why-title">
              Почему PROFIS
            </h2>
          </div>

          <div className="about__why-grid">
            {reasons.map((reason, index) => (
              <article
                className="about__reason"
                key={reason.number}
                data-reveal
                data-reveal-fade
                style={{ "--reveal-delay": `${Math.min(index, 3) * 120}ms` }}
              >
                <span className="about__reason-number" aria-hidden="true">
                  {reason.number}
                </span>
                <div className="about__reason-body">
                  <h3 className="about__reason-title">{reason.title}</h3>
                  <p className="about__reason-text">{reason.text}</p>
                </div>
              </article>
            ))}

            <article
              className="about__reason-closing"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "360ms" }}
            >
              <span className="about__reason-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7.5 12.5l3 3 6-6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="about__reason-closing-text">
                Безопасность — это работа профессионалов
              </p>
            </article>
          </div>
        </section>

        <section
          className="about__licenses"
          aria-labelledby="about-licenses-title"
        >
          <div className="about__section-head about__licenses-head" data-reveal>
            <p className="about__eyebrow">лицензии и допуски</p>
            <h2 className="about__title" id="about-licenses-title">
              Основания для работы
            </h2>
            <p className="about__lead">
              Документы, которыми подтверждаем право выполнять расчёты и
              сопровождать объекты до экспертизы. Нажмите на лист, чтобы открыть
              полный скан.
            </p>
          </div>

          <div className="about__licenses-shelf">
            <ul className="about__licenses-track">
              {licenses.map((license, index) => (
                <li key={license.id}>
                  <button
                    type="button"
                    className="about__license"
                    onClick={() => setActiveLicense(license)}
                    style={{ "--reveal-delay": `${Math.min(index, 4) * 120}ms` }}
                    data-reveal
                    data-reveal-fade
                  >
                    <span className="about__license-sheet">
                      <img
                        src={license.src}
                        alt=""
                        className="about__license-image"
                      />
                    </span>
                    <span className="about__license-caption">
                      <span className="about__license-title">
                        {license.title}
                      </span>
                      <span className="about__license-meta">
                        {license.meta}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {activeLicense ? (
        <div
          className="about__license-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeLicense.title}
          onClick={() => setActiveLicense(null)}
        >
          <button
            type="button"
            className="about__license-lightbox-close"
            onClick={() => setActiveLicense(null)}
            aria-label="Закрыть"
          >
            ×
          </button>
          <figure
            className="about__license-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeLicense.src}
              alt={`${activeLicense.title}. ${activeLicense.meta}`}
              className="about__license-lightbox-image"
            />
            <figcaption className="about__license-lightbox-caption">
              <strong>{activeLicense.title}</strong>
              <span>{activeLicense.meta}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
