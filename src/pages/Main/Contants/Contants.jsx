import React from "react";
import heroImage from "../../../assets/image3.svg";
import "./Contants.css";

const channels = [
  {
    id: "phone",
    label: "телефон",
    value: "+7 (495) 280-73-68",
    href: "tel:+74952807368",
  },
  {
    id: "email",
    label: "почта",
    value: "info@profis-group.ru",
    href: "mailto:info@profis-group.ru",
  },
  {
    id: "address",
    label: "офис",
    value: "г. Москва, ул. 2-я Синичкина, д. 9А, стр. 3",
  },
  {
    id: "hours",
    label: "режим работы",
    value: "Пн–Пт 10:00–19:00",
  },
];

export default function Contants() {
  const scrollToConsultation = () => {
    document
      .getElementById("consultation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="contacts">
      <div className="container">
        <section
          className="contacts__hero contacts__hero--enter"
          aria-labelledby="contacts-hero-title"
        >
          <div className="contacts__hero-content">
            <p className="contacts__eyebrow">контакты</p>
            <h1 className="contacts__hero-title" id="contacts-hero-title">
              Офис и связь
              <br />
              <span className="contacts__hero-title-muted">
                для инженерных задач
              </span>
            </h1>
            <span className="contacts__hero-rule" aria-hidden="true" />
            <p className="contacts__hero-text">
              Напишите или позвоните — обсудим объект, состав расчётов и сроки
              сопровождения до экспертизы.
            </p>
            <button
              type="button"
              className="contacts__hero-button"
              onClick={scrollToConsultation}
            >
              Обсудить задачу
              <span className="contacts__hero-button-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="contacts__hero-tags">Телефон / Почта / Офис</p>
          </div>

          <div className="contacts__hero-media">
            <img
              src={heroImage}
              alt=""
              className="contacts__hero-image"
              decoding="async"
            />
          </div>
        </section>

        <section
          className="contacts__channels"
          aria-labelledby="contacts-channels-title"
        >
          <div className="contacts__section-head" data-reveal>
            <p className="contacts__eyebrow">каналы связи</p>
            <h2 className="contacts__title" id="contacts-channels-title">
              Как с нами связаться
            </h2>
          </div>

          <ul className="contacts__channel-grid">
            {channels.map((channel, index) => (
              <li key={channel.id}>
                <article
                  className="contacts__channel"
                  data-reveal
                  data-reveal-fade
                  style={{ "--reveal-delay": `${Math.min(index, 3) * 120}ms` }}
                >
                  <p className="contacts__channel-label">{channel.label}</p>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="contacts__channel-value contacts__channel-value--link"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="contacts__channel-value">{channel.value}</p>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="contacts__map-section" aria-labelledby="contacts-map-title">
          <div className="contacts__section-head" data-reveal>
            <p className="contacts__eyebrow">локация</p>
            <h2 className="contacts__title" id="contacts-map-title">
              Как добраться
            </h2>
            <p className="contacts__lead">
              Офис в Москве — ул. 2-я Синичкина, д. 9А, стр. 3.
            </p>
          </div>

          <div className="contacts__map" data-reveal data-reveal-fade>
            <iframe
              title="Карта офиса PROFIS"
              src="https://yandex.ru/map-widget/v1/?ll=37.718175%2C55.761695&z=16&pt=37.718175%2C55.761695%2Cpm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </div>
  );
}
