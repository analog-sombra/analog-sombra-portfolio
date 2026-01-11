import { useEffect, useState } from "react";

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  return (
    <>
      <p className="text-6xl py-6 mx-auto text-[#E05735] font-extrabold text-center tracking-tight">
        Analog Sombra
      </p>

      <nav className="w-6xl mx-auto gap-2 grid grid-cols-12 mb-2">
        <div className="rounded-xl bg-[#72906E] col-span-9 flex items-center gap-4 px-4 py-2">
          <p className="text-[#F3EACD] text-lg font-bold cursor-pointer hover:bg-[#425649] px-2 rounded-lg transition-all">
            Home
          </p>
          <p className="text-[#F3EACD] text-lg font-bold cursor-pointer hover:bg-[#425649] px-2 rounded-lg transition-all">
            About
          </p>
          <p className="text-[#F3EACD] text-lg font-bold cursor-pointer hover:bg-[#425649] px-2 rounded-lg transition-all">
            Project
          </p>
          <p className="text-[#F3EACD] text-lg font-bold cursor-pointer hover:bg-[#425649] px-2 rounded-lg transition-all">
            Tools
          </p>
          <p className="text-[#F3EACD] text-lg font-bold cursor-pointer hover:bg-[#425649] px-2 rounded-lg transition-all">
            Contact
          </p>
        </div>
        <div className="rounded-xl bg-[#72906E] col-span-3 flex items-center justify-center px-2 py-2">
          <p className="text-[#F3EACD] text-lg font-bold text-center">
            {mounted ? currentTime : "Loading..."}
          </p>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
