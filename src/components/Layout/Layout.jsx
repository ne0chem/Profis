import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Consultation from "../Consultation/Consultation";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Layout.css";

export default function Layout() {
  useScrollReveal();

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
