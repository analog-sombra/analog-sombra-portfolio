"use client";

import Image from "next/image";

const About = () => {
  return (
    <>
      <div className="col-span-7 border-2 rounded-xl border-[#72906E] p-4 w-6xl mx-auto">
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
            Hi! I&apos;m <span className="bg-[#f3dcb4]">Analog Sombra</span> for
            internet world, and my real name is{" "}
            <span className="bg-[#f3dcb4]">Karan</span>, I am from India. For
            some reason I am Lazy as a developer but I love coding and building
            things.
          </p>

          <p className="text-[#373529] text-xl font-medium mb-3">
            My Date of Birth is{" "}
            <span className="bg-[#f3dcb4]">19th December 2003</span> , so as you
            can see I am quite young and I have a long way to go in life and
            coding journey. but i still behave like a kid most of the time. by
            pulling out some childish pranks.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - My main programming languages are C/C++ and Rust. I&apos;m not a
            big fan of JavaScript, but I do enjoy working with it when
            TypeScript is involved.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2 bg-[#f3dcb4]">
            - One of my biggest achievements so far is choosing a
            non-traditional path: leaving formal studies after 12th grade and
            working full-time as a developer. No college degree — just
            real-world experience (not a recommendation, just my story).
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - I Don&apos;t like PHP language and php developers as well both are
            so annoying.(sorry if you are one of them)
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - When I&apos;m not coding, I&apos;m usually drawing digital
            portraits, experimenting with art, or reading fantasy novels.
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - I Alwyas like to see the sky that is filled with stars and a moon
            i know it&apos;s cold but it&apos;s give me charminga and warm
            feeling
          </p>
          <p className="text-[#373529] text-lg font-medium mb-2">
            - Discord feels like my second home — a place to build, collaborate,
            play video games with friends, share memes, and occasionally pretend
            to be productive.
          </p>

          <p className="text-[#373529] text-lg font-medium">
            - I mostly build websites, scripts, bots, Android apps, and
            interactive experiences. I enjoy giving life to static designs using
            web technologies.
          </p>
          <p className="text-[#373529] text-lg font-medium">
            I wish to learn Game dev, I started learnig it but due to some
            reasons I left it. Maybe in future I will get back to it who knows.
          </p>
        </div>
      </div>
      <div className="h-80"></div>
      <p className="text-center">-----------\(^-^)/------------</p>
      <p className="text-center">Scroll Down For Next Section</p>
      <p className="text-center pb-4">-------------------------------</p>
    </>
  );
};
export default About;
