"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import NavBar from "@/components/navbar";
import About from "@/components/about";
import Home from "@/components/home";
import Tools from "@/components/tools";
import Projects from "@/components/project";

type PageType = "home" | "about" | "tools" | "project";

export default function Page() {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageOrder: PageType[] = ["home", "about", "project", "tools"];

  const handlePageChange = useCallback((newPage: PageType) => {
    if (newPage === activePage || isAnimating) return;

    setIsAnimating(true);
    const content = contentRef.current;
    
    if (content) {
      const currentIndex = pageOrder.indexOf(activePage);
      const newIndex = pageOrder.indexOf(newPage);
      const direction = newIndex > currentIndex ? 1 : -1;

      // Slide out current page
      gsap.to(content, {
        x: direction * -100,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setActivePage(newPage);
          
          // Reset position and slide in new page
          gsap.set(content, { x: direction * 100 });
          
          // Scroll to top when changing pages
          window.scrollTo({ top: 0, behavior: "instant" });
          
          gsap.to(content, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              setIsAnimating(false);
            },
          });
        },
      });
    }
  }, [activePage, isAnimating, pageOrder]);

  useEffect(() => {
    // Scroll navigation
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollDelay = 1000; // Delay between scroll switches

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isScrolling || isAnimating || now - lastScrollTime < scrollDelay) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Check if we're at the bottom or top of the scrollable content
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
      const isAtTop = scrollTop <= 10; // 10px threshold
      
      const currentIndex = pageOrder.indexOf(activePage);
      
      if (e.deltaY > 0 && currentIndex < pageOrder.length - 1 && isAtBottom) {
        // Scroll down - next page (only when at bottom)
        e.preventDefault();
        isScrolling = true;
        lastScrollTime = now;
        handlePageChange(pageOrder[currentIndex + 1]);
        setTimeout(() => { isScrolling = false; }, scrollDelay);
      } else if (e.deltaY < 0 && currentIndex > 0 && isAtTop) {
        // Scroll up - previous page (only when at top)
        e.preventDefault();
        isScrolling = true;
        lastScrollTime = now;
        handlePageChange(pageOrder[currentIndex - 1]);
        setTimeout(() => { isScrolling = false; }, scrollDelay);
      }
      // Otherwise, let the page scroll normally
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activePage, isAnimating, handlePageChange, pageOrder]);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "tools":
        return <Tools />;
      case "project":
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="w-full bg-[#FDF2D8] min-h-screen font-mono overflow-x-hidden">
      <NavBar activePage={activePage} onNavigate={handlePageChange} />
      
      <div ref={contentRef} className="w-full overflow-x-hidden">
        {renderPage()}
      </div>

      {/* Page indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        {pageOrder.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activePage === page
                ? "bg-[#E05735] scale-125"
                : "bg-[#72906E] opacity-50 hover:opacity-100"
            }`}
            title={page.charAt(0).toUpperCase() + page.slice(1)}
          />
        ))}
      </div>
    </div>
  );
}
