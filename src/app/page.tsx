"use client";
import NavBar from "@/components/navbar";
import About from "@/components/about";
import Home from "@/components/home";
import Tools from "@/components/tools";

export default function Page() {
  
  return (
    <div className="w-full bg-[#FDF2D8] min-h-screen font-mono">
  
      <NavBar />
      <Home />
      {/* <About /> */}
      <Tools />

      
      
    </div>
  );
}
