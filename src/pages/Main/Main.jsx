import React, { useEffect, useRef, useState } from "react";
import "./Main.css";
import mainImage from "../../assets/imgMain.svg";
import project1 from "../../assets/progect.png";
import project2 from "../../assets/progect2.png";
import project3 from "../../assets/progect3.png";
import clientLogo from "../../assets/logo.svg";

const projectScrollAnimations = new WeakMap();

const stopProjectScroll = (slider) => {
  const animationFrame = projectScrollAnimations.get(slider);
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
    projectScrollAnimations.delete(slider);
  }
};

const animateProjectScroll = (slider, target, duration = 1300) => {
  stopProjectScroll(slider);

  const start = slider.scrollLeft;
  const distance = target - start;
  const startedAt = performance.now();

  const animate = (time) => {
    const progress = Math.min((time - startedAt) / duration, 1);
    const easedProgress = 0.5 - Math.cos(Math.PI * progress) / 2;

    slider.scrollLeft = start + distance * easedProgress;

    if (progress < 1) {
      const animationFrame = window.requestAnimationFrame(animate);
      projectScrollAnimations.set(slider, animationFrame);
    } else {
      projectScrollAnimations.delete(slider);
    }
  };

  const animationFrame = window.requestAnimationFrame(animate);
  projectScrollAnimations.set(slider, animationFrame);
};

const getProjectScrollTarget = (slider, direction) => {
  const cards = Array.from(
    slider.querySelectorAll(".main__projects-card")
  );
  const currentPosition = slider.scrollLeft;
  const sliderLeft = slider.getBoundingClientRect().left;
  const positions = cards.map(
    (card) =>
      currentPosition + card.getBoundingClientRect().left - sliderLeft
  );

  if (direction === "left") {
    return (
      positions
        .slice()
        .reverse()
        .find((position) => position < currentPosition - 8) ?? 0
    );
  }

  return (
    positions.find((position) => position > currentPosition + 8) ??
    slider.scrollWidth - slider.clientWidth
  );
};

const projects = [
  {
    image: project1,
    title: "Театр оперы и балета",
    type: "Культурный объект",
    location: "Севастополь",
    year: "2024",
    task:
      "Подготовить комплекс расчётных обоснований для уникального общественного здания.",
    services: ["Расчёт риска", "FDS-моделирование", "СТУ"],
    result: "Документация подготовлена к прохождению экспертизы.",
  },
  {
    image: project2,
    title: "Усадьба «Дивноморское»",
    type: "Комплекс зданий",
    location: "Краснодарский край",
    year: "2020",
    task:
      "Определить требования пожарной безопасности для территории со сложной архитектурой.",
    services: ["Категорирование", "Расчёт риска", "МОПБ"],
    result: "Сформирован комплект обоснований для проектных решений.",
  },
  {
    image: project3,
    title: "Хореографическая академия",
    type: "Образовательный объект",
    location: "Севастополь",
    year: "2024",
    task:
      "Обосновать безопасность объекта с учебными, общественными и сценическими пространствами.",
    services: ["FDS-моделирование", "Расчёт риска", "Экспертиза"],
    result: "Расчётные материалы подготовлены для согласования.",
  },
  {
    image: project1,
    title: "Театр оперы и балета",
    type: "Культурный объект",
    location: "Севастополь",
    year: "2024",
    task:
      "Подготовить комплекс расчётных обоснований для уникального общественного здания.",
    services: ["Расчёт риска", "FDS-моделирование", "СТУ"],
    result: "Документация подготовлена к прохождению экспертизы.",
  },
  {
    image: project2,
    title: "Усадьба «Дивноморское»",
    type: "Комплекс зданий",
    location: "Краснодарский край",
    year: "2020",
    task:
      "Определить требования пожарной безопасности для территории со сложной архитектурой.",
    services: ["Категорирование", "Расчёт риска", "МОПБ"],
    result: "Сформирован комплект обоснований для проектных решений.",
  },
  {
    image: project3,
    title: "Хореографическая академия",
    type: "Образовательный объект",
    location: "Севастополь",
    year: "2024",
    task:
      "Обосновать безопасность объекта с учебными, общественными и сценическими пространствами.",
    services: ["FDS-моделирование", "Расчёт риска", "Экспертиза"],
    result: "Расчётные материалы подготовлены для согласования.",
  },
];

