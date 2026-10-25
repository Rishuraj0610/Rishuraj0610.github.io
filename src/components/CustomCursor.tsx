import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Only run on desktop with fine mouse pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    if (rootRef.current) {
      rootRef.current.style.display = 'block';
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    const root = rootRef.current;

    const updateRingStyle = () => {
      if (!ring) return;
      if (isClicking.current) {
        ring.style.width = '24px';
        ring.style.height = '24px';
        ring.style.borderColor = '#5fb57a';
        ring.style.backgroundColor = 'rgba(95, 181, 122, 0.35)';
      } else if (isHovered.current) {
        ring.style.width = '44px';
        ring.style.height = '44px';
        ring.style.borderColor = '#111111';
        ring.style.backgroundColor = 'rgba(95, 181, 122, 0.2)';
      } else {
        ring.style.width = '30px';
        ring.style.height = '30px';
        ring.style.borderColor = 'rgba(17, 17, 17, 0.45)';
        ring.style.backgroundColor = 'transparent';
      }
    };

    const updateDotStyle = () => {
      if (!dot) return;
      if (isClicking.current) {
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.backgroundColor = '#5fb57a';
      } else if (isHovered.current) {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = '#111111';
      } else {
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.backgroundColor = '#111111';
      }
    };

    // Immediate zero-lag dot movement on mouse move
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (root) root.style.opacity = '1';
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }

      // Hardware-accelerated instantaneous dot position (0ms delay)
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // High performance hover detection on element boundary crossing (NOT on every mousemove pixel)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .neo-btn, .neo-box, .stamp-badge'
      );

      if (interactive) {
        isHovered.current = true;
        const customText = interactive.getAttribute('data-cursor');
        if (textEl) {
          textEl.textContent = customText || '';
          textEl.style.display = customText ? 'block' : 'none';
        }
        updateRingStyle();
        updateDotStyle();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .neo-btn, .neo-box, .stamp-badge'
      );

      if (interactive) {
        // Check if leaving to another interactive element or outside
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !related.closest('a, button, input, textarea, select, [role="button"], .neo-btn, .neo-box, .stamp-badge')) {
          isHovered.current = false;
          if (textEl) {
            textEl.textContent = '';
            textEl.style.display = 'none';
          }
          updateRingStyle();
          updateDotStyle();
        }
      }
    };

    const onMouseDown = () => {
      isClicking.current = true;
      updateRingStyle();
      updateDotStyle();
    };

    const onMouseUp = () => {
      isClicking.current = false;
      updateRingStyle();
      updateDotStyle();
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (root) root.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (root) root.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    // Smooth physics trailing loop for the outer ring using lerp with delta-time safety
    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth frame-rate independent lerp (snappy & smooth, zero lag)
      const factor = 1 - Math.exp(-22 * dt);
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * factor;

      if (ring) {
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-200"
      style={{ display: 'none' }}
      aria-hidden="true"
    >
      {/* Precision Core Dot - Instant response with NO transform lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-[#111111]"
        style={{
          width: '6px',
          height: '6px',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out',
        }}
      />

      {/* Fluid Trailing Geometric Ring - Fast & buttery smooth lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border-[1.5px] border-[#111111]/45 flex items-center justify-center backdrop-blur-[0.5px]"
        style={{
          width: '30px',
          height: '30px',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.18s ease-out, border-color 0.18s ease-out',
        }}
      >
        <span
          ref={textRef}
          className="text-[9px] font-mono-code font-bold uppercase tracking-wider text-[#111111]"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
