"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  animation?: "scale" | "glow" | "bounce" | "none";
  theme?: "light" | "dark";
}

export default function Button({
  text = "Button", // Default text if the user forgets to pass it
  size = "md",
  variant = "primary",
  animation = "scale",
  theme = "light",
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: "power2.out",
      });
    }, buttonRef);

    return () => ctx.revert(); 
  }, []);

  // Set glow color dynamically based on the theme
  const glowColor = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(24, 24, 27, 0.3)";

  // GSAP Interactive Animations
  const handleMouseEnter = () => {
    if (!buttonRef.current) return;
    if (animation === "scale") {
      gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    } else if (animation === "glow") {
      gsap.to(buttonRef.current, {
        boxShadow: `0 0 20px 2px ${glowColor}`,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    if (animation === "scale") {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: "power1.in" });
    } else if (animation === "glow") {
      gsap.to(buttonRef.current, {
        boxShadow: "0 0 0px 0px rgba(0, 0, 0, 0)",
        duration: 0.3,
      });
    }
  };

  const handleMouseDown = () => {
    if (!buttonRef.current) return;
    if (animation === "bounce") {
      gsap.to(buttonRef.current, { scale: 0.9, duration: 0.1 });
    }
  };

  const handleMouseUp = () => {
    if (!buttonRef.current) return;
    if (animation === "bounce") {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    }
  };

  // Tailwind Class Dictionaries
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg font-medium",
  };

  // Modern, premium color palettes based on theme
  const themeClasses = {
    light: {
      primary: "bg-zinc-900 text-white border-transparent hover:bg-zinc-800",
      secondary: "bg-zinc-100 text-zinc-900 border-transparent hover:bg-zinc-200",
      outline: "bg-transparent text-zinc-900 border-zinc-300 hover:bg-zinc-50",
    },
    dark: {
      primary: "bg-white text-zinc-900 border-transparent hover:bg-zinc-100",
      secondary: "bg-zinc-800 text-white border-transparent hover:bg-zinc-700",
      outline: "bg-transparent text-white border-zinc-700 hover:bg-zinc-800",
    },
  };

  // Appending className at the end ensures user-passed colors override defaults
  const combinedClasses = `
    inline-flex items-center justify-center rounded-xl border font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]} 
    ${themeClasses[theme][variant]} 
    ${className} 
  `.trim();

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={combinedClasses}
      {...props}
    >
      {text}
    </button>
  );
}