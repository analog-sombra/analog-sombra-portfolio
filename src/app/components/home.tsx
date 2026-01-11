"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useSettings } from "../context/SettingsContext";

const Home = () => {
  const { isMusicOn, isRainOn, toggleMusic, toggleRain } = useSettings();
  const readMoreRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const dot1Ref = useRef<HTMLSpanElement>(null);
  const dot2Ref = useRef<HTMLSpanElement>(null);
  const dot3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Read More button pulse animation
    if (readMoreRef.current) {
      gsap.to(readMoreRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Animate dots in sequence
    const timeline = gsap.timeline({ repeat: -1 });
    timeline
      .to([dot1Ref.current, dot2Ref.current, dot3Ref.current], {
        opacity: 0.3,
        duration: 0,
      })
      .to(dot1Ref.current, { opacity: 1, duration: 0.3, ease: "power2.inOut" })
      .to(
        dot2Ref.current,
        { opacity: 1, duration: 0.3, ease: "power2.inOut" },
        "-=0.1"
      )
      .to(
        dot3Ref.current,
        { opacity: 1, duration: 0.3, ease: "power2.inOut" },
        "-=0.1"
      )
      .to(
        [dot1Ref.current, dot2Ref.current, dot3Ref.current],
        {
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "+=0.5"
      );
  }, []);

  const handleLinkHover = (index: number, isHovering: boolean) => {
    linksRef.current.forEach((link, i) => {
      if (link) {
        if (isHovering) {
          gsap.to(link, {
            opacity: i === index ? 1 : 0.25,
            scale: i === index ? 1.15 : 0.92,
            x: i === index ? 8 : 0,
            color: i === index ? "#E05735" : "#373529",
            duration: 0.2,
            ease: "power3.out",
          });
        } else {
          gsap.to(link, {
            opacity: 1,
            scale: 1,
            x: 0,
            color: "#373529",
            duration: 0.2,
            ease: "power3.out",
          });
        }
      }
    });
  };

  return (
    <div className="flex gap-2 w-6xl mx-auto">
      <div className="flex-1 border-2 rounded-xl border-[#72906E] p-4">
        <p className="text-lg text-[#E1504B] font-bold">
          \(^-^)/ Welcome to Analog Sombra - (Portfolio)
        </p>

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
            Hello there! This is Analog Sombra - and you are currently viewing
            my personal portfolio website. I&apos;m a self-taught programmer and
            developer with a passion for creating websites, applications, and
            the digital world. Feel free to browse through my projects and get
            to know more about me!
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - My main programming languages are C/C++ and Rust. I&apos;m not a
            big fan of JavaScript, but I do enjoy working with it when
            TypeScript is involved.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - I Don&apos;t like PHP language and php developers as well both are
            so annoying.(sorry if you are one of them)
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - When I&apos;m not coding, I&apos;m usually drawing digital
            portraits, experimenting with art, or reading fantasy novels.
          </p>

          <div className="flex w-full">
            <div className="grow"></div>
            <button ref={readMoreRef} className="cursor-pointer font-bold">
              Read More
              <span ref={dot1Ref} className="inline-block">
                .
              </span>
              <span ref={dot2Ref} className="inline-block">
                .
              </span>
              <span ref={dot3Ref} className="inline-block">
                .
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="border-2 rounded-xl border-[#72906E] p-2 h-fit">
          <p className="text-4xl text-[#E05735] font-extrabold mb-4">Links</p>

          <p
            ref={(el) => {
              linksRef.current[0] = el;
            }}
            onMouseEnter={() => handleLinkHover(0, true)}
            onMouseLeave={() => handleLinkHover(0, false)}
            className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
          >
            - Email
          </p>
          <p
            ref={(el) => {
              linksRef.current[1] = el;
            }}
            onMouseEnter={() => handleLinkHover(1, true)}
            onMouseLeave={() => handleLinkHover(1, false)}
            className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
          >
            - GitHub
          </p>
          <p
            ref={(el) => {
              linksRef.current[2] = el;
            }}
            onMouseEnter={() => handleLinkHover(2, true)}
            onMouseLeave={() => handleLinkHover(2, false)}
            className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
          >
            - Discord
          </p>
          <p
            ref={(el) => {
              linksRef.current[3] = el;
            }}
            onMouseEnter={() => handleLinkHover(3, true)}
            onMouseLeave={() => handleLinkHover(3, false)}
            className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
          >
            - Instagram
          </p>
          <p
            ref={(el) => {
              linksRef.current[4] = el;
            }}
            onMouseEnter={() => handleLinkHover(4, true)}
            onMouseLeave={() => handleLinkHover(4, false)}
            className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
          >
            - YouTube
          </p>
          <p
            ref={(el) => {
              linksRef.current[5] = el;
            }}
            onMouseEnter={() => handleLinkHover(5, true)}
            onMouseLeave={() => handleLinkHover(5, false)}
            className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
          >
            - PlayStore
          </p>
        </div>

        {/* Settings Section */}
        <div className="border-2 rounded-xl border-[#72906E] p-2 h-fit">
          <p className="text-4xl text-[#E05735] font-extrabold mb-4">Setting</p>

          <div className="flex gap-3 items-center mb-3">
            <label className="relative inline-block w-11 h-6">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0 peer" 
                checked={isMusicOn}
                onChange={toggleMusic}
              />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#C4B5A0] transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-4.5 before:w-4.5 before:left-0.75 before:bottom-0.75 before:bg-white before:transition-all before:duration-400 before:rounded-full peer-checked:bg-[#72906E] peer-checked:before:translate-x-5 peer-focus:shadow-[0_0_1px_#72906E]"></span>
            </label>
            <p className="text-[#373529] text-lg font-medium">Music</p>
          </div>

          <div className="flex gap-3 items-center mb-3">
            <label className="relative inline-block w-11 h-6">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0 peer" 
                checked={isRainOn}
                onChange={toggleRain}
              />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#C4B5A0] transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-4.5 before:w-4.5 before:left-0.75 before:bottom-0.75 before:bg-white before:transition-all before:duration-400 before:rounded-full peer-checked:bg-[#72906E] peer-checked:before:translate-x-5 peer-focus:shadow-[0_0_1px_#72906E]"></span>
            </label>
            <p className="text-[#373529] text-lg font-medium">Rain</p>
          </div>

          <div className="flex gap-3 items-center mb-2">
            <label className="relative inline-block w-11 h-6">
              <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#C4B5A0] transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-4.5 before:w-4.5 before:left-0.75 before:bottom-0.75 before:bg-white before:transition-all before:duration-400 before:rounded-full peer-checked:bg-[#72906E] peer-checked:before:translate-x-5 peer-focus:shadow-[0_0_1px_#72906E]"></span>
            </label>
            <p className="text-[#373529] text-lg font-medium">Draw</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
