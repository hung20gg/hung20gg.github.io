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
  range = 300
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smoothed real cursor
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  // Spring-physics scroll animation — purely vertical
  // Each scroll event fires an impulse into `velocity`.
  // Every rAF frame applies:
  //   spring force = -SPRING * offsetY   (pulls back to 0)
  //   friction     = FRICTION per frame  (bleeds energy)
  //   offsetY     += velocity * dt
  //
  // When |offsetY| ≥ MAX_AMP:
  //   velocity is reflected (single bounce) and locked — no more scroll
  //   impulses accepted until the spring fully settles at 0.
  const scrollAnim = useRef({
    offsetY: 0,    // current vertical displacement (px)
    velocity: 0,   // current velocity (px/s)
    active: false,
    locked: false, // true after the MAX bounce — blocks new impulses
    lastScrollY: 0,
  });

  const currentColorRef = useRef(color || '#38bdf8');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let width = 0;
    let height = 0;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    // ── Theme colour observer ───────────────────────────────────────────────
    const updateColor = () => {
      const computed = getComputedStyle(document.body).getPropertyValue('--vector-field-color').trim();
      currentColorRef.current = color || computed || '#38bdf8';
    };
    const observer = new MutationObserver(updateColor);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    updateColor();

    // ── Real mouse (window-level so canvas pointer-events:none is fine) ─────
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const m = mouseRef.current;
      m.targetX = e.clientX - rect.left;
      m.targetY = e.clientY - rect.top;
      m.active = true;
    };

    // ── Scroll → spring impulse ─────────────────────────────────────────────
    const SPRING        = 2.0;  // restoring force constant — lower = slower return
    const FRICTION      = 0.88; // velocity multiplier per frame — lower = faster damping
    const MAX_AMP       = 160;  // max vertical displacement (px)
    const IMPULSE_SCALE = 14;   // scroll-delta px → velocity px/s

    const handleScroll = () => {
      const sa = scrollAnim.current;
      const m  = mouseRef.current;

      const scrollY = window.scrollY;
      const delta = scrollY - sa.lastScrollY;
      sa.lastScrollY = scrollY;

      if (!m.active || delta === 0) return;

      // Once bounced off MAX, ignore further scroll until fully settled
      if (sa.locked) return;

      // Clamp per-event impulse so a single huge scroll doesn't teleport
      const impulse = Math.max(-90, Math.min(90, delta * IMPULSE_SCALE));
      sa.velocity += impulse;
      sa.active = true;
    };

    // ── Draw loop ───────────────────────────────────────────────────────────
    let lastFrameTime = 0;
    const draw = (time: number) => {
      const m  = mouseRef.current;
      const sa = scrollAnim.current;

      // Real dt capped at 50 ms to avoid big jumps on tab-switch / focus loss
      const dt = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 1 / 60;
      lastFrameTime = time;

      // 1. Interpolate real mouse (smooth lag)
      m.x += (m.targetX - m.x) * 0.12;
      m.y += (m.targetY - m.y) * 0.12;

      // 2. Spring physics step
      let offsetY = 0;
      if (sa.active) {
        // Spring pulls back to centre
        sa.velocity += -SPRING * sa.offsetY;
        // Friction bleeds kinetic energy
        sa.velocity *= FRICTION;
        // Integrate position
        sa.offsetY += sa.velocity * dt;

        // Hit cap → reflect velocity (one bounce) and lock new impulses
        if (Math.abs(sa.offsetY) >= MAX_AMP) {
          sa.offsetY  = Math.sign(sa.offsetY) * MAX_AMP;
          sa.velocity = -sa.velocity * 0.55; // reflect with ~45% energy loss
          sa.locked   = true;
        }

        offsetY = sa.offsetY;

        // Fully settled — clean up
        if (Math.abs(sa.offsetY) < 0.5 && Math.abs(sa.velocity) < 1) {
          sa.offsetY  = 0;
          sa.velocity = 0;
          sa.active   = false;
          sa.locked   = false;
        }
      }

      // 3. Effective cursor: real mouse + vertical spring offset (X unchanged)
      const effectiveX       = m.x;
      const effectiveY       = m.y + offsetY;
      const effectiveTargetX = m.targetX;
      const effectiveTargetY = m.targetY + offsetY;

      ctx.clearRect(0, 0, width, height);

      if (m.active) {
        const startCol = Math.max(0, Math.floor((effectiveX - range) / density));
        const endCol   = Math.min(Math.ceil(width  / density), Math.ceil((effectiveX + range) / density));
        const startRow = Math.max(0, Math.floor((effectiveY - range) / density));
        const endRow   = Math.min(Math.ceil(height / density), Math.ceil((effectiveY + range) / density));

        ctx.strokeStyle = currentColorRef.current;
        ctx.lineWidth   = 1.5;
        ctx.lineCap     = 'round';

        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const px = c * density;
            const py = r * density;

            const dxDist = effectiveX - px;
            const dyDist = effectiveY - py;
            const distSq = dxDist * dxDist + dyDist * dyDist;
            const rangeSq = range * range;

            if (distSq < rangeSq) {
              const dist    = Math.sqrt(distSq);
              const opacity = Math.pow(1 - dist / range, 2);

              const dxRot = effectiveTargetX - px;
              const dyRot = effectiveTargetY - py;
              let angle = Math.atan2(dyRot, dxRot);

              // Symmetric normalisation — prevents 180° flip glitches
              if (angle > Math.PI / 2)  angle -= Math.PI;
              else if (angle < -Math.PI / 2) angle += Math.PI;

              ctx.save();
              ctx.globalAlpha = opacity;
              ctx.translate(px, py);
              ctx.rotate(angle);

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

    // ── Attach ──────────────────────────────────────────────────────────────
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also catch scroll on snap-containers (not window-level scroll)
    const snapContainers = document.querySelectorAll<HTMLElement>('.snap-container');
    snapContainers.forEach(el => el.addEventListener('scroll', handleScroll, { passive: true }));

    resize();
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      snapContainers.forEach(el => el.removeEventListener('scroll', handleScroll));
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
        zIndex: 0
      }}
    />
  );
};

export default VectorField;
