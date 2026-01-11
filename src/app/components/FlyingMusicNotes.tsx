"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FlyingMusicNotesProps {
  fluteOn: boolean;
}

export default function FlyingMusicNotes({ fluteOn }: FlyingMusicNotesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeNotes = useRef<Set<HTMLDivElement>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const totalMusicNotes = 5; // music1.png to music10.png

    const createMusicNote = () => {
      if (!container || !fluteOn) return;

      const noteWrapper = document.createElement("div");
      noteWrapper.className = "absolute pointer-events-none";

      // Random size for variety
      const scale = gsap.utils.random(0.4, 0.8);
      const width = 60 * scale;
      const height = 60 * scale;

      noteWrapper.style.width = `${width}px`;
      noteWrapper.style.height = `${height}px`;

      // Start position: bottom-right corner (where flute is)
      // Positioning near the flute image
      noteWrapper.style.left = `calc(100% - ${gsap.utils.random(200, 250)}px)`;
      noteWrapper.style.top = `calc(100% - ${gsap.utils.random(150, 200)}px)`;
      noteWrapper.style.zIndex = "45";

      // Create image element with random music note
      const noteNum = Math.floor(gsap.utils.random(1, totalMusicNotes + 1));
      const img = document.createElement("img");
      img.src = `/musics/music${noteNum}.png`;
      img.alt = "music note";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";

      noteWrapper.appendChild(img);
      container.appendChild(noteWrapper);
      activeNotes.current.add(noteWrapper);

      // Set initial state: very low opacity and scale 0
      gsap.set(noteWrapper, { opacity: 0.1, scale: 0 });

      // Animation timeline with reduced lifespan
      const totalDuration = gsap.utils.random(5, 8); // Much slower animation
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Clean up after animation
          activeNotes.current.delete(noteWrapper);
          if (container.contains(noteWrapper)) {
            container.removeChild(noteWrapper);
          }
        },
      });

      // Wave parameters using sin/cos
      const amplitude = gsap.utils.random(40, 80); // Wave height
      const frequency = gsap.utils.random(2, 4); // Number of waves
      const horizontalDistance = gsap.utils.random(300, 800); // Distance to travel
      
      // Natural grow: scale from 0 to full size while fading in
      tl.to(noteWrapper, {
        scale: gsap.utils.random(0.8, 1.2),
        opacity: gsap.utils.random(0.7, 0.9),
        duration: 2,
        ease: "back.out(1.7)",
      });

      // Create wave motion using onUpdate with sin/cos
      const startTime = Date.now();
      tl.to(
        noteWrapper,
        {
          x: -horizontalDistance,
          y: -200, // Move upward
          duration: totalDuration,
          ease: "power1.out",
          onUpdate: function() {
            const progress = this.progress();
            const angle = progress * Math.PI * frequency;
            
            // Use sin for vertical wave motion
            const waveY = Math.sin(angle) * amplitude;
            
            // Apply wave offset
            gsap.set(noteWrapper, {
              y: -200 * progress + waveY,
            });
          },
        },
        0
      );

      // Smooth rotation as it floats
      tl.to(
        noteWrapper,
        {
          rotation: gsap.utils.random(-120, 120),
          duration: totalDuration,
          ease: "power1.inOut",
        },
        0
      );

      // Fade out before vanishing (reduced duration)
      tl.to(
        noteWrapper,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power2.in",
        },
        `-=1.5`
      );
    };

    // Start creating notes when flute is on
    if (fluteOn) {
      // Create notes at intervals
      intervalRef.current = setInterval(() => {
        createMusicNote();
      }, gsap.utils.random(600, 1200)); // Random intervals for natural feel

      // Create initial note immediately
      createMusicNote();
    } else {
      // Clean up all existing notes when flute is turned off
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Fade out and remove all active notes
      activeNotes.current.forEach((note) => {
        gsap.to(note, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (container.contains(note)) {
              container.removeChild(note);
            }
            activeNotes.current.delete(note);
          },
        });
      });
    }

    // Cleanup on unmount or when fluteOn changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      activeNotes.current.forEach((note) => {
        if (container.contains(note)) {
          container.removeChild(note);
        }
      });
      activeNotes.current.clear();
    };
  }, [fluteOn]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 45 }}
    />
  );
}
