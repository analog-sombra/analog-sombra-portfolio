"use client";

import Image from "next/image";

const Projects = () => {
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
        </div>
      </div>
      <div className="col-span-1 border-2 rounded-xl border-[#72906E] p-2 h-fit">
        <p className="text-4xl text-[#E05735] font-extrabold mb-4">Links</p>
      </div>
    </div>
  );
};
export default Projects;
