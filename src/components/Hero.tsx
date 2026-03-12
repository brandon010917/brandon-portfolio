import { motion } from "motion/react";
import { useState, useEffect } from "react";
import brandonImg from "@/assets/brandon.webp";
import { Button } from "./ui/button";

const FULL_TEXT = "Hola, soy BRANDON 👋";
const TYPING_SPEED = 60; // ms per character
const START_DELAY = 400; // ms before typing begins

function useTypewriter(text: string, speed: number, delay: number) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

function renderSegments(text: string) {
  const PREFIX = "Hola, soy ";
  const NAME = "BRANDON";

  if (text.length <= PREFIX.length) {
    return <>{text}</>;
  }
  if (text.length <= PREFIX.length + NAME.length) {
    return (
      <>
        {PREFIX}
        <span className="text-primary text-glow">
          {text.slice(PREFIX.length)}
        </span>
      </>
    );
  }
  return (
    <>
      {PREFIX}
      <span className="text-primary text-glow">{NAME}</span>
      {text.slice(PREFIX.length + NAME.length)}
    </>
  );
}

const Hero = () => {
  const { displayed, done } = useTypewriter(
    FULL_TEXT,
    TYPING_SPEED,
    START_DELAY,
  );

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none opacity-50" />

      <div className="min-h-screen py-20 container mx-auto px-6 relative z-10 flex flex-col justify-center items-center text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 relative w-40 h-40 rounded-full overflow-hidden border-2 border-primary/50 animate-pulse-glow"
        >
          <img
            src={brandonImg.src}
            alt="Foto de Brandon Leal, Desarrollador Full Stack"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width={160}
            height={160}
          />
        </motion.div>

        {/* Name — typewriter */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight min-h-[1.2em]">
          {renderSegments(displayed)}
          {!done && (
            <span
              className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-[blink_0.7s_step-end_infinite]"
              aria-hidden="true"
            />
          )}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg md:text-xl text-secondary-foreground mb-6"
        >
          <span className="text-primary font-semibold border-b border-primary/40">
            Desarrollador Full Stack
          </span>{" "}
          con 3+ años de experiencia.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-lg text-muted-foreground leading-relaxed mb-10"
        >
          Me especializo en crear interfaces accesibles y visualmente atractivas
          con{" "}
          <span className="text-foreground font-medium">
            React, Next.js, Angular y Astro
          </span>
          , y servicios backend robustos con{" "}
          <span className="text-foreground font-medium">Node.js y Express</span>
          .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Button size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="cursor-pointer absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary mt-2"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
