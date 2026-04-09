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

  // Spring-physics cursor — vx/vy drive x/y toward targetX/Y with overshoot
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, targetX: -1000, targetY: -1000, active: false });

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
    const SPRING = 1.0;  // restoring force constant — lower = slower return
    const FRICTION = 0.68; // velocity multiplier per frame — lower = faster damping
    const MAX_AMP = 200;  // max vertical displacement (px)
    const IMPULSE_SCALE = 30;   // scroll-delta px → velocity px/s

    const handleScroll = (e: Event) => {
      const sa = scrollAnim.current;
      const m  = mouseRef.current;

      // For element-level scroll (snap-container), use scrollTop.
      // For window-level scroll, fall back to window.scrollY.
      const target = e.currentTarget as HTMLElement | Window;
      const currentScrollY = target instanceof Window
        ? window.scrollY
        : (target as HTMLElement).scrollTop;

      const delta = currentScrollY - sa.lastScrollY;
      sa.lastScrollY = currentScrollY;

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
    // Brightness state — persists across rAF frames
    let prevSpeed  = 0;    // speed from the previous frame (for accel detection)
    let brightness = 1.0;  // current smoothed brightness multiplier

    const draw = (time: number) => {
      const m = mouseRef.current;
      const sa = scrollAnim.current;

      // Real dt capped at 50 ms to avoid big jumps on tab-switch / focus loss
      const dt = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 1 / 60;
      lastFrameTime = time;

      // 1. Spring-physics cursor (same system as scroll)
      //    Spring pulls x/y toward targetX/Y; friction bleeds overshoot.
      //    Fast moves → spotlight overshoots → springs back.
      const MOUSE_SPRING = 7;   // restoring force — higher = snappier
      const MOUSE_FRICTION = 0.46; // velocity multiplier/frame — lower = quicker settle

      m.vx += -MOUSE_SPRING * (m.x - m.targetX);
      m.vy += -MOUSE_SPRING * (m.y - m.targetY);
      m.vx *= MOUSE_FRICTION;
      m.vy *= MOUSE_FRICTION;
      m.x += m.vx * dt;
      m.y += m.vy * dt;

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
          sa.offsetY = Math.sign(sa.offsetY) * MAX_AMP;
          sa.velocity = -sa.velocity * 0.55; // reflect with ~45% energy loss
          sa.locked = true;
        }

        offsetY = sa.offsetY;

        // Fully settled — clean up
        if (Math.abs(sa.offsetY) < 0.5 && Math.abs(sa.velocity) < 1) {
          sa.offsetY = 0;
          sa.velocity = 0;
          sa.active = false;
          sa.locked = false;
        }
      }

      // 3. Brightness — brighter while accelerating, faded while decelerating
      //    Total spring speed (mouse + scroll) signals which phase we're in.
      const mouseSpeed  = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
      const scrollSpeed = Math.abs(sa.velocity);
      const totalSpeed  = mouseSpeed + scrollSpeed;

      const isAccelerating = totalSpeed > prevSpeed + 0.5; // small deadband
      prevSpeed = totalSpeed;

      // Target brightness: phase 1 = bright, phase 2 = faded, idle = 1.0
      const atRest = totalSpeed < 2;
      const targetBrightness = atRest
        ? 1.0
        : isAccelerating
          ? 1.0 + Math.min(totalSpeed / 300, 1) * 1.2  // up to 2.2×
          : Math.max(0.2, 1.0 - Math.min(totalSpeed / 200, 1) * 0.8); // down to 0.2×

      // Smoothly chase the target (fast chase up, slower fade back)
      const chaseSpeed = isAccelerating ? 0.25 : 0.08;
      brightness += (targetBrightness - brightness) * chaseSpeed;

      // 4. Effective cursor: real mouse + vertical spring offset (X unchanged)
      //    Both the spotlight CENTER and the ROTATION TARGET use the spring
      //    position (m.x / m.y) — not the raw cursor — so moving the cursor
      //    during a scroll animation doesn't cause an instant rotation snap.
      //    They're both chasing the same point in sync.
      const effectiveX = m.x;
      const effectiveY = m.y + offsetY;
      const effectiveTargetX = m.x;
      const effectiveTargetY = m.y + offsetY;

      ctx.clearRect(0, 0, width, height);

      if (m.active) {
        const startCol = Math.max(0, Math.floor((effectiveX - range) / density));
        const endCol = Math.min(Math.ceil(width / density), Math.ceil((effectiveX + range) / density));
        const startRow = Math.max(0, Math.floor((effectiveY - range) / density));
        const endRow = Math.min(Math.ceil(height / density), Math.ceil((effectiveY + range) / density));

        ctx.strokeStyle = currentColorRef.current;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            const px = c * density;
            const py = r * density;

            const dxDist = effectiveX - px;
            const dyDist = effectiveY - py;
            const distSq = dxDist * dxDist + dyDist * dyDist;
            const rangeSq = range * range;

            if (distSq < rangeSq) {
              const dist = Math.sqrt(distSq);
              const opacity = Math.pow(1 - dist / range, 2);

              const dxRot = effectiveTargetX - px;
              const dyRot = effectiveTargetY - py;
              let angle = Math.atan2(dyRot, dxRot);

              // Symmetric normalisation — prevents 180° flip glitches
              if (angle > Math.PI / 2) angle -= Math.PI;
              else if (angle < -Math.PI / 2) angle += Math.PI;

              ctx.save();
              ctx.globalAlpha = Math.min(1, opacity * brightness);
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
