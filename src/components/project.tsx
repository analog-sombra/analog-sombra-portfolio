"use client";

import { useState, useRef } from "react";
import gsap from "gsap";

type ProjectCategory = "all" | "app" | "web" | "games" | "tools";

interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      category: "web",
      image: "/projects/ecommerce.jpg",
      tags: ["Next.js", "TypeScript", "Prisma"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 2,
      title: "Task Manager App",
      description: "Mobile app for managing daily tasks and productivity",
      category: "app",
      image: "/projects/taskmanager.jpg",
      tags: ["Flutter", "Firebase"],
      github: "https://github.com",
    },
    {
      id: 3,
      title: "2D Platformer Game",
      description: "Retro-style platformer game with pixel art graphics",
      category: "games",
      image: "/projects/platformer.jpg",
      tags: ["Unity", "C#"],
      demo: "https://demo.com",
    },
    {
      id: 4,
      title: "Code Snippet Manager",
      description: "CLI tool for managing and organizing code snippets",
      category: "tools",
      image: "/projects/snippets.jpg",
      tags: ["Rust", "CLI"],
      github: "https://github.com",
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with beautiful UI",
      category: "web",
      image: "/projects/weather.jpg",
      tags: ["React", "API", "TailwindCSS"],
      demo: "https://demo.com",
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Track workouts and monitor fitness progress",
      category: "app",
      image: "/projects/fitness.jpg",
      tags: ["Flutter", "SQLite"],
      github: "https://github.com",
    },
  ];

  const filters: { id: ProjectCategory; label: string; emoji: string }[] = [
    { id: "all", label: "All Projects", emoji: "📂" },
    { id: "web", label: "Web", emoji: "🌐" },
    { id: "app", label: "Apps", emoji: "📱" },
    { id: "games", label: "Games", emoji: "🎮" },
    { id: "tools", label: "Tools", emoji: "🔧" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const handleFilterChange = (filter: ProjectCategory, index: number) => {
    setActiveFilter(filter);

    // Animate filter buttons
    filterRefs.current.forEach((btn, i) => {
      if (btn) {
        gsap.to(btn, {
          scale: i === index ? 1.05 : 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });

    // Animate projects
    projectsRef.current.forEach((project, i) => {
      if (project) {
        gsap.fromTo(
          project,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: i * 0.1,
            ease: "power2.out",
          }
        );
      }
    });
  };

  const handleProjectHover = (index: number, isHovering: boolean) => {
    const project = projectsRef.current[index];
    if (project) {
      const img = project.querySelector(".project-img");
      const content = project.querySelector(".project-content");

      if (isHovering) {
        gsap.to(project, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(img, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(content, {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(project, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(img, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(content, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <div className="w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="border-2 rounded-xl border-[#72906E] p-4">
        <p className="text-xl text-[#E1504B] font-bold mb-3">🚀 My Projects</p>
        <p className="text-[#373529] text-base font-medium">
          A collection of projects I&apos;ve worked on. From web applications to
          mobile apps, games, and developer tools - each project represents a
          unique challenge and learning experience.
        </p>
      </div>

      {/* Filter Section */}
      <div>
        <p className="text-lg text-[#E1504B] font-bold mb-3">
          Filter by Category
        </p>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              ref={(el) => {
                filterRefs.current[index] = el;
              }}
              onClick={() => handleFilterChange(filter.id, index)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-[#E1504B] text-[#f3dcb4] border-2 border-[#E1504B]"
                  : "bg-transparent text-[#373529] border-2 border-[#72906E] hover:bg-[#f3dcb4]"
              }`}
            >
              {/* {filter.emoji} */}
              {filter.label}
            </button>
          ))}
        </div>
        <div className="mt-3 text-sm text-[#373529] opacity-70">
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              projectsRef.current[index] = el;
            }}
            onMouseEnter={() => handleProjectHover(index, true)}
            onMouseLeave={() => handleProjectHover(index, false)}
            className="border-2 rounded-xl border-[#72906E] overflow-hidden cursor-pointer"
          >
            {/* Project Image */}
            <div className="relative h-48 bg-[#f3dcb4] overflow-hidden">
              <div className="project-img absolute inset-0 flex items-center justify-center">
                <p className="text-6xl opacity-20">
                  {filters.find((f) => f.id === project.category)?.emoji}
                </p>
              </div>
            </div>

            {/* Project Content */}
            <div className="project-content p-4">
              <h3 className="text-lg text-[#E1504B] font-bold mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-[#373529] opacity-70 mb-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#f3dcb4] text-[#373529] text-xs font-semibold rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 bg-[#72906E] text-[#f3dcb4] text-xs font-semibold rounded text-center hover:bg-[#E1504B] transition-colors duration-300"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="border-2 rounded-xl border-[#72906E] p-8 text-center">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-xl text-[#E1504B] font-bold mb-2">
            No projects found
          </p>
          <p className="text-[#373529] opacity-70">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
};
export default Projects;
