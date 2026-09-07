import React, { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";

const navItems = [
  { to: "/", label: "Главная", end: true },
  { to: "/services", label: "Услуги" },
  { to: "/projects", label: "Проекты" },
  { to: "/about", label: "О компании" },
  { to: "/contact", label: "Контакты" },
];

const scrollToConsultation = () => {
  document.getElementById("consultation")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleConsultationClick = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(scrollToConsultation);
  };

  return (
    <header className={`header${menuOpen ? " is-open" : ""}`}>
      <div className="container">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/" aria-label="Profis Group — на главную">
              <img src={logo} alt="Profis Group" />
            </Link>
          </div>

          <nav className="header__nav header__nav--desktop" aria-label="Основная навигация">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__button header__button--desktop"
              onClick={handleConsultationClick}
            >
              Получить расчет
            </button>

            <button
              type="button"
              className={`header__burger${menuOpen ? " is-active" : ""}`}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`header__drawer${menuOpen ? " is-open" : ""}`}
        id={menuId}
        aria-hidden={!menuOpen}
      >
        <nav className="header__nav header__nav--mobile" aria-label="Мобильная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="header__button header__button--mobile"
          onClick={handleConsultationClick}
        >
          Получить расчет
        </button>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Закрыть меню"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
