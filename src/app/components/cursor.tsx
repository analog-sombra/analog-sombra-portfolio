"use client";

import { useEffect, useRef } from "react";

const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseMovedRef = useRef(false);
  const pointerRef = useRef({
    x: 0.5 * (typeof window !== "undefined" ? window.innerWidth : 0),
    y: 0.5 * (typeof window !== "undefined" ? window.innerHeight : 0),
  });
  const trailRef = useRef<
    Array<{ x: number; y: number; dx: number; dy: number }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const params = {
      pointsNumber: 40,
      widthFactor: 0.3,
      mouseThreshold: 0.6,
      spring: 0.4,
      friction: 0.5,
    };

    // Initialize pointer
    pointerRef.current = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };

    // Initialize trail
    trailRef.current = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
      trailRef.current[i] = {
        x: pointerRef.current.x,
        y: pointerRef.current.y,
        dx: 0,
        dy: 0,
      };
    }

    const updateMousePosition = (eX: number, eY: number) => {
      pointerRef.current.x = eX;
      pointerRef.current.y = eY;
    };

    const handleClick = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseMovedRef.current = true;
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouseMovedRef.current = true;
      updateMousePosition(
        e.targetTouches[0].clientX,
        e.targetTouches[0].clientY
      );
    };

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const update = (t: number) => {
      // For intro motion
      if (!mouseMovedRef.current) {
        pointerRef.current.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointerRef.current.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailRef.current.forEach((p, pIdx) => {
        const prev =
          pIdx === 0 ? pointerRef.current : trailRef.current[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.strokeStyle = "#E05735";
      ctx.beginPath();
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

      for (let i = 1; i < trailRef.current.length - 1; i++) {
        const xc = 0.5 * (trailRef.current[i].x + trailRef.current[i + 1].x);
        const yc = 0.5 * (trailRef.current[i].y + trailRef.current[i + 1].y);
        ctx.quadraticCurveTo(trailRef.current[i].x, trailRef.current[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }
      ctx.lineTo(
        trailRef.current[trailRef.current.length - 1].x,
        trailRef.current[trailRef.current.length - 1].y
      );
      ctx.stroke();

      requestAnimationFrame(update);
    };

    setupCanvas();
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", setupCanvas);

    const animationFrame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50"
    />
  );
};
export default Cursor;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
