import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import mainImage from "../../assets/imgMain.svg";
import project1 from "../../assets/progect.png";
import project2 from "../../assets/progect2.png";
import project3 from "../../assets/progect3.png";
import clientLogo from "../../assets/logo.svg";
import y1 from "../../assets/y1.svg";
import y2 from "../../assets/y2.svg";
import y3 from "../../assets/y3.svg";
import y4 from "../../assets/y4.svg";
import y5 from "../../assets/y5.svg";
import y6 from "../../assets/y6.svg";
import e1 from "../../assets/e33.svg";
import e2 from "../../assets/e42.svg";
import e3 from "../../assets/e11.svg";
import e4 from "../../assets/dog.svg";
import e5 from "../../assets/e5.svg";
import e6 from "../../assets/e6.svg";

const projectScrollAnimations = new WeakMap();

const whyIconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const WhyIcons = {
  building: (
    <svg {...whyIconProps}>
      <path d="M4 21V4h10v17" />
      <path d="M14 9h6v12" />
      <path d="M7 8h2M7 12h2M7 16h2M16.5 13h1.5M16.5 17h1.5" />
      <path d="M2 21h20" />
    </svg>
  ),
  factory: (
    <svg {...whyIconProps}>
      <path d="M3 21V10l5 3V10l5 3V7h8v14" />
      <path d="M7 21v-3M12 21v-3M17 21v-3" />
      <path d="M2 21h20" />
    </svg>
  ),
  chart: (
    <svg {...whyIconProps}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-4M12 16V9M16 16v-7" />
      <path d="M14 7l4-3 2 2" />
    </svg>
  ),
  landmark: (
    <svg {...whyIconProps}>
      <path d="M3 21h18" />
      <path d="M5 21V11l7-6 7 6v10" />
      <path d="M9 21v-5h6v5" />
      <path d="M9 14h6" />
    </svg>
  ),
  file: (
    <svg {...whyIconProps}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  ),
  gear: (
    <svg {...whyIconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  ),
  layers: (
    <svg {...whyIconProps}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  ),
  check: (
    <svg {...whyIconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.3 2.3 4.7-5" />
    </svg>
  ),
};

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const restoreProjectSnap = (slider) => {
  slider.style.scrollSnapType = "";
};

const stopProjectScroll = (slider) => {
  const animationFrame = projectScrollAnimations.get(slider);
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
    projectScrollAnimations.delete(slider);
  }
  restoreProjectSnap(slider);
};

const animateProjectScroll = (slider, target, duration, onComplete) => {
  stopProjectScroll(slider);

  const start = slider.scrollLeft;
  const distance = target - start;

  if (Math.abs(distance) < 1) {
    onComplete?.(slider);
    return;
  }

  const resolvedDuration =
    duration ?? Math.min(1400, Math.max(850, Math.abs(distance) * 0.55));

  // Snap fights RAF scrollLeft updates and makes the carousel stutter.
  slider.style.scrollSnapType = "none";

  const startedAt = performance.now();

  const animate = (time) => {
    const progress = Math.min((time - startedAt) / resolvedDuration, 1);
    const easedProgress = easeInOutCubic(progress);

    slider.scrollLeft = start + distance * easedProgress;

    if (progress < 1) {
      const animationFrame = window.requestAnimationFrame(animate);
      projectScrollAnimations.set(slider, animationFrame);
    } else {
      slider.scrollLeft = target;
      projectScrollAnimations.delete(slider);
      restoreProjectSnap(slider);
      onComplete?.(slider);
    }
  };

  const animationFrame = window.requestAnimationFrame(animate);
  projectScrollAnimations.set(slider, animationFrame);
};

const getProjectLoopWidth = (slider) => slider.scrollWidth / 2;

const normalizeProjectLoop = (slider) => {
  const loopWidth = getProjectLoopWidth(slider);
  if (loopWidth <= 0) return;

  if (slider.scrollLeft >= loopWidth - 1) {
    slider.style.scrollSnapType = "none";
    slider.scrollLeft -= loopWidth;
    restoreProjectSnap(slider);
  }
};

const getProjectScrollTarget = (slider, direction) => {
  const cards = Array.from(slider.querySelectorAll(".main__projects-card"));
  const currentPosition = slider.scrollLeft;
  const sliderLeft = slider.getBoundingClientRect().left;
  const positions = cards.map(
    (card) => currentPosition + card.getBoundingClientRect().left - sliderLeft,
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
    task: "Подготовить комплекс расчётных обоснований для уникального общественного здания.",
    services: ["Расчёт риска", "FDS-моделирование", "СТУ"],
    result: "Документация подготовлена к прохождению экспертизы.",
  },
  {
    image: project2,
    title: "Усадьба «Дивноморское»",
    type: "Комплекс зданий",
    location: "Краснодарский край",
    year: "2020",
    task: "Определить требования пожарной безопасности для территории со сложной архитектурой.",
    services: ["Категорирование", "Расчёт риска", "МОПБ"],
    result: "Сформирован комплект обоснований для проектных решений.",
  },
  {
    image: project3,
    title: "Хореографическая академия",
    type: "Образовательный объект",
    location: "Севастополь",
    year: "2024",
    task: "Обосновать безопасность объекта с учебными, общественными и сценическими пространствами.",
    services: ["FDS-моделирование", "Расчёт риска", "Экспертиза"],
    result: "Расчётные материалы подготовлены для согласования.",
  },
];

const loopedProjects = [...projects, ...projects];

const reasons = [
  {
    number: "01",
    title: "Полный цикл",
    text: "Ведём объект от аудита и расчётов до сопровождения в экспертизе — один ответственный подрядчик на всех этапах.",
    points: ["Аудит", "Расчёты", "Проект", "Экспертиза", "Сопровождение"],
    footer: "Комплексный подход",
    listStyle: "dots",
    tone: "dark",
  },
  {
    number: "02",
    title: "Сложные объекты",
    text: "Работаем с объектами любой категории и сложности, где стандартных решений недостаточно.",
    points: [
      { label: "Жилые комплексы", icon: "building" },
      { label: "Общественные здания", icon: "factory" },
      { label: "Промышленные объекты", icon: "chart" },
      { label: "Уникальные сооружения", icon: "landmark" },
    ],
    footer: "Опыт в реальных задачах",
    listStyle: "icons",
    tone: "light",
  },
  {
    number: "03",
    title: "Точный состав работ",
    text: "Обосновываем каждый раздел: расчёт, категории, FDS или СТУ. Без навязанных услуг.",
    points: [
      { label: "Анализ", icon: "file" },
      { label: "Расчёт", icon: "gear" },
      { label: "Проектирование", icon: "layers" },
      { label: "Согласование", icon: "check" },
    ],
    footer: "Прозрачная документация",
    listStyle: "icons",
    tone: "accent",
  },
  {
    number: "04",
    title: "До результата",
    text: "Не останавливаемся на передаче документов — сопровождаем проект до положительного заключения.",
    points: ["Замечания", "Защита", "Сдача", "Сопровождение"],
    footer: "Ответственность",
    listStyle: "dots",
    tone: "soft",
  },
];

const services = [
  {
    id: "design",
    number: "01",
    title: "Проектирование",
    tags: "МОПБ / СТУ / РД",
    text: "Разрабатываем проектную и рабочую документацию с учётом требований нормативной базы, особенностей объекта и актуальных рисков.",
    image: y1,
  },
  {
    id: "modeling",
    number: "02",
    title: "Расчёты и моделирование",
    tags: "РР / FDS / Категории",
    text: "Выполняем комплексные расчёты и компьютерное моделирование процессов пожара с использованием современных методик и ПО.",
    image: y2,
  },
  {
    id: "installation",
    number: "03",
    title: "Монтаж и обслуживание",
    tags: "Монтаж / ПНР / ТО",
    text: "Выполняем монтаж, пусконаладочные работы и техническое обслуживание систем пожарной безопасности и инженерных систем.",
    image: y3,
  },
  {
    id: "audit",
    number: "04",
    title: "Аудит и консалтинг",
    tags: "Аудит / Консалтинг / МЧС",
    text: "Проводим аудит объектов, анализ проектных решений и действующих систем, разрабатываем рекомендации по устранению нарушений.",
    image: y4,
  },
  {
    id: "systems",
    number: "05",
    title: "Системы пожарной безопасности",
    tags: "ПС / СОУЭ / АУПТ",
    text: "Проектируем, поставляем, монтируем и обслуживаем системы пожарной безопасности любой сложности.",
    image: y5,
  },
  {
    id: "consulting",
    number: "06",
    title: "Консалтинг и сопровождение",
    tags: "Консультации / Экспертиза",
    text: "Консультируем, сопровождаем и представляем ваши интересы при проектировании, согласовании и проверках.",
    image: y6,
  },
];

const steps = [
  {
    number: "01",
    phase: "Начало работ",
    title: "Аудит объекта",
    action:
      "Уточняем назначение, площадь, этажность и состав действующих систем. При необходимости проводим выезд на объект.",
    result:
      "Формируем техническое задание и определяем необходимый состав документации.",
    tags: ["Обследование", "Анализ", "Техническое задание", "Рекомендации"],
    image: e1,
  },
  {
    number: "02",
    phase: "Сбор данных",
    title: "Исходные данные",
    action:
      "Запрашиваем чертежи, спецификации и сведения об инженерных системах. Проверяем комплектность материалов.",
    result:
      "Вы получаете точный чек-лист. Недостающие данные помогаем восстановить.",
    tags: ["Чертежи", "Спецификации", "Чек-лист", "Восстановление"],
    image: e2,
  },
  {
    number: "03",
    phase: "Проектирование",
    title: "Варианты решения",
    action:
      "Просчитываем 2–3 сценария и обосновываем каждый раздел: расчёт риска, категории, FDS-моделирование или СТУ.",
    result: "Предлагаем прозрачный состав работ и стоимость без лишних услуг.",
    tags: ["Сценарии", "Обоснование", "Состав работ", "Стоимость"],
    image: e3,
  },
  {
    number: "04",
    phase: "Согласование",
    title: "Договор и график",
    action:
      "Фиксируем стоимость, сроки, этапы и ответственность сторон в договоре и графике работ.",
    result: "Условия проекта прозрачны и защищены документально.",
    tags: ["Договор", "График", "Этапы", "Сроки"],
    image: e4,
  },
  {
    number: "05",
    phase: "Реализация",
    title: "Расчёты и проектирование",
    action:
      "Работаем в лицензионном ПО: моделируем динамику пожара, определяем категории и разрабатываем СТУ.",
    result: "Готовим обоснованные решения, устойчивые к экспертной проверке.",
    tags: ["FDS", "Категории", "СТУ", "Документация"],
    image: e5,
  },
  {
    number: "06",
    phase: "Завершение",
    title: "Экспертиза и сдача",
    action:
      "Передаём итоговый комплект, отвечаем на замечания экспертов и защищаем выполненные расчёты.",
    result:
      "Вы получаете документацию для надзорных органов и сопровождение до результата.",
    tags: ["Экспертиза", "Защита", "Сдача", "Сопровождение"],
    image: e6,
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
  const servicesBoardRef = useRef(null);
  const serviceCardRefs = useRef([]);
  const whyBoardRef = useRef(null);
  const heroMediaRef = useRef(null);
  const heroStageRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const heroParallaxRef = useRef({
    mx: 0,
    my: 0,
    sy: 0,
    tx: 0,
    ty: 0,
    frame: 0,
    enabled: true,
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowScreen = window.matchMedia("(max-width: 800px)");
    const state = heroParallaxRef.current;
    const media = heroMediaRef.current;

    const applyTransforms = () => {
      if (heroStageRef.current) {
        heroStageRef.current.style.transform = `translate3d(${state.tx.toFixed(2)}px, ${state.ty.toFixed(2)}px, 0) scale(1.035)`;
      }
      if (heroOverlayRef.current) {
        heroOverlayRef.current.style.transform = `translate3d(${(-state.tx * 1.4).toFixed(2)}px, ${(-state.ty * 1.25).toFixed(2)}px, 0)`;
      }
    };

    const resetTransforms = () => {
      state.mx = 0;
      state.my = 0;
      state.sy = 0;
      state.tx = 0;
      state.ty = 0;
      if (heroStageRef.current) heroStageRef.current.style.transform = "";
      if (heroOverlayRef.current) heroOverlayRef.current.style.transform = "";
    };

    const tick = () => {
      const targetX = state.mx * 12;
      const targetY = state.my * 9 + state.sy;
      state.tx += (targetX - state.tx) * 0.09;
      state.ty += (targetY - state.ty) * 0.09;
      applyTransforms();

      const settled =
        Math.abs(targetX - state.tx) < 0.04 &&
        Math.abs(targetY - state.ty) < 0.04;

      if (settled || !state.enabled) {
        state.frame = 0;
        return;
      }

      state.frame = window.requestAnimationFrame(tick);
    };

    const requestTick = () => {
      if (!state.enabled || state.frame) return;
      state.frame = window.requestAnimationFrame(tick);
    };

    const syncEnabled = () => {
      state.enabled = !reduceMotion.matches && !narrowScreen.matches;
      if (!state.enabled) {
        if (state.frame) {
          cancelAnimationFrame(state.frame);
          state.frame = 0;
        }
        resetTransforms();
      }
    };

    const onScroll = () => {
      if (!state.enabled || !heroMediaRef.current) return;
      const rect = heroMediaRef.current.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress =
        (viewH * 0.42 - (rect.top + rect.height * 0.35)) / viewH;
      state.sy = Math.max(-12, Math.min(12, progress * 24));
      requestTick();
    };

    const onPointerMove = (event) => {
      if (!state.enabled || !heroMediaRef.current) return;
      const rect = heroMediaRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      state.mx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      state.my = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      requestTick();
    };

    const onPointerLeave = () => {
      if (!state.enabled) return;
      state.mx = 0;
      state.my = 0;
      requestTick();
    };

    syncEnabled();
    onScroll();
    reduceMotion.addEventListener("change", syncEnabled);
    narrowScreen.addEventListener("change", syncEnabled);
    window.addEventListener("scroll", onScroll, { passive: true });
    media?.addEventListener("pointermove", onPointerMove);
    media?.addEventListener("pointerleave", onPointerLeave);

    return () => {
      reduceMotion.removeEventListener("change", syncEnabled);
      narrowScreen.removeEventListener("change", syncEnabled);
      window.removeEventListener("scroll", onScroll);
      media?.removeEventListener("pointermove", onPointerMove);
      media?.removeEventListener("pointerleave", onPointerLeave);
      if (state.frame) cancelAnimationFrame(state.frame);
    };
  }, []);

  useEffect(() => {
    let animationFrame = null;

    const updateActiveSteps = () => {
      animationFrame = null;

      let nextProcessStep = 0;

      processCardRefs.current.forEach((card, index) => {
        const sticky = card?.querySelector(".main__process-card-sticky");
        if (!sticky) return;

        const stickyTop = 92 + index * 8;
        if (sticky.getBoundingClientRect().top <= stickyTop + 2) {
          nextProcessStep = index;
        }
      });

      setActiveProcessStep((currentStep) =>
        currentStep === nextProcessStep ? currentStep : nextProcessStep,
      );

      const servicesBoard = servicesBoardRef.current;
      if (servicesBoard) {
        const rect = servicesBoard.getBoundingClientRect();
        const scrollable = Math.max(
          servicesBoard.offsetHeight - window.innerHeight,
          1,
        );
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        const progress = (scrolled / scrollable) * (services.length - 1);

        serviceCardRefs.current.forEach((card, index) => {
          if (!card) return;

          const rawCardProgress =
            index === 0 ? 1 : Math.min(Math.max(progress - index + 1, 0), 1);
          const cardProgress =
            rawCardProgress *
            rawCardProgress *
            rawCardProgress *
            (rawCardProgress * (rawCardProgress * 6 - 15) + 10);

          // How many steps this card is ahead of the current scroll position.
          // 0 = current / in stack, 1 = next in deck, >1 = further in the pile.
          const depth = index - progress;
          const entryBase = Math.min(window.innerHeight * 0.5, 420);
          const entryDistance =
            depth > 1
              ? entryBase + (depth - 1) * 100
              : (1 - cardProgress) * entryBase;

          let opacity = 1;
          if (depth > 1.02) {
            // Hide cards deeper than the immediate next one.
            opacity = 0;
          } else if (cardProgress < 1) {
            // Next card peeking / rising onto the deck.
            opacity = 0.62 + cardProgress * 0.38;
          }

          card.style.setProperty("--service-progress", cardProgress);
          card.style.setProperty("--service-entry", `${entryDistance}px`);
          card.style.setProperty("--service-opacity", opacity);
          card.classList.toggle("is-visible", opacity > 0.02);
          card.classList.toggle("is-next", depth > 0 && depth <= 1.02);
        });
      }

      const board = whyBoardRef.current;
      if (board) {
        const rect = board.getBoundingClientRect();
        const scrollable = Math.max(board.offsetHeight - window.innerHeight, 1);
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        const nextWhyStep = Math.min(
          reasons.length - 1,
          Math.floor((scrolled / scrollable) * reasons.length),
        );

        setActiveWhyStep((currentStep) =>
          currentStep === nextWhyStep ? currentStep : nextWhyStep,
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
      const enoughTimePassed = Date.now() - projectsLastMoveRef.current >= 4000;
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
        slider.style.scrollSnapType = "none";
        slider.scrollLeft -= getProjectLoopWidth(slider);
        restoreProjectSnap(slider);
      }

      animateProjectScroll(
        slider,
        getProjectScrollTarget(slider, "right"),
        undefined,
        normalizeProjectLoop,
      );

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

    if (direction === "left" && slider.scrollLeft <= 8) {
      slider.style.scrollSnapType = "none";
      slider.scrollLeft += getProjectLoopWidth(slider);
    }

    animateProjectScroll(
      slider,
      getProjectScrollTarget(slider, direction),
      undefined,
      normalizeProjectLoop,
    );
  };

  const scrollToConsultation = () => {
    document
      .getElementById("consultation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="main">
      <div className="container">
        <section
          className="main__hero main__hero--enter"
          aria-labelledby="main-hero-title"
        >
          <div className="main__hero-content">
            <p className="main__hero-eyebrow">
              Инженерные расчёты · экспертиза
            </p>
            <h1 className="main__hero-title" id="main-hero-title">
              Обоснования,
              <br />
              которые проходят
              <br />
              <span className="main__hero-title-muted">экспертизу</span>
            </h1>
            <span className="main__hero-rule" aria-hidden="true" />
            <p className="main__hero-text">
              Расчёт пожарного риска, FDS-моделирование, СТУ и сопровождение до
              положительного заключения — для сложных объектов любого масштаба
              по всей России.
            </p>
            <button
              type="button"
              className="main__hero-button"
              onClick={() => {
                document
                  .getElementById("projects-title")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Смотреть проекты
              <span className="main__hero-button-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          <div className="main__hero-media" ref={heroMediaRef}>
            <div className="main__hero-stage" ref={heroStageRef}>
              <img
                src={mainImage}
                alt=""
                className="main__hero-image"
                decoding="async"
              />
            </div>

            <svg
              className="main__hero-overlay"
              ref={heroOverlayRef}
              viewBox="0 0 640 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g className="main__hero-overlay-grid" stroke="#9a9da3">
                <path d="M72 88H568" />
                <path d="M72 168H548" />
                <path d="M92 248H560" />
                <path d="M72 328H520" />
                <path d="M110 408H540" />
                <path d="M160 60V460" />
                <path d="M280 48V448" />
                <path d="M400 72V470" />
                <path d="M500 90V430" />
              </g>

              <g className="main__hero-overlay-net" stroke="#c51115">
                <path d="M168 412C210 360 248 300 286 236C318 182 352 140 402 118" />
                <path d="M286 236H402" />
                <path d="M402 118V236" />
                <path d="M402 236C438 248 478 278 510 318" />
              </g>

              <g className="main__hero-overlay-nodes">
                <circle cx="286" cy="236" r="4.5" />
                <circle cx="402" cy="118" r="4.5" />
                <circle cx="510" cy="318" r="4.5" />
                <circle cx="168" cy="412" r="3.5" />
              </g>
            </svg>
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
              <Link to="/projects" className="main__projects-all">
                Смотреть все
              </Link>
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
              if (sliderRef.current) {
                normalizeProjectLoop(sliderRef.current);
              }
            }}
            onPointerCancel={() => {
              projectsPausedRef.current = false;
              projectsLastMoveRef.current = Date.now();
              if (sliderRef.current) {
                normalizeProjectLoop(sliderRef.current);
              }
            }}
          >
            {loopedProjects.map((project, index) => (
              <article
                className="main__projects-card"
                key={`${project.title}-${index}`}
                data-reveal
                data-reveal-fade
                style={{
                  "--reveal-delay": `${Math.min(index % projects.length, 4) * 120}ms`,
                }}
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

        <section className="main__services" aria-labelledby="services-title">
          <div className="main__services-board" ref={servicesBoardRef}>
            <div className="main__services-sticky">
              <div className="main__services-header" data-reveal>
                <div>
                  <p className="main__section-eyebrow">наши услуги</p>
                  <h2 className="main__section-title" id="services-title">
                    Решения для пожарной безопасности объекта
                  </h2>
                </div>
                <p className="main__services-lead">
                  Полный цикл работ — от проектирования и расчётов до монтажа,
                  аудита и сопровождения. Листайте карточки или откройте нужное
                  направление.
                </p>
              </div>

              <ol className="main__services-deck">
                {services.map((service, index) => (
                  <li
                    className="main__services-card"
                    key={service.id}
                    ref={(node) => {
                      serviceCardRefs.current[index] = node;
                    }}
                    style={{
                      "--service-index": index,
                      "--service-offset": `${index * 42}px`,
                      "--service-progress": index === 0 ? 1 : 0,
                      "--service-opacity": index === 0 ? 1 : index === 1 ? 0.62 : 0,
                    }}
                  >
                    <article className="main__services-card-inner">
                      <div className="main__services-card-tab">
                        <span>{service.number}</span>
                        <h3>{service.title}</h3>
                      </div>

                      <div className="main__services-card-body">
                        <div className="main__services-card-copy">
                          <p className="main__services-card-kicker">
                            {service.tags}
                          </p>
                          <p className="main__services-card-text">
                            {service.text}
                          </p>

                          <div className="main__services-card-footer">
                            <Link
                              to={`/services?service=${service.id}`}
                              className="main__services-card-link"
                            >
                              Подробнее об услуге
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>

                        <div className="main__services-card-media">
                          <img
                            src={service.image}
                            alt=""
                            className="main__services-card-image"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
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
            <ol className="main__process-cards">
              {steps.map((step, index) => {
                const mediaSide = index % 2 === 0 ? "right" : "left";

                return (
                  <li
                    className={`main__process-card main__process-card--${
                      index % 2 === 0 ? "left" : "right"
                    } main__process-card--media-${mediaSide}${
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
                    <div
                      className={`main__process-card-sticky${
                        index === activeProcessStep ? " is-active" : ""
                      }`}
                    >
                      <span
                        className="main__process-card-number"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <article className="main__process-card-inner">
                        <div className="main__process-card-copy">
                          <p className="main__process-card-phase">
                            <span>{step.number}</span>
                            <span aria-hidden="true"> / </span>
                            {step.phase}
                          </p>
                          <h3 className="main__process-card-title">
                            {step.title}
                          </h3>

                          <div className="main__process-card-details">
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

                          <ul className="main__process-card-tags">
                            {step.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="main__process-card-media">
                          <img
                            src={step.image}
                            alt=""
                            className="main__process-card-image"
                            decoding="async"
                          />
                        </div>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="main__why" aria-labelledby="why-title">
          <div className="main__why-board" ref={whyBoardRef}>
            <div className="main__why-sticky">
              <div className="main__why-header">
                <p className="main__section-eyebrow">наши преимущества</p>
                <h2 className="main__section-title" id="why-title">
                  Почему с нами спокойнее
                </h2>
                <p className="main__why-lead">
                  Точные расчёты, прозрачный состав работ и сопровождение до
                  положительного заключения экспертизы.
                </p>
                <span className="main__why-header-rule" aria-hidden="true" />
              </div>

              <button
                type="button"
                className="main__why-cta"
                onClick={scrollToConsultation}
                aria-label="Связаться с нами"
              >
                <span className="main__why-cta-label">Связаться с нами</span>
                <span className="main__why-cta-icon" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
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
                      <span
                        className="main__why-card-number"
                        aria-hidden="true"
                      >
                        {reason.number}
                      </span>
                      <span
                        className="main__why-card-rule"
                        aria-hidden="true"
                      />
                      <h3 className="main__why-card-title">{reason.title}</h3>
                      <p className="main__why-card-text">{reason.text}</p>

                      <ul
                        className={`main__why-card-points main__why-card-points--${reason.listStyle}`}
                      >
                        {reason.points.map((point) => {
                          if (typeof point === "string") {
                            return <li key={point}>{point}</li>;
                          }

                          return (
                            <li key={point.label}>
                              <span className="main__why-card-icon">
                                {WhyIcons[point.icon]}
                              </span>
                              <span>{point.label}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <p className="main__why-card-footer">{reason.footer}</p>
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
                        aria-hidden={
                          index >= row.clients.length ? true : undefined
                        }
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
