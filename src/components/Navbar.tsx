import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.svg";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
  },
};

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-b-transparent transition-all duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo — explicit dimensions prevent CLS */}
        <a href="#home">
          <img
            src={Logo.src}
            alt="Logo"
            width={32}
            height={32}
            decoding="async"
            fetchPriority="high"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={toggleMobile}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu — clip-path avoids layout recalculation on each frame */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass md:hidden overflow-hidden"
            style={{ willChange: "clip-path, opacity" }}
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMobile}
                    className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
