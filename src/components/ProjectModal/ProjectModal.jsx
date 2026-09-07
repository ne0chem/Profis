import React, { useEffect, useId, useState } from "react";
import { fetchProjectDetails } from "../../pages/Progects/projectsApi";
import "./ProjectModal.css";

const scrollToConsultation = () => {
  document.getElementById("consultation")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function ProjectModal({ project, onClose }) {
  const titleId = useId();
  const [details, setDetails] = useState(project);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!project) return undefined;

    setDetails(project);
    setStatus("idle");

    let cancelled = false;

    const load = async () => {
      setStatus("loading");
      try {
        const remote = await fetchProjectDetails(project.id);
        if (cancelled) return;
        if (remote) {
          setDetails({ ...project, ...remote });
        }
        setStatus("idle");
      } catch (error) {
        if (cancelled) return;
        console.warn(error);
        setStatus("error");
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project || !details) return null;

  const handleDiscuss = () => {
    onClose();
    window.requestAnimationFrame(() => {
      scrollToConsultation();
    });
  };

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="project-modal__panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="project-modal__media">
          <img
            src={details.image}
            alt=""
            className="project-modal__image"
            decoding="async"
          />
          <span className="project-modal__number" aria-hidden="true">
            {details.number}
          </span>
        </div>

        <div className="project-modal__content">
          <p className="project-modal__type">{details.type}</p>
          <h2 className="project-modal__title" id={titleId}>
            {details.title}
          </h2>
          <span className="project-modal__rule" aria-hidden="true" />
          <p className="project-modal__meta">
            <span>{details.location}</span>
            <span className="project-modal__meta-dot" aria-hidden="true" />
            <span>{details.year}</span>
          </p>

          {details.summary ? (
            <p className="project-modal__summary">{details.summary}</p>
          ) : null}

          {status === "loading" ? (
            <p className="project-modal__status">Загрузка деталей…</p>
          ) : null}
          {status === "error" ? (
            <p className="project-modal__status project-modal__status--error">
              Не удалось подтянуть данные с сервера — показана локальная
              заглушка.
            </p>
          ) : null}

          {Array.isArray(details.tags) && details.tags.length > 0 ? (
            <ul className="project-modal__tags">
              {details.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}

          {Array.isArray(details.works) && details.works.length > 0 ? (
            <div className="project-modal__works">
              <p className="project-modal__works-label">Выполненные работы</p>
              <ul>
                {details.works.map((work) => (
                  <li key={work}>{work}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <button
            type="button"
            className="project-modal__button"
            onClick={handleDiscuss}
          >
            Обсудить похожий проект
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
