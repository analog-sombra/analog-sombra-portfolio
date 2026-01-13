"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

const Tools = () => {
  const frontendTools = [
    {
      name: "React",
      icon: "react",
      description: "JavaScript Library",
    },
    {
      name: "NextJs",
      icon: "nextjs",
      description: "React Framework",
    },
    {
      name: "TailwindCSS",
      icon: "tailwind",
      description: "CSS Framework",
    },
    {
      name: "Flutter",
      icon: "flutter",
      description: "UI Toolkit",
    },
  ];

  const BackendTools = [
    {
      name: "NodeJs",
      icon: "nodejs",
      description: "JavaScript Runtime",
    },
    {
      name: "TypeScript",
      icon: "typescript",
      description: "JavaScript Superset",
    },
    {
      name: "NestJs",
      icon: "nestjs",
      description: "Progressive Node.js Framework",
    },
    {
      name: "MySQL",
      icon: "mysql",
      description: "RDMS",
    },
    {
      name: "PostgreSQL",
      icon: "postgresql",
      description: "RDMS",
    },
    {
      name: "Axios",
      icon: "rust",
      description: "HTTP Client",
    },
    {
      name: "Prisma",
      icon: "prisma",
      description: "ORM",
    },
    {
      name: "GraphQL",
      icon: "graphql",
      description: "API Query Language",
    },
  ];

  const Cloud_DevOps_Tools = [
    {
      name: "AWS",
      icon: "aws",
      description: "Cloud Services",
    },
    {
      name: "Jenkins",
      icon: "jenkins",
      description: "Automation Server",
    },
    {
      name: "Redis",
      icon: "redis",
      description: "In-memory Data Structure Store",
    },
    {
      name: "Docker",
      icon: "docker",
      description: "Containerization Platform",
    },
    {
      name: "Kubernetes",
      icon: "kubernetes",
      description: "Container Orchestration",
    },
    {
      name: "Prometheus",
      icon: "prometheus",
      description: "Monitoring System",
    },
    {
      name: "Grafana",
      icon: "grafana",
      description: "Analytics Platform",
    },
  ];

  const tools = [
    {
      name: "git",
      icon: "git",
      description: "Version Control System",
    },
    {
      name: "GitHub",
      icon: "github",
      description: "Code Hosting Platform",
    },
    {
      name: "Linux",
      icon: "linux",
      description: "Operating System",
    },
    {
      name: "Postman",
      icon: "postman",
      description: "API Development",
    },
    {
      name: "Visual Studio Code",
      icon: "vscode",
      description: "Code Editor",
    },
    {
      name: "Android Studio",
      icon: "androidstudio",
      description: "IDE for Android Development",
    },
    {
      name: "Vim",
      icon: "vim",
      description: "Text Editor",
    },
  ];

  return (
    <div className="w-6xl mx-auto space-y-8">
      {/* Header Section with Stats */}
      <div className="border-2 rounded-xl border-[#72906E] p-4">
        <p className="text-xl text-[#E1504B] font-bold">
          Skills & Technologies
        </p>
        <p className="text-[#373529] text-base font-medium">
          I work with a diverse set of modern technologies across the full
          stack. Here&apos;s an overview of my technical expertise and the tools
          I use to build Web as well as Mobile applications.
        </p>
      </div>

      <div>
        <p className="text-xl text-[#E1504B] font-bold mb-2">
          Frontend Development
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {frontendTools.map((tool) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xl text-[#E1504B] font-bold mb-2">
          Backend Development
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {BackendTools.map((tool) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
            />
          ))}
        </div>
      </div>

      {/* <div>
        <p className="text-xl text-[#E1504B] font-bold mb-2">Cloud & DevOps</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Cloud_DevOps_Tools.map((tool) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
            />
          ))}
        </div>
      </div> */}

      <div>
        <p className="text-xl text-[#E1504B] font-bold mb-2">Other Tools</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tools;

interface ToolCardProps {
  name: string;
  icon: string;
  description: string;
}
const ToolCard = ({ name, icon, description }: ToolCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current && nameRef.current) {
      gsap.to(cardRef.current, {
        y: -4,
        backgroundColor: "#f3dcb4",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(nameRef.current, {
        color: "#E05735",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && nameRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(nameRef.current, {
        color: "#373529",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="border border-[#72906E] rounded-lg p-2 flex gap-2 items-center cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src={`https://skillicons.dev/icons?i=${icon}`}
          fill
          priority
          alt={name}
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          ref={nameRef}
          className="text-sm text-[#373529] font-bold leading-tight"
        >
          {name}
        </p>
        <p className="text-xs text-[#373529] opacity-60 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};
