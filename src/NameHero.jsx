import { useEffect, useRef, useState } from "react";

const NameHero = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const everSeen = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) everSeen.current = true;
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const heroClass = `name-hero ${visible ? "name-hero-in" : everSeen.current ? "name-hero-out" : ""}`;
  const wordClass = visible ? "name-hero-word-in" : "";

  return (
    <div className={heroClass} ref={ref}>
      <div className="name-hero-date-row">
        <span className={`name-hero-month ${wordClass}`} style={{ animationDelay: "0.50s" }}>JUL</span>
        <span className={`name-hero-day ${wordClass}`} style={{ animationDelay: "0.65s" }}>11</span>
      </div>
      <div className={`name-hero-ornament ${wordClass}`} style={{ animationDelay: "0.80s" }}>
        <span />
        <span className="name-hero-ornament-diamond">◆</span>
        <span />
      </div>
      <div className={`name-hero-year ${wordClass}`} style={{ animationDelay: "0.95s" }}>2026</div>
    </div>
  );
};

export default NameHero;
