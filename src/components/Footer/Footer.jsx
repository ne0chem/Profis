import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top" data-reveal>
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="Profis" />
            </Link>
            <p className="footer__brand-text">
              Инженерные расчёты и документация
              <br />
              для объектов любой сложности
            </p>
          </div>

          <div className="footer__nav">
            <h3 className="footer__title">Навигация</h3>
            <NavLink to="/" end>
              Главная
            </NavLink>
            <NavLink to="/services">Услуги</NavLink>
            <NavLink to="/projects">Проекты</NavLink>
            <NavLink to="/about">О компании</NavLink>
            <NavLink to="/contact">Контакты</NavLink>
          </div>

          <div className="footer__nav">
            <h3 className="footer__title">Услуги</h3>
            <span>Аудит объекта</span>
            <span>Расчёт риска</span>
            <span>FDS-моделирование</span>
            <span>СТУ и экспертиза</span>
          </div>

          <div className="footer__contacts">
            <h3 className="footer__title">Контакты</h3>
            <a href="tel:+74952807368">+7 (495) 280-73-68</a>
            <a href="mailto:info@profis-group.ru">info@profis-group.ru</a>
            <p>
              г. Москва, ул. 2-я Синичкина,
              <br />
              д. 9А, стр. 3
            </p>
            <button type="button" className="footer__button">
              Связаться с нами
            </button>
          </div>
        </div>

        <div
          className="footer__bottom"
          data-reveal
          style={{ "--reveal-delay": "160ms" }}
        >
          <p>© {new Date().getFullYear()} Profis. Все права защищены</p>
          <a href="/privacy">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
