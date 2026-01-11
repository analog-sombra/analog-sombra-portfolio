"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Home = () => {
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
    <div className="grid grid-cols-7 gap-2 w-6xl mx-auto">
      <div className="col-span-6 border-2 rounded-xl border-[#72906E] p-4">
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
            my personal portfolio website. I'm a self-taught programmer and
            developer with a passion for creating websites, applications, and
            the digital world. Feel free to browse through my projects and get
            to know more about me!
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
      <div className="col-span-1 border-2 rounded-xl border-[#72906E] p-2 h-fit">
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
        <p
          ref={(el) => {
            linksRef.current[6] = el;
          }}
          onMouseEnter={() => handleLinkHover(6, true)}
          onMouseLeave={() => handleLinkHover(6, false)}
          className="text-[#373529] text-lg font-semibold mb-2 cursor-pointer transition-all"
        >
          - Donate
        </p>
      </div>
    </div>
  );
};
export default Home;
