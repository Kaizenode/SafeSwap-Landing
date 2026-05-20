import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Returns true when viewport matches the given media query.
 * SSR-safe (defaults to false on first render).
 */
export function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatch(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return match;
}

/** Convenience: viewport < 768px (Tailwind's md breakpoint). */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Pointer-tilt hook. Returns spring-smoothed rotateX / rotateY motion values
 * driven by the pointer position over a target element. Honors prefers-reduced-motion.
 */
export function usePointerTilt(opts: {
  max?: number;
  stiffness?: number;
  damping?: number;
} = {}) {
  const { max = 10, stiffness = 140, damping = 18 } = opts;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness, damping, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness, damping, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    // Skip on touch / non-hover devices — tilt-on-tap looks broken.
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry.set(px * max * 2);
      rx.set(-py * max * 2);
    }
    function onLeave() {
      rx.set(0);
      ry.set(0);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, rx, ry, max]);

  return { ref, rotateX, rotateY } as {
    ref: React.RefObject<HTMLDivElement>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
  };
}

/** Smaller convenience: linear remap. */
export const remap = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);
