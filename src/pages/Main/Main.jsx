import React, { useRef, useState } from "react";
import "./Main.css";
import mainImage from "../../assets/imgMain.svg";
import project1 from "../../assets/progect.png";
import project2 from "../../assets/progect2.png";
import project3 from "../../assets/progect3.png";

const CARD_WIDTH = 484.8;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

const projects = [
  {
    image: project1,
    title: "Театр оперы и балета",
    text: "Севастополь 2024",
  },
  {
    image: project2,
    title: "Усадьба “Дивноморское”",
    text: "Краснодарский край 2020",
  },
  {
    image: project3,
    title: "Хореографическая академия",
    text: "Севастополь 2024",
  },
  {
    image: project1,
    title: "Театр оперы и балета",
    text: "Севастополь 2024",
  },
  {
    image: project2,
    title: "Усадьба “Дивноморское”",
    text: "Краснодарский край 2020",
  },
  {
    image: project3,
    title: "Хореографическая академия",
    text: "Севастополь 2024",
  },
];

export default function Main() {
  const [activeArrow, setActiveArrow] = useState(null);
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    setActiveArrow(direction);
    sliderRef.current?.scrollBy({
      left: direction === "left" ? -CARD_STEP : CARD_STEP,
      behavior: "smooth",
    });
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

        <section className="main__projects">
          <p className="main__projects-title">
            доверие ,подтвержденное проектами
          </p>
          <div className="main__projects-header">
            <p className="main__projects-header-title">Реализованные объекты</p>
            <div className="main__projects-header-button">
              <p className="main__projects-header-button-text">
                Смотреть все проекты
              </p>
              <button
                type="button"
                className={`main__projects-header-arrow${
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
                className={`main__projects-header-arrow${
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

          <div className="main__projects-slider" ref={sliderRef}>
            {projects.map((project, index) => (
              <article
                className="main__projects-card"
                key={`${project.title}-${index}`}
              >
                <div
                  className="main__projects-card-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                  role="img"
                  aria-label={project.title}
                />
                <div className="main__projects-card-info">
                  <p className="main__projects-slider-item-title">
                    {project.title}
                  </p>
                  <p className="main__projects-slider-item-text">
                    {project.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
