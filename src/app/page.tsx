"use client";
import About from "./components/about";
import Home from "./components/home";
import NavBar from "./components/navbar";

export default function Page() {
  
  return (
    <div className="w-full bg-[#FDF2D8] min-h-screen font-mono">
  
      <NavBar />
      {/* <Home /> */}
      <About />

      
      
    </div>
  );
}
