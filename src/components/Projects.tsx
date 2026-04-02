import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Movie Explorer App",
    description:
      "Aplicación web para explorar películas y series con énfasis en rendimiento y accesibilidad WCAG AA. Búsquedas optimizadas, animaciones con View Transitions API e interfaz completamente accesible.",
    tags: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vite",
      "Vitest",
    ],
    github: "https://github.com/Brandon010917/movie-explorer-app",
    demo: "https://movie-explorer-app.brandon010917.workers.dev",
    featured: true,
    image: "/images/Buscador de Peliculas.png",
  },
];

const PLACEHOLDER_COLORS: [string, string][] = [
  ["oklch(22% 0.05 155)", "oklch(18% 0.03 200)"],
  ["oklch(20% 0.04 260)", "oklch(17% 0.05 155)"],
  ["oklch(21% 0.06 180)", "oklch(18% 0.04 240)"],
  ["oklch(19% 0.05 220)", "oklch(22% 0.04 160)"],
  ["oklch(20% 0.03 155)", "oklch(18% 0.05 270)"],
  ["oklch(22% 0.04 200)", "oklch(19% 0.06 155)"],
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [from, to] = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-border/40 bg-gradient-card overflow-hidden transition-colors duration-300 hover:border-primary/30"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: "inset 0 0 60px oklch(87.845% 0.21679 155.11 / 0.04)",
        }}
      />

      {/* Image / Placeholder */}
      <div className="relative w-full h-44 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura de pantalla de ${project.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-grid"
            style={{
              background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(87.845% 0.21679 155.11 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(87.845% 0.21679 155.11 / 0.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Initials */}
            <span className="relative font-mono text-3xl font-bold tracking-widest text-primary/20 select-none">
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </span>
            {/* Glow dot */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-10 rounded-full blur-2xl bg-primary/10" />
          </div>
        )}

        {/* Featured badge — inside image area */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary/80 border border-primary/25 bg-background/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
              destacado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 pr-20">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-primary/70 bg-primary/5 border border-primary/15 px-2.5 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-border/30">
          {project.github && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver código de ${project.title} en GitHub`}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Github size={15} />
                Código
              </a>
            </Button>
          )}
          {project.demo && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver demo de ${project.title}`}
                className="gap-2 text-muted-foreground hover:text-primary"
              >
                <ExternalLink size={15} />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="py-28 relative overflow-hidden">
    {/* Subtle background accent */}
    <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />

    <div className="container mx-auto px-6 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block font-mono text-xs text-primary/70 tracking-[0.3em] uppercase mb-4 border border-primary/20 px-3 py-1.5 rounded-full">
          trabajos recientes
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          <span className="text-primary text-glow">Proyectos</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
          Una selección de proyectos que reflejan mi proceso, stack y forma de
          resolver problemas reales.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center mt-12"
      >
        <Button variant="outline" size="lg" asChild>
          <a
            href="https://github.com/brandon010917"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Github size={18} />
            Ver más en GitHub
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default Projects;
