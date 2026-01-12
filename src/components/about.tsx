"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const About = () => {
  const [activeSection, setActiveSection] = useState(0);
  const highlightRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (highlightRef.current) {
      gsap.to(highlightRef.current, {
        y: activeSection * 38,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeSection]);

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="grid grid-cols-9 gap-2 w-6xl mx-auto">
      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="col-span-7 border-2 rounded-xl border-[#72906E] p-4"
      >
        <p className="text-lg text-[#E1504B] font-bold">About Me</p>

        <div className="mt-4">
          <div className="relative w-60 h-60 float-left mr-6 mb-4">
            <Image
              src="/profile.jpg"
              alt="Analog Sombra"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <p className="text-[#373529] text-xl font-medium mb-3">
            Hi! I'm <span className="bg-[#f3dcb4]">Analog Sombra</span> for
            internet world, and my real name is{" "}
            <span className="bg-[#f3dcb4]">Karan</span>, I am from India. For
            some reason I am Lazy as a developer but I love coding and building
            things.
          </p>
          <p className="text-[#373529] text-xl font-medium mb-3">
            I wish to learn Game dev, I started learnig it but due to some
            reasons I left it. Maybe in future I will get back to it who knows.
          </p>
          <p className="text-[#373529] text-xl font-medium mb-3">
            My Date of Birth is{" "}
            <span className="bg-[#f3dcb4]">19th December 2003</span> , so as you
            can see I am quite young and I have a long way to go in life and
            coding journey. but i still behave like a kid most of the time. by
            pulling out some childish pranks.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - My main programming languages are C/C++ and Rust. I'm not a big
            fan of JavaScript, but I do enjoy working with it when TypeScript is
            involved.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - I Don't like PHP language and php developers as well both are so
            annoying.(sorry if you are one of them)
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - When I'm not coding, I'm usually drawing digital portraits,
            experimenting with art, or reading fantasy novels.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - I Alwyas like to see the sky that is filled with stars and a moon
            i know it's cold but it's give me charminga and warm feeling
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - Discord feels like my second home — a place to build, collaborate,
            play video games with friends, share memes, and occasionally pretend
            to be productive.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2 bg-[#f3dcb4]">
            - One of my biggest achievements so far is choosing a
            non-traditional path: leaving formal studies after 12th grade and
            working full-time as a developer. No college degree — just
            real-world experience (not a recommendation, just my story).
          </p>
          <p className="text-[#373529] text-lg font-medium">
            - I mostly build websites, scripts, bots, Android apps, and
            interactive experiences. I enjoy giving life to static designs using
            web technologies.
          </p>
        </div>
      </div>
      <div className="col-span-2 border-2 rounded-xl border-[#72906E] p-2 h-fit sticky top-2">
        <p className="text-4xl text-[#E05735] font-extrabold mb-4">Favorite</p>
        <div className="relative">
          <div
            ref={highlightRef}
            className="h-8.5 w-full bg-[#f3dcb4] absolute top-0 left-0 z-0 rounded-lg transition-all"
          ></div>
          <p
            onClick={() => scrollToSection(0)}
            className="text-[#373529] text-lg font-semibold mb-1 z-10 relative py-1 px-2 cursor-pointer hover:text-[#E05735] transition-colors"
          >
            - About
          </p>
          <p
            onClick={() => scrollToSection(1)}
            className="text-[#373529] text-lg font-semibold mb-1 z-10 relative py-1 px-2 cursor-pointer hover:text-[#E05735] transition-colors"
          >
            - Books
          </p>
          <p
            onClick={() => scrollToSection(2)}
            className="text-[#373529] text-lg font-semibold mb-1 z-10 relative py-1 px-2 cursor-pointer hover:text-[#E05735] transition-colors"
          >
            - Games
          </p>
          <p
            onClick={() => scrollToSection(3)}
            className="text-[#373529] text-lg font-semibold mb-1 z-10 relative py-1 px-2 cursor-pointer hover:text-[#E05735] transition-colors"
          >
            - Music
          </p>
          <p
            onClick={() => scrollToSection(4)}
            className="text-[#373529] text-lg font-semibold mb-1 z-10 relative py-1 px-2 cursor-pointer hover:text-[#E05735] transition-colors"
          >
            - Anime
          </p>
        </div>
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="col-span-7 border-2 rounded-xl border-[#72906E] p-4"
      >
        <p className="text-lg text-[#E1504B] font-bold">Books</p>
        <p className="text-[#373529] text-lg font-medium mb-2 bg-[#f3dcb4]">
          - One of my biggest achievements so far is choosing a non-traditional
          path: leaving formal studies after 12th grade and working full-time as
          a developer. No college degree — just real-world experience (not a
          recommendation, just my story).
        </p>
        <p className="text-[#373529] text-lg font-medium">
          - I mostly build websites, scripts, bots, Android apps, and
          interactive experiences. I enjoy giving life to static designs using
          web technologies.
        </p>
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="col-span-7 border-2 rounded-xl border-[#72906E] p-4"
      >
        <p className="text-lg text-[#E1504B] font-bold">Games</p>
        <p className="text-[#373529] text-lg font-medium mb-2 bg-[#f3dcb4]">
          - One of my biggest achievements so far is choosing a non-traditional
          path: leaving formal studies after 12th grade and working full-time as
          a developer. No college degree — just real-world experience (not a
          recommendation, just my story).
        </p>
        <p className="text-[#373529] text-lg font-medium">
          - I mostly build websites, scripts, bots, Android apps, and
          interactive experiences. I enjoy giving life to static designs using
          web technologies.
        </p>
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="col-span-7 border-2 rounded-xl border-[#72906E] p-4"
      >
        <p className="text-lg text-[#E1504B] font-bold">Music</p>
        <p className="text-[#373529] text-lg font-medium mb-2 bg-[#f3dcb4]">
          - One of my biggest achievements so far is choosing a non-traditional
          path: leaving formal studies after 12th grade and working full-time as
          a developer. No college degree — just real-world experience (not a
          recommendation, just my story).
        </p>
        <p className="text-[#373529] text-lg font-medium">
          - I mostly build websites, scripts, bots, Android apps, and
          interactive experiences. I enjoy giving life to static designs using
          web technologies.
        </p>
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="col-span-7 border-2 rounded-xl border-[#72906E] p-4"
      >
        <p className="text-lg text-[#E1504B] font-bold">Anime</p>
        <p className="text-[#373529] text-lg font-medium mb-2 bg-[#f3dcb4]">
          - One of my biggest achievements so far is choosing a non-traditional
          path: leaving formal studies after 12th grade and working full-time as
          a developer. No college degree — just real-world experience (not a
          recommendation, just my story).
        </p>
        <p className="text-[#373529] text-lg font-medium">
          - I mostly build websites, scripts, bots, Android apps, and
          interactive experiences. I enjoy giving life to static designs using
          web technologies.
        </p>
      </div>
    </div>
  );
};
export default About;