const reasons = [
  {
    number: "1",
    title: "Полный цикл",
    text: "Ведём объект от аудита и расчётов до сопровождения в экспертизе — один ответственный подрядчик на всех этапах.",
    tone: "dark",
  },
  {
    number: "2",
    title: "Сложные объекты",
    text: "Работаем с театрами, академиями, усадьбами и крупными объектами, где стандартных решений недостаточно.",
    tone: "light",
  },
  {
    number: "3",
    title: "Точный состав работ",
    text: "Обосновываем каждый раздел: расчёт риска, категории, FDS или СТУ. Без навязанных услуг.",
    tone: "accent",
  },
  {
    number: "4",
    title: "До результата",
    text: "Не останавливаемся на передаче документов — сопровождаем проект до положительного заключения.",
    tone: "soft",
  },
];

const steps = [
  {
    number: "1",
    title: "Аудит объекта",
    action:
      "Уточняем назначение, площадь, этажность и состав действующих систем. Если данных недостаточно — направляем инженера на объект.",
    result:
      "Формируем техническое задание и определяем необходимый состав документации.",
  },
  {
    number: "2",
    title: "Исходные данные",
    action:
      "Запрашиваем чертежи, спецификации и сведения об инженерных системах. Проверяем комплектность материалов.",
    result:
      "Вы получаете точный чек-лист. Недостающие данные помогаем восстановить.",
  },
  {
    number: "3",
    title: "Варианты решения",
    action:
      "Просчитываем 2–3 сценария и обосновываем каждый раздел: расчёт риска, категории, FDS-моделирование или СТУ.",
    result:
      "Предлагаем прозрачный состав работ и стоимость без лишних услуг.",
  },
  {
    number: "4",
    title: "Договор и график",
    action:
      "Фиксируем стоимость, сроки, этапы и ответственность сторон в договоре и графике работ.",
    result:
      "Условия проекта прозрачны и защищены документально.",
  },
  {
    number: "5",
    title: "Расчёты и проектирование",
    action:
      "Работаем в лицензионном ПО: моделируем динамику пожара, определяем категории и разрабатываем СТУ.",
    result:
      "Готовим обоснованные решения, устойчивые к экспертной проверке.",
  },
  {
    number: "6",
    title: "Экспертиза и сдача",
    action:
      "Передаём итоговый комплект, отвечаем на замечания экспертов и защищаем выполненные расчёты.",
    result:
      "Вы получаете документацию для надзорных органов и сопровождение до результата.",
    final: true,
  },
];

const clientRows = [
  {
    id: "row-1",
    direction: "left",
    duration: "38s",
    clients: Array.from({ length: 8 }, (_, index) => ({
      id: `r1-${index + 1}`,
      logo: clientLogo,
      name: `Клиент ${index + 1}`,
    })),
  },
  {
    id: "row-2",
    direction: "right",
    duration: "52s",
    clients: Array.from({ length: 8 }, (_, index) => ({
      id: `r2-${index + 1}`,
      logo: clientLogo,
      name: `Клиент ${index + 9}`,
    })),
  },
  {
    id: "row-3",
    direction: "left",
    duration: "44s",
    clients: Array.from({ length: 8 }, (_, index) => ({
      id: `r3-${index + 1}`,
      logo: clientLogo,
      name: `Клиент ${index + 17}`,
    })),
  },
];

