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
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    // Reveal already-visible blocks on route enter (same feel as Main).
    requestAnimationFrame(() => {
      elements.forEach((element) => {
        if (element.classList.contains("is-revealed")) return;
        const rect = element.getBoundingClientRect();
        const viewHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < viewHeight * 0.92 && rect.bottom > 0) {
          element.classList.add("is-revealed");
          return;
        }
        observer.observe(element);
      });
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}
