"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSettings } from "../context/SettingsContext";

export default function FallingPaddles() {
  const { isRainOn } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !isRainOn) return;

    const container = containerRef.current;
    const totalPaddles = 56; // Total unique paddle images
    const paddleCount = 80; // Number of falling paddles on screen
    const paddleElements: HTMLDivElement[] = [];

    // Track mouse position and paddle velocities
    const paddleVelocities = new Map<
      HTMLDivElement,
      { vx: number; vy: number }
    >();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create paddles
    for (let i = 0; i < paddleCount; i++) {
      const paddleWrapper = document.createElement("div");
      paddleWrapper.className = "absolute";

      // Smaller paddles for more realistic size
      const scale = gsap.utils.random(0.15, 0.6);
      const width = 50 * scale;
      const height = 60 * scale;

      paddleWrapper.style.width = `${width}px`;
      paddleWrapper.style.height = `${height}px`;
      paddleWrapper.style.left = `${gsap.utils.random(-10, 110)}%`;
      paddleWrapper.style.top = `-${height + gsap.utils.random(0, 1000)}px`;

      // Create image element with random paddle from 1-43
      const paddleNum = Math.floor(gsap.utils.random(1, totalPaddles + 1));
      const img = document.createElement("img");
      img.src = `/paddles/paddle${paddleNum}.png`;
      img.alt = "paddle";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.opacity = `${gsap.utils.random(0.5, 0.85)}`;

      paddleWrapper.appendChild(img);
      container.appendChild(paddleWrapper);
      paddleElements.push(paddleWrapper);

      // Initialize velocity for each paddle
      paddleVelocities.set(paddleWrapper, { vx: 0, vy: 0 });
    }

    // Animate paddles with wind and natural motion
    paddleElements.forEach((paddle, index) => {
      // Varied speeds - some slow, some medium, some fast
      const speedType = gsap.utils.random(0, 1);
      let duration;
      if (speedType < 0.3) {
        duration = gsap.utils.random(12, 16); // Slow paddles
      } else if (speedType < 0.7) {
        duration = gsap.utils.random(8, 12); // Medium paddles
      } else {
        duration = gsap.utils.random(5, 8); // Fast paddles
      }

      const delay = gsap.utils.random(0, 8);

      // Randomly decide wind direction - some go left, some go right
      const windDirection = Math.random() > 0.5 ? 1 : -1; // 1 = right, -1 = left
      const horizontalFlow = gsap.utils.random(80, 200) * windDirection;

      // Store initial position
      const initialLeft = gsap.utils.random(-10, 110);

      // Create timeline for complex wind-affected fall
      const tl = gsap.timeline({
        repeat: -1,
        delay: delay,
        onStart: () => {
          // Ensure paddle is visible at start
          gsap.set(paddle, {
            opacity: 1,
            visibility: "visible",
          });
        },
        onRepeat: () => {
          // Reset position completely to avoid vanishing
          const newLeft = gsap.utils.random(-10, 110);
          gsap.set(paddle, {
            x: 0,
            y: 0,
            rotation: 0,
            left: `${newLeft}%`,
            top: `-${gsap.utils.random(50, 200)}px`,
            opacity: 1,
            visibility: "visible",
          });
        },
      });

      // Main flow: top-down + horizontal wind (left or right)
      const verticalDrift = window.innerHeight + 300;

      tl.to(
        paddle,
        {
          y: verticalDrift,
          x: horizontalFlow,
          duration: duration,
          ease: "none",
        },
        0
      );

      // Multiple rotation cycles during fall - varies by speed
      const rotations =
        duration > 10
          ? gsap.utils.random(360, 900)
          : gsap.utils.random(180, 540);
      tl.to(
        paddle,
        {
          rotation: rotations * (Math.random() > 0.5 ? 1 : -1),
          duration: duration,
          ease: "none",
        },
        0
      );

      // Zigzag wind effect (swaying both directions)
      const zigzagTimes = Math.floor(duration / 1.2);
      for (let i = 0; i < zigzagTimes; i++) {
        tl.to(
          paddle,
          {
            x: `+=${gsap.utils.random(-50, 50)}`,
            duration: duration / zigzagTimes,
            ease: "sine.inOut",
          },
          i * (duration / zigzagTimes)
        );
      }

      // Floating/rocking motion
      gsap.to(paddle, {
        rotation: `+=${gsap.utils.random(-30, 30)}`,
        duration: gsap.utils.random(0.8, 1.8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay,
      });

      // Subtle scale variation for depth
      gsap.to(paddle, {
        scaleX: gsap.utils.random(0.9, 1.1),
        scaleY: gsap.utils.random(0.9, 1.1),
        duration: gsap.utils.random(1.5, 2.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay,
      });
    });

    // Mouse wind interaction - only horizontal deflection, never affects downward fall
    const applyMouseWind = () => {
      paddleElements.forEach((paddle) => {
        const rect = paddle.getBoundingClientRect();
        const paddleX = rect.left + rect.width / 2;
        const paddleY = rect.top + rect.height / 2;

        // Calculate distance from mouse
        const dx = paddleX - mousePos.current.x;
        const dy = paddleY - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Wind effect radius
        const windRadius = 150;

        // Only apply horizontal force when mouse is near
        if (distance < windRadius && distance > 10) {
          // Calculate force that drops off with distance
          const influence = (windRadius - distance) / windRadius;
          const forceMagnitude = Math.pow(influence, 2) * 60;

          // ONLY horizontal deflection - wind blows sideways
          const pushX = (dx / distance) * forceMagnitude;

          // Apply ONLY horizontal deflection - vertical fall is unaffected
          gsap.to(paddle, {
            x: `+=${pushX}`,
            // NO y property - let natural fall continue uninterrupted
            rotation: `+=${pushX * 0.2}`,
            duration: 0.2,
            ease: "power1.out",
            overwrite: false, // Don't interrupt any existing animations
          });
        }
      });

      requestAnimationFrame(applyMouseWind);
    };

    applyMouseWind();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      paddleElements.forEach((paddle) => paddle.remove());
    };
  }, [isRainOn]);

  if (!isRainOn) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
}
