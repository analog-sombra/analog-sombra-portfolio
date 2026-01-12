"use client";

import { useEffect, useRef } from "react";

interface Stroke {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  timestamp: number;
  speed: number;
  pressure: number;
}

const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseMovedRef = useRef(false);
  const pointerRef = useRef({
    x: 0.5 * (typeof window !== "undefined" ? window.innerWidth : 0),
    y: 0.5 * (typeof window !== "undefined" ? window.innerHeight : 0),
  });
  const prevPointerRef = useRef({
    x: 0.5 * (typeof window !== "undefined" ? window.innerWidth : 0),
    y: 0.5 * (typeof window !== "undefined" ? window.innerHeight : 0),
  });
  const strokesRef = useRef<Stroke[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const STROKE_LIFETIME = 4000; // 4 seconds before marks disappear

    // Crayon colors array for variety with more realistic tones
    const crayonColors = [
      "#E05735", // red-orange
      "#FF6B6B", // coral
      "#4ECDC4", // turquoise
      "#FFE66D", // yellow
      "#A8E6CF", // mint
      "#FF8B94", // pink
    ];
    let currentColorIndex = 0;
    let lastTime = Date.now();

    // Initialize pointer
    pointerRef.current = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };
    
    prevPointerRef.current = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };

    const updateMousePosition = (eX: number, eY: number) => {
      prevPointerRef.current.x = pointerRef.current.x;
      prevPointerRef.current.y = pointerRef.current.y;
      pointerRef.current.x = eX;
      pointerRef.current.y = eY;
    };

    const handleClick = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
      // Change color on click
      currentColorIndex = (currentColorIndex + 1) % crayonColors.length;
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
      const currentTime = Date.now();
      
      // Remove old strokes
      strokesRef.current = strokesRef.current.filter(
        stroke => currentTime - stroke.timestamp < STROKE_LIFETIME
      );

      // Clear canvas completely (transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only add new stroke if mouse has moved
      const dx = pointerRef.current.x - prevPointerRef.current.x;
      const dy = pointerRef.current.y - prevPointerRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate speed and pressure
      const timeDelta = Math.max(currentTime - lastTime, 1);
      const speed = distance / timeDelta;
      const pressure = Math.min(1, Math.max(0.3, 1 - speed * 0.5)); // Slower = more pressure

      if (distance > 0.5) {
        // Interpolate points for fast movements to prevent gaps
        const maxSegmentLength = 3; // Smaller segments for smoother lines
        
        if (distance > maxSegmentLength) {
          // Need to interpolate - create multiple small segments
          const numSegments = Math.ceil(distance / maxSegmentLength);
          
          for (let i = 0; i < numSegments; i++) {
            const t1 = i / numSegments;
            const t2 = (i + 1) / numSegments;
            
            const x1 = prevPointerRef.current.x + dx * t1;
            const y1 = prevPointerRef.current.y + dy * t1;
            const x2 = prevPointerRef.current.x + dx * t2;
            const y2 = prevPointerRef.current.y + dy * t2;
            
            strokesRef.current.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
              color: crayonColors[currentColorIndex],
              timestamp: currentTime,
              speed: speed,
              pressure: pressure,
            });
          }
        } else {
          // Normal stroke
          strokesRef.current.push({
            x1: prevPointerRef.current.x,
            y1: prevPointerRef.current.y,
            x2: pointerRef.current.x,
            y2: pointerRef.current.y,
            color: crayonColors[currentColorIndex],
            timestamp: currentTime,
            speed: speed,
            pressure: pressure,
          });
        }
      }
      
      lastTime = currentTime;

      // Redraw all active strokes with realistic paper texture
      strokesRef.current.forEach(stroke => {
        const age = currentTime - stroke.timestamp;
        const fadeProgress = age / STROKE_LIFETIME;
        const baseOpacity = 1 - (fadeProgress * 0.5); // More gradual fade
        
        // Base width varies with pressure (slower = thicker)
        const baseWidth = 4 + (stroke.pressure * 8);
        
        // Draw multiple layers for realistic crayon texture
        const numStrokes = 5;
        
        for (let strokeNum = 0; strokeNum < numStrokes; strokeNum++) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          
          // Vary opacity for grainy crayon texture
          const layerOpacity = (0.12 + (strokeNum * 0.08)) * baseOpacity * stroke.pressure;
          ctx.strokeStyle = stroke.color + Math.floor(layerOpacity * 255).toString(16).padStart(2, '0');
          
          // Consistent offset based on timestamp and stroke number
          const seed = stroke.timestamp + strokeNum * 137; // Prime number for better distribution
          const offsetX = Math.sin(seed * 0.0003) * 2.5;
          const offsetY = Math.cos(seed * 0.0003) * 2.5;
          
          // Add paper grain effect
          const grainX = Math.sin(seed * 0.01) * 0.8;
          const grainY = Math.cos(seed * 0.01) * 0.8;
          
          ctx.beginPath();
          ctx.moveTo(stroke.x1 + offsetX + grainX, stroke.y1 + offsetY + grainY);
          
          // Slight wobble for hand-drawn feel
          const wobbleX = Math.sin(seed * 0.002) * 1.2 * stroke.pressure;
          const wobbleY = Math.cos(seed * 0.002) * 1.2 * stroke.pressure;
          
          ctx.lineTo(
            stroke.x2 + offsetX + wobbleX + grainX,
            stroke.y2 + offsetY + wobbleY + grainY
          );
          
          // Vary width per layer for texture
          ctx.lineWidth = baseWidth + (strokeNum * 0.8);
          ctx.stroke();
        }
        
        // Add highlight layer for wax sheen effect
        if (stroke.pressure > 0.6) {
          const highlightOpacity = 0.05 * baseOpacity * stroke.pressure;
          ctx.strokeStyle = '#FFFFFF' + Math.floor(highlightOpacity * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = baseWidth * 0.6;
          ctx.beginPath();
          ctx.moveTo(stroke.x1, stroke.y1);
          ctx.lineTo(stroke.x2, stroke.y2);
          ctx.stroke();
        }
      });

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
