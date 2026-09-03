import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="footer__container">
      <div className="container">
        <div className="footer__container-content">
          <div className="footer__logo">
            <img src={logo} alt="logo" />
            <p className="footer__logo-text">
              Инжинерные системы <br />
              безопасноси для бизнеса
            </p>
          </div>
          <div className="footer__content">
            <div className="footer__content-item">
              <h3 className="footer__content-item-title">Контакты</h3>
              <p className="footer__content-item-text">+7 (999) 999-99-99</p>
              <p className="footer__content-item-text">info@example.com</p>
              <p className="footer__content-item-text">+7 (999) 999-99-99</p>
              <p className="footer__content-item-text">info@example.com</p>
              <p className="footer__content-item-text">+7 (999) 999-99-99</p>
              <p className="footer__content-item-text">info@example.com</p>
            </div>
          </div>
          <div className="footer__content">
            <div className="footer__content-item">
              <h3 className="footer__content-item-title">Контакты</h3>
              <p className="footer__content-item-text">+7 (999) 999-99-99</p>
              <p className="footer__content-item-text">info@example.com</p>
              <p className="footer__content-item-text">+7 (999) 999-99-99</p>
              <p className="footer__content-item-text">info@example.com</p>
              <p className="footer__content-item-text">+7 (999) 999-99-99</p>
              <p className="footer__content-item-text">info@example.com</p>
            </div>
          </div>
          <div className="footer__content">
            <div className="footer__content-item">
              <h3 className="footer__content-item-title">Контакты</h3>
              <p className="footer__content-item-text">+7 (495) 280-73-68</p>
              <p className="footer__content-item-text">info@profis-group.ru</p>
              <p className="footer__content-item-text">
                Адрес : г.Москва, ул. 2я синичкина , <br /> д 9А стр 3
              </p>
              <button className="footer__content-item-button">
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