export default function Main() {
  const [activeArrow, setActiveArrow] = useState(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeWhyStep, setActiveWhyStep] = useState(0);
  const sliderRef = useRef(null);
  const projectsPausedRef = useRef(false);
  const projectsLastMoveRef = useRef(Date.now());
  const processCardRefs = useRef([]);
  const whyBoardRef = useRef(null);

  useEffect(() => {
    let animationFrame = null;

    const updateActiveSteps = () => {
      animationFrame = null;
      const activationLine = window.innerHeight * 0.38;

      let nextProcessStep = 0;
      processCardRefs.current.forEach((card, index) => {
        if (card && card.getBoundingClientRect().top <= activationLine) {
          nextProcessStep = index;
        }
      });

      setActiveProcessStep((currentStep) =>
        currentStep === nextProcessStep ? currentStep : nextProcessStep
      );

      const board = whyBoardRef.current;
      if (board) {
        const rect = board.getBoundingClientRect();
        const scrollable = Math.max(board.offsetHeight - window.innerHeight, 1);
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        const nextWhyStep = Math.min(
          reasons.length - 1,
          Math.floor((scrolled / scrollable) * reasons.length)
        );

        setActiveWhyStep((currentStep) =>
          currentStep === nextWhyStep ? currentStep : nextWhyStep
        );
      }
    };

    const handleViewportChange = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveSteps);
      }
    };

    updateActiveSteps();
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const sliderElement = sliderRef.current;

    const autoplayInterval = window.setInterval(() => {
      const slider = sliderElement;
      const enoughTimePassed =
        Date.now() - projectsLastMoveRef.current >= 4000;
      const sliderRect = slider?.getBoundingClientRect();
      const sliderIsVisible =
        sliderRect &&
        sliderRect.bottom > 0 &&
        sliderRect.top < window.innerHeight;

      if (
        !slider ||
        !sliderIsVisible ||
        projectsPausedRef.current ||
        document.hidden ||
        !enoughTimePassed
      ) {
        return;
      }

      const reachedEnd =
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 8;

      if (reachedEnd) {
        animateProjectScroll(slider, 0);
      } else {
        animateProjectScroll(slider, getProjectScrollTarget(slider, "right"));
      }

      setActiveArrow("right");
      projectsLastMoveRef.current = Date.now();
    }, 800);

    return () => {
      window.clearInterval(autoplayInterval);
      if (sliderElement) {
        stopProjectScroll(sliderElement);
      }
    };
  }, []);

  const scrollSlider = (direction) => {
    setActiveArrow(direction);
    const slider = sliderRef.current;
    if (!slider) return;

    projectsLastMoveRef.current = Date.now();
    animateProjectScroll(slider, getProjectScrollTarget(slider, direction));
  };

  const scrollToConsultation = () => {
    document
      .getElementById("consultation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="main">
      <div className="container">
        <section className="main__hero">
          <div className="main__hero-media">
            <div
              className="main__hero-image"
              style={{ backgroundImage: `url(${mainImage})` }}
              role="img"
              aria-label="Инженерные системы безопасности"
            />
            <div className="main__experience-card">
              <p className="main__experience-card-value">15</p>
              <p className="main__experience-card-label">
                лет опыта в сфере безопасности
              </p>
            </div>
          </div>

          <div className="main__hero-content">
            <p className="main__hero-eyebrow">
              Инженерные системы безопасности
            </p>
            <h1 className="main__hero-title">
              Безопасность
              <br />
              как стандарт
              <br />
              нашего проекта
            </h1>
            <p className="main__hero-text">
              Проектируем, внедряем и сопровождаем <br /> комплексные инженерные
              системы безопасности <br /> для объектов любого масштаба по всей
              России.
            </p>
            <button type="button" className="main__hero-button">
              Смотреть проекты
            </button>
          </div>

          <div className="main__stats">
            <div className="main__stats-item">
              <p className="main__stats-value">15</p>
              <p className="main__stats-label">лет опыта</p>
            </div>
            <div className="main__stats-item">
              <p className="main__stats-value">1200</p>
              <p className="main__stats-label">объектов по всей России</p>
            </div>
            <div className="main__stats-item">
              <p className="main__stats-value">24/7</p>
              <p className="main__stats-label">техническая поддержка</p>
            </div>
            <div className="main__stats-item">
              <p className="main__stats-value">100%</p>
              <p className="main__stats-label">соответствие нормам</p>
            </div>
          </div>
        </section>

        <section className="main__projects" aria-labelledby="projects-title">
          <div className="main__projects-header" data-reveal>
            <div className="main__projects-heading">
              <p className="main__section-eyebrow">портфель объектов</p>
              <h2 className="main__section-title" id="projects-title">
                Реализованные проекты
              </h2>
            </div>

            <div className="main__projects-controls">
              <button type="button" className="main__projects-all">
                Смотреть все
              </button>
              <div className="main__projects-arrows">
                <button
                  type="button"
                  className={`main__projects-arrow${
                    activeArrow === "left" ? " is-active" : ""
                  }`}
                  aria-label="Предыдущий"
                  onClick={() => scrollSlider("left")}
                >
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M15.75 6.75H0.75M6.375 12.75L0.75 6.75L6.375 0.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`main__projects-arrow${
                    activeArrow === "right" ? " is-active" : ""
                  }`}
                  aria-label="Следующий"
                  onClick={() => scrollSlider("right")}
                >
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M0.75 6.75H15.75M10.125 0.75L15.75 6.75L10.125 12.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="main__projects-slider"
            ref={sliderRef}
            onMouseEnter={() => {
              projectsPausedRef.current = true;
            }}
            onMouseLeave={() => {
              projectsPausedRef.current = false;
              projectsLastMoveRef.current = Date.now();
            }}
            onFocusCapture={() => {
              projectsPausedRef.current = true;
            }}
            onBlurCapture={() => {
              projectsPausedRef.current = false;
              projectsLastMoveRef.current = Date.now();
            }}
            onPointerDown={() => {
              projectsPausedRef.current = true;
              if (sliderRef.current) {
                stopProjectScroll(sliderRef.current);
              }
            }}
            onPointerUp={() => {
              projectsPausedRef.current = false;
              projectsLastMoveRef.current = Date.now();
            }}
            onPointerCancel={() => {
              projectsPausedRef.current = false;
              projectsLastMoveRef.current = Date.now();
            }}
          >
            {projects.map((project, index) => (
              <article
                className="main__projects-card"
                key={`${project.title}-${index}`}
                data-reveal
                data-reveal-fade
                style={{ "--reveal-delay": `${Math.min(index, 4) * 120}ms` }}
              >
                <div className="main__projects-card-media">
                  <div
                    className="main__projects-card-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                    role="img"
                    aria-label={project.title}
                  />
                </div>
                <div className="main__projects-card-info">
                  <div className="main__projects-card-heading">
                    <p className="main__projects-card-type">{project.type}</p>
                    <div className="main__projects-card-meta">
                      <span>{project.location}</span>
                      <span
                        className="main__projects-card-meta-dot"
                        aria-hidden="true"
                      />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <h3 className="main__projects-card-title">{project.title}</h3>

                  <div className="main__projects-card-details">
                    <div className="main__projects-card-task">
                      <p className="main__projects-card-label">Задача</p>
                      <p className="main__projects-card-copy">{project.task}</p>
                    </div>

                    <div>
                      <p className="main__projects-card-label">Выполнено</p>
                      <ul className="main__projects-card-services">
                        {project.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="main__projects-card-result">
                    <p className="main__projects-card-label">Результат</p>
                    <p className="main__projects-card-copy">{project.result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="main__process" aria-labelledby="process-title">
          <div className="main__process-header" data-reveal>
            <p className="main__section-eyebrow">как мы работаем</p>
            <h2 className="main__section-title" id="process-title">
              Путь к положительному заключению
            </h2>
            <p className="main__process-lead">
              Берём на себя весь процесс — от аудита объекта до защиты расчётов
              в экспертизе.
            </p>
          </div>

          <div className="main__process-story">
            <div
              className="main__process-stage-number"
              aria-hidden="true"
              data-reveal
              data-reveal-fade
              style={{ "--reveal-delay": "140ms" }}
            >
              <span
                className="main__process-stage-number-value"
                key={activeProcessStep}
              >
                {steps[activeProcessStep].number}
              </span>
            </div>

            <ol className="main__process-cards">
              {steps.map((step, index) => (
                <li
                  className={`main__process-card${
                    step.final ? " main__process-card--final" : ""
                  }`}
                  key={step.number}
                  ref={(node) => {
                    processCardRefs.current[index] = node;
                  }}
                  data-reveal
                  data-reveal-fade
                  style={{
                    "--card-index": index,
                    "--reveal-delay": `${Math.min(index, 2) * 110}ms`,
                  }}
                >
                  <article className="main__process-card-inner">
                    <div className="main__process-card-layout">
                      <div className="main__process-card-content">
                        <h3 className="main__process-card-title">
                          {step.title}
                        </h3>

                        <div className="main__process-card-copy">
                          <div>
                            <p className="main__process-card-label">
                              Что делаем
                            </p>
                            <p className="main__process-card-text">
                              {step.action}
                            </p>
                          </div>
                          <div className="main__process-card-result">
                            <p className="main__process-card-label">
                              Результат
                            </p>
                            <p className="main__process-card-text">
                              {step.result}
                            </p>
                          </div>
                        </div>

                        <div
                          className="main__process-card-progress"
                          aria-hidden="true"
                        >
                          {steps.map((_, segmentIndex) => (
                            <span
                              key={segmentIndex}
                              className={`main__process-card-progress-segment${
                                segmentIndex < index ? " is-complete" : ""
                              }${
                                segmentIndex === index ? " is-current" : ""
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="main__why" aria-labelledby="why-title">
          <div className="main__why-board" ref={whyBoardRef}>
            <div className="main__why-sticky">
              <div className="main__why-header" data-reveal>
                <p className="main__section-eyebrow">наши преимущества</p>
                <h2 className="main__section-title" id="why-title">
                  Почему с нами спокойнее
                </h2>
                <p className="main__why-lead">
                  Точные расчёты, прозрачный состав работ и сопровождение до
                  положительного заключения экспертизы.
                </p>
              </div>

              <button
                type="button"
                className="main__why-cta"
                onClick={scrollToConsultation}
              >
                <span>Связаться с нами</span>
                <span className="main__why-cta-icon" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 11L11 3M11 3H4.5M11 3V9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <ol className="main__why-stack">
                {reasons.map((reason, index) => (
                  <li
                    className={`main__why-slot${
                      index <= activeWhyStep ? " is-visible" : ""
                    }${activeWhyStep === index ? " is-active" : ""}`}
                    key={reason.number}
                    style={{ "--why-index": index }}
                  >
                    <article
                      className={`main__why-card main__why-card--${reason.tone}`}
                    >
                      <span className="main__why-card-number" aria-hidden="true">
                        {reason.number}
                      </span>
                      <div className="main__why-card-body">
                        <h3 className="main__why-card-title">{reason.title}</h3>
                        <p className="main__why-card-text">{reason.text}</p>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="main__clients" aria-labelledby="clients-title">
          <div className="main__clients-intro" data-reveal>
            <p className="main__section-eyebrow">нам доверяют</p>
            <h2 className="main__section-title" id="clients-title">
              Клиенты и партнёры
            </h2>
          </div>

          <div
            className="main__clients-marquee"
            aria-label="Логотипы клиентов"
            data-reveal
            style={{ "--reveal-delay": "180ms" }}
          >
            {clientRows.map((row) => (
              <div
                key={row.id}
                className={`main__clients-row main__clients-row--${row.direction}`}
                style={{ "--marquee-duration": row.duration }}
              >
                <ul className="main__clients-track">
                  {[...row.clients, ...row.clients].map((client, index) => (
                    <li
                      className="main__clients-item"
                      key={`${client.id}-${index}`}
                    >
                      <img
                        className="main__clients-logo"
                        src={client.logo}
                        alt={index < row.clients.length ? client.name : ""}
                        loading="lazy"
                        aria-hidden={index >= row.clients.length ? true : undefined}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
