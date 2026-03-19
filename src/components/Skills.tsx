import type { IconType } from "react-icons";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiSass,
  SiHtml5,
  SiNextdotjs,
  SiAstro,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiDocker,
  SiSupabase,
  SiHasura,
  SiGit,
  SiGnubash,
  SiGithubactions,
  SiVercel,
  SiVite,
  SiGraphql,
  SiAngular,
  SiCss,
  SiVitest,
  SiTestinglibrary,
} from "react-icons/si";

interface Tech {
  icon: IconType;
  name: string;
  color: string;
}

interface Category {
  id: string;
  label: string;
  technologies: Tech[];
}

const categories: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    technologies: [
      { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      { icon: SiReact, name: "React", color: "#61DAFB" },
      { icon: SiAngular, name: "Angular", color: "#DD0031" },
      { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
      { icon: SiSass, name: "SASS/SCSS", color: "#CC6699" },
      { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
      { icon: SiAstro, name: "Astro", color: "#FF5D01" },
      { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
      { icon: SiCss, name: "CSS3", color: "#1572B6" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    technologies: [
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      { icon: SiPython, name: "Python", color: "#3776AB" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
      { icon: SiExpress, name: "Express.js", color: "#ffffff" },
      { icon: SiSupabase, name: "Supabase", color: "#3ECF8E" },
      { icon: SiHasura, name: "Hasura", color: "#1EB4D4" },
    ],
  },
  {
    id: "tools",
    label: "Herramientas",
    technologies: [
      { icon: SiGit, name: "Git", color: "#F05032" },
      { icon: SiGnubash, name: "CLI", color: "#4EAA25" },
      { icon: SiGithubactions, name: "CI/CD", color: "#2088FF" },
      { icon: SiVercel, name: "Vercel", color: "#ffffff" },
      { icon: SiVite, name: "Vite", color: "#646CFF" },
      { icon: SiGraphql, name: "GraphQL", color: "#E10098" },
      { icon: SiDocker, name: "Docker", color: "#2496ED" },
      { icon: SiVitest, name: "Vitest", color: "#6E9F18" },
      { icon: SiTestinglibrary, name: "Testing Library", color: "#E33332" },
    ],
  },
];

const TechCard = ({ tech, index }: { tech: Tech; index: number }) => {
  const Icon = tech.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-5 border border-border/40 cursor-default overflow-hidden transition-colors duration-300"
    >
      {/* Brand color glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${tech.color}12 0%, transparent 70%)`,
          boxShadow: `inset 0 0 40px ${tech.color}10`,
        }}
      />
      {/* Brand color border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${tech.color}50` }}
      />

      <div className="relative flex flex-col items-center gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ background: `${tech.color}15` }}
        >
          <Icon
            size={28}
            style={{ color: tech.color }}
            className="transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          />
        </div>
        <span className="text-xs font-mono font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors duration-300 leading-tight">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const currentCategory = categories.find((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-mono text-xs text-primary/70 tracking-[0.3em] uppercase mb-4 border border-primary/20 px-3 py-1.5 rounded-full">
            stack técnico
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-primary text-glow">Skills</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            Estas son las tecnologías con las que trabajo día a día para
            construir productos modernos y de calidad.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-1 bg-secondary/30 backdrop-blur-sm p-1.5 rounded-2xl border border-border/30">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeCategory === category.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-xl"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.45,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {category.label}
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      activeCategory === category.id
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {category.technologies.length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Technologies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {currentCategory?.technologies.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
