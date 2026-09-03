import React from "react";
import "./Contants.css";

export default function Contants() {
  return (
    <section className="contacts">
      <div className="container">
        <h1 className="contacts__title">Контакты</h1>
        <div className="contacts__wrapper">
          <div className="contacts__info">
            <div className="contacts__info-item">
              <div className="contacts__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.55 21 20.13 21.02 19.73 21.02C10.77 21.02 3.48 13.73 3.48 4.77C3.48 4.37 3.5 3.95 3.53 3.5C3.57 2.94 4.02 2.5 4.58 2.5H7.58C7.86 2.5 8.11 2.67 8.21 2.93L9.52 6.19C9.6 6.38 9.57 6.6 9.44 6.77L7.44 9.27C8.85 12.06 11.44 14.65 14.23 16.06L16.73 14.06C16.9 13.93 17.12 13.9 17.31 13.98L20.57 15.29C20.83 15.39 21 15.64 21 15.92L22 16.92Z" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <a href="tel:+74952807368" className="contacts__info-text">+7 (495) 280-73-68</a>
            </div>

            <div className="contacts__info-item">
              <div className="contacts__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <a href="mailto:info@profis-group.ru" className="contacts__info-text">info@profis-group.ru</a>
            </div>

            <div className="contacts__info-item">
              <div className="contacts__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="contacts__info-text">
                г.Москва , ул. 2я улица<br />синичкина ,д 9А, стр 3
              </p>
            </div>

            <div className="contacts__info-item">
              <div className="contacts__info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#C51115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="contacts__info-text">
                Пн-Пт 10:00-19:00
              </p>
            </div>
          </div>

          <div className="contacts__map">
            <iframe
              title="Карта офиса"
              src="https://yandex.ru/map-widget/v1/?ll=37.718175%2C55.761695&z=16&pt=37.718175%2C55.761695%2Cpm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
