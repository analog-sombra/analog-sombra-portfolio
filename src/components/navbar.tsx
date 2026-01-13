"use client";

import { useEffect, useState } from "react";

type PageType = "home" | "about" | "tools" | "project";

interface NavBarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

const NavBar = ({ activePage, onNavigate }: NavBarProps) => {
  const [currentTime, setCurrentTime] = useState<string>("Loading...");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const navItems: { id: PageType; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "project", label: "Project" },
    { id: "tools", label: "Tools" },
  ];

  return (
    <>
      <p className="text-6xl py-6 mx-auto text-[#E05735] font-extrabold text-center tracking-tight">
        Analog Sombra
      </p>

      <nav className="w-6xl mx-auto gap-2 grid grid-cols-12 mb-2">
        <div className="rounded-xl bg-[#72906E] col-span-9 flex items-center px-2 py-2 gap-1">
          {navItems.map((item) => (
            <p
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-[#F3EACD] text-lg font-bold cursor-pointer px-3 py-1 rounded-lg transition-all ${
                activePage === item.id
                  ? "bg-[#425649] scale-105"
                  : "hover:bg-[#425649]"
              }`}
            >
              {item.label}
            </p>
          ))}
        </div>
        <div className="rounded-xl bg-[#72906E] col-span-3 flex items-center justify-center px-2 py-2">
          <p className="text-[#F3EACD] text-lg font-bold text-center">
            {currentTime}
          </p>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
