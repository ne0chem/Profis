import React, { useState } from "react";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import heroImage from "../../assets/projectMain.svg";
import { projects } from "./projectsData";
import "./Progects.css";

const scrollToConsultation = () => {
  document.getElementById("consultation")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Progects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="projects-page">
      <div className="container">
        <section
          className="projects-page__hero projects-page__hero--enter"
          aria-labelledby="projects-hero-title"
        >
          <div className="projects-page__hero-content">
            <p className="projects-page__eyebrow">наши проекты</p>
            <h1 className="projects-page__title" id="projects-hero-title">
              Реализованные проекты
              <br />
              <span className="projects-page__title-muted">
                в пожарной безопасности
              </span>
            </h1>
            <span className="projects-page__rule" aria-hidden="true" />
            <p className="projects-page__lead">
              Жилые, общественные, промышленные и уникальные объекты — от
              локальных решений до комплексного сопровождения.
            </p>
            <button
              type="button"
              className="projects-page__hero-button"
              onClick={scrollToConsultation}
            >
              Обсудить задачу
              <span
                className="projects-page__hero-button-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </button>
            <p className="projects-page__hero-tags">
              СТУ / МОПБ / Расчёт риска / FDS
            </p>
          </div>

          <div className="projects-page__hero-media">
            <img
              src={heroImage}
              alt=""
              className="projects-page__hero-image"
              decoding="async"
            />
          </div>
        </section>

        <section
          className="projects-page__catalog"
          aria-label="Каталог проектов"
        >
          <ul className="projects-page__grid">
            {projects.map((project, index) => {
              const row = Math.floor(index / 2);
              const isWide = row % 2 === 0 ? index % 2 === 0 : index % 2 === 1;

              return (
                <li
                  key={project.id}
                  className={`projects-page__card projects-page__card--${
                    isWide ? "wide" : "narrow"
                  }`}
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(index, 5) * 80}ms` }}
                >
                  <article
                    className="projects-page__card-trigger"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveProject(project);
                      }
                    }}
                    aria-label={`Открыть проект: ${project.title}`}
                  >
                    <div className="projects-page__card-media">
                      <img
                        src={project.image}
                        alt=""
                        className="projects-page__card-image"
                        decoding="async"
                        loading="lazy"
                      />
                      <span
                        className="projects-page__card-number"
                        aria-hidden="true"
                      >
                        {project.number}
                      </span>
                    </div>

                    <div className="projects-page__card-body">
                      <p className="projects-page__card-type">{project.type}</p>
                      <h2 className="projects-page__card-title">
                        {project.title}
                      </h2>
                      <span
                        className="projects-page__card-rule"
                        aria-hidden="true"
                      />
                      <p className="projects-page__card-meta">
                        <span>{project.location}</span>
                        <span
                          className="projects-page__card-meta-dot"
                          aria-hidden="true"
                        />
                        <span>{project.year}</span>
                      </p>

                      <ul className="projects-page__card-tags">
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
