"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import FlyingMusicNotes from "./FlyingMusicNotes";

const FluteSound = () => {
  const [isOn, setIsOn] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setIsOn(!isOn);
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    }
  };

  return (
    <>
      <FlyingMusicNotes fluteOn={isOn} />
      <div
        ref={imageRef}
        className="fixed bottom-0 right-0 z-50 h-80 w-80 cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src={isOn ? "/flute_on.png" : "/flute_off.png"}
          alt="Flute Sound Toggle"
          fill
          className="object-cover mix-blend-multiply"
        />
      </div>
    </>
  );
};

export default FluteSound;
