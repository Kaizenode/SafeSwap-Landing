import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

const stats = [
  { to: 1.4, decimals: 1, prefix: "$", suffix: "B", label: "Swapped peer-to-peer" },
  { to: 312, suffix: "K", label: "Verified traders" },
  { to: 180, suffix: "+", label: "Countries served" },
  { to: 5, suffix: "s", label: "Median settlement" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-mint/10 bg-ink-deep/40 py-20">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[clamp(2.6rem,5vw,4rem)] font-black leading-none tracking-tightest text-grad">
              <Counter
                to={s.to}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
              />
            </div>
            <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-mint-pale/45">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
