'use client';
import React, { useEffect, useRef } from 'react';

interface VectorFieldProps {
  density?: number;
  color?: string;
  range?: number;
}

const VectorField: React.FC<VectorFieldProps> = ({
  density = 35,
  color,
  range = 300 // Increased visible area as requested
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const lastUpdateRef = useRef(0);
  const currentColorRef = useRef(color || '#38bdf8');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const updateColor = () => {
      // Use document.body because data-theme is applied there
      const bodyStyles = getComputedStyle(document.body);
      const computed = bodyStyles.getPropertyValue('--vector-field-color').trim();
      
      // Log to ensure we're getting the right value if needed (optional)
      currentColorRef.current = color || computed || '#38bdf8';
    };

    const observer = new MutationObserver(updateColor);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    updateColor();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const draw = (time: number) => {
      // 1. Interpolate mouse for the spotlight lag effect (0.1s feel)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        // 2. Optimization: Calculate bounding box of visible area
        const startCol = Math.max(0, Math.floor((mouse.x - range) / density));
        const endCol = Math.min(Math.ceil(width / density), Math.ceil((mouse.x + range) / density));
        const startRow = Math.max(0, Math.floor((mouse.y - range) / density));
        const endRow = Math.min(Math.ceil(height / density), Math.ceil((mouse.y + range) / density));

        ctx.strokeStyle = currentColorRef.current;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        // 3. Only loop through visible "matrix" items
        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const px = c * density;
            const py = r * density;

            // Distance calculation uses interpolated "laggy" mouse for the spotlight feel
            const dxDist = mouse.x - px;
            const dyDist = mouse.y - py;
            const distSq = dxDist * dxDist + dyDist * dyDist;
            const rangeSq = range * range;

            if (distSq < rangeSq) {
              const dist = Math.sqrt(distSq);
              const opacity = Math.pow(1 - dist / range, 2);

              // Rotation uses the actual target "newest" mouse position as requested
              const dxRot = mouse.targetX - px;
              const dyRot = mouse.targetY - py;
              let angle = Math.atan2(dyRot, dxRot);

              // Normalize angle for symmetric line segments
              if (angle > Math.PI / 2) angle -= Math.PI;
              else if (angle < -Math.PI / 2) angle += Math.PI;

              ctx.save();
              ctx.globalAlpha = opacity;
              ctx.translate(px, py);
              ctx.rotate(angle);

              // Draw small line
              ctx.beginPath();
              ctx.moveTo(-7, 0);
              ctx.lineTo(7, 0);
              ctx.stroke();

              ctx.restore();
            }
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [density, color, range]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default VectorField;
