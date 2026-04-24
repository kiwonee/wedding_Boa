import { useEffect, useRef, useState } from "react";

const Intersect = ({ children, className = "", style = {}, ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "is-visible" : "is-hidden"}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Intersect;
