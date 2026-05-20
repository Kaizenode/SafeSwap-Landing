import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Lock, FileCheck2, Scale, RadioTower } from "lucide-react";
import { Reveal } from "./Reveal";
import { ShieldMark } from "./Logo";

const guarantees = [
  {
    icon: Lock,
    title: "Non-custodial by default",
    body: "SafeSwap never holds your keys or your funds. Smart-contract escrow only releases when both sides are satisfied.",
  },
  {
    icon: FileCheck2,
    title: "Auditable on-chain",
    body: "Every quote, lock, and release is a public Stellar ledger entry. Verify any trade independently, forever.",
  },
  {
    icon: Scale,
    title: "Built-in dispute resolution",
    body: "If a fiat payment is contested, time-locked arbitration protects the honest party — no support ticket lottery.",
  },
  {
    icon: RadioTower,
    title: "Reputation that travels",
    body: "Counterparty scores are derived from completed on-chain swaps, so trust is earned and impossible to fake.",
  },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const rotY = useTransform(progress, [0, 1], [reduced ? 0 : -25, reduced ? 0 : 25]);
  const rotX = useTransform(progress, [0, 1], [reduced ? 0 : 12, reduced ? 0 : -12]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.92, 1.04, 0.96]);

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:py-36"
    >
      <div className="container-x grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal variant="scale">
          <div className="perspective-1400 relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(1,167,143,0.3),transparent_62%)] blur-2xl" />
            <div className="absolute inset-4 animate-pulse-ring rounded-full border border-mint/30" />
            <div className="absolute inset-10 animate-spin-slow rounded-[44%] border border-dashed border-mint/20" />
            <motion.div
              style={{
                rotateX: rotX,
                rotateY: rotY,
                scale,
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <ShieldMark
                className="h-[62%] w-[62%] drop-shadow-[0_20px_60px_rgba(1,167,143,0.45)]"
                animated
              />
            </motion.div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em] text-mint-pale/40">
              Security in motion
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">004 / Trust architecture</span>
            <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.02] tracking-tightest text-mint-pale">
              The shield isn't a logo.
              <br />
              <span className="text-grad">It's the protocol.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {guarantees.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1} variant="up">
                <div className="flex flex-col">
                  <g.icon className="h-6 w-6 text-mint" strokeWidth={2} />
                  <h3 className="mt-4 text-base font-bold text-mint-pale">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mint-pale/55">
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
