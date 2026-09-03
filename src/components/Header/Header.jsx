import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className="header__nav">
            <NavLink to="/" end>
              Главная
            </NavLink>
            <NavLink to="/services">Услуги</NavLink>
            <NavLink to="/projects">Проекты</NavLink>
            <NavLink to="/about">О компании</NavLink>
            <NavLink to="/contact">Контакты</NavLink>
          </nav>
          <div className="">
            <button className="header__button">Получить расчет</button>
          </div>
        </div>
      </div>
    </header>
  );
}
