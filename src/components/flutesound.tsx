"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import FlyingMusicNotes from "./FlyingMusicNotes";
import { useSettings } from "../context/SettingsContext";

const FluteSound = () => {
  const { showFluteComponent } = useSettings();
  const [isMusicOn, setIsMusicOn] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setIsMusicOn((prev) => !prev);
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    }
  };

  if (!showFluteComponent) {
    return null;
  }

  return (
    <>
      <FlyingMusicNotes fluteOn={isMusicOn} />
      <div
        ref={imageRef}
        className="fixed bottom-0 right-0 z-50 h-80 w-80 cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src={isMusicOn ? "/flute_on.png" : "/flute_off.png"}
          alt="Flute Sound Toggle"
          fill
          className="object-cover mix-blend-multiply"
        />
      </div>
    </>
  );
};

export default FluteSound;
