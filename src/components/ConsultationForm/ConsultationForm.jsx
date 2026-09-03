import React, { useState } from "react";
import "./ConsultationForm.css";

export default function ConsultationForm() {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agreed) return;
  };

  return (
    <form className="consultation-form" onSubmit={handleSubmit}>
      <div className="consultation-form__content">
        <div>
          <h2 className="consultation-form__title">Готовы обсудить проект?</h2>

          <p className="consultation-form__text">
            Получить бесплатную консультацию и расчет стоимости под ваш объект
          </p>
        </div>
        <div>
          <label className="consultation-form__checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              required
            />
            <span>
              Согласен(на) с{" "}
              <a href="/privacy" className="consultation-form__link">
                политикой конфиденциальности
              </a>
            </span>
          </label>
          <button
            type="submit"
            className="consultation-form__submit"
            disabled={!agreed}
          >
            Отправить заявку
          </button>
        </div>
      </div>

      <div className="consultation-form__panel">
        <div className="consultation-form__contacts">
          <p className="consultation-form__panel-title">Контакты</p>
          <label className="consultation-form__field">
            <span className="consultation-form__label">Имя</span>
            <input
              className="consultation-form__input"
              type="text"
              name="name"
              placeholder="Анна Иванова"
              autoComplete="name"
              required
            />
          </label>
          <label className="consultation-form__field">
            <span className="consultation-form__label">Телефон</span>
            <input
              className="consultation-form__input"
              type="tel"
              name="phone"
              placeholder="+7 (999) 000-00-00"
              autoComplete="tel"
              required
            />
          </label>
          <label className="consultation-form__field">
            <span className="consultation-form__label">Email</span>
            <input
              className="consultation-form__input"
              type="email"
              name="email"
              placeholder="name@company.ru"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <div className="consultation-form__project">
          <p className="consultation-form__panel-title">О проекте</p>
          <label className="consultation-form__field consultation-form__field--project">
            <span className="consultation-form__label">Описание</span>
            <textarea
              className="consultation-form__textarea"
              name="project"
              placeholder="Объект, задачи, желаемые сроки"
            />
          </label>
        </div>
      </div>
    </form>
  );
}
