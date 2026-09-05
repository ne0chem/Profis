import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));

    if (!elements.length) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    elements.forEach((element) => {
      if (!element.classList.contains("is-revealed")) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}
