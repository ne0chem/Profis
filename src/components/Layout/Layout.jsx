import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Consultation from "../Consultation/Consultation";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Consultation />
      <Footer />
    </div>
  );
}
