import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.svg";

const navItems = [
  { to: "/", label: "Главная", end: true },
  { to: "/services", label: "Услуги" },
  { to: "/projects", label: "Проекты" },
  { to: "/about", label: "О компании" },
  { to: "/contact", label: "Контакты" },
];

const serviceLinks = [
  { to: "/services?service=audit", label: "Аудит объекта" },
  { to: "/services?service=modeling", label: "Расчёт риска" },
  { to: "/services?service=modeling", label: "FDS-моделирование" },
  { to: "/services?service=design", label: "СТУ и экспертиза" },
];

const scrollToConsultation = () => {
  document.getElementById("consultation")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

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

          <nav className="footer__nav" aria-label="Навигация в подвале">
            <h3 className="footer__title">Навигация</h3>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <nav className="footer__nav" aria-label="Услуги в подвале">
            <h3 className="footer__title">Услуги</h3>
            {serviceLinks.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer__contacts">
            <h3 className="footer__title">Контакты</h3>
            <a href="tel:+74952807368">+7 (495) 280-73-68</a>
            <a href="mailto:info@profis-group.ru">info@profis-group.ru</a>
            <p>
              г. Москва, ул. 2-я Синичкина,
              <br />
              д. 9А, стр. 3
            </p>
            <button
              type="button"
              className="footer__button"
              onClick={scrollToConsultation}
            >
              Связаться с нами
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} ООО «ПРОФИС ГРУПП». Все права
            защищены.
          </p>
          <Link to="/privacy">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
