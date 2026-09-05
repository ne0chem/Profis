import React from "react";
import ConsultationForm from "../ConsultationForm/ConsultationForm";
import "./Consultation.css";

export default function Consultation() {
  return (
    <section className="consultation" id="consultation">
      <div className="container">
        <ConsultationForm />
      </div>
    </section>
  );
}
