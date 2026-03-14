import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  delay?: number; // ms
  direction?: "up" | "left" | "right" | "none";
};

const RevealOnScroll: React.FC<RevealProps> = ({
  children,
  className = "",
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
  delay = 0,
  direction = "up",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once && node) observer.unobserve(node);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const dirClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : direction === "none" ? "reveal-none" : "reveal-up";

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${revealed ? "revealed" : ""} ${className}`.trim()}
      style={{ ["--reveal-delay" as any]: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
