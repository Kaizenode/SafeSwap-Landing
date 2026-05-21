import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe2,
  ArrowLeftRight,
} from "lucide-react";
import { ShieldMark } from "./Logo";
import { usePointerTilt } from "../lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

function SwapVisual() {
  const { ref, rotateX, rotateY } = usePointerTilt({ max: 9 });

  return (
    <div
      ref={ref}
      className="perspective-1400 relative mx-auto aspect-square w-full max-w-[520px]"
    >
      {/* ambient glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(1,167,143,0.34),transparent_62%)] blur-2xl" />

      {/* rotating dashed shield orbit */}
      <div className="absolute inset-6 animate-spin-slow rounded-[44%] border border-dashed border-mint/15" />
      <div className="absolute inset-16 animate-spin-slow rounded-[46%] border border-mint/[0.08] [animation-direction:reverse]" />

      {/* ghost shield behind */}
      <ShieldMark className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] blur-[1px]" />

      {/* swap card — top-left anchored to orbit center, extends down-right */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass absolute left-[55%] top-1/2 w-[88%] max-w-[400px] rounded-[28px] p-5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] will-change-transform"
      >
        <div className="flex items-center justify-between px-1 pb-4">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-mint-pale/50">
            Live swap
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-mint">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
            P2P matched
          </span>
        </div>

        {/* you send */}
        <div className="rounded-2xl border border-mint/10 bg-ink-deep/60 p-4">
          <div className="mb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-mint-pale/40">
            You send
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-mint-pale">
              0.50 <span className="text-mint-pale/50">XLM·BTC</span>
            </span>
            <span className="flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1.5 text-sm font-bold text-mint">
              <span className="h-5 w-5 rounded-full bg-gradient-to-br from-mint to-green" />
              Crypto
            </span>
          </div>
        </div>

        {/* swap button */}
        <div className="relative flex justify-center">
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-mint/30" />
          <button className="relative z-10 -my-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-ink-deep bg-mint text-ink shadow-lg transition-transform hover:rotate-180 duration-500">
            <ArrowLeftRight className="h-5 w-5 rotate-90" strokeWidth={2.6} />
          </button>
        </div>

        {/* you receive */}
        <div className="rounded-2xl border border-mint/10 bg-ink-deep/60 p-4">
          <div className="mb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-mint-pale/40">
            You receive
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-grad">
              $32,140.00
            </span>
            <span className="flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1.5 text-sm font-bold text-mint">
              <span className="h-5 w-5 rounded-full bg-gradient-to-br from-mint-soft to-mint" />
              Fiat
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1 text-xs text-mint-pale/40">
          <span>Settled in ~5s on Stellar</span>
          <span className="font-semibold text-mint-pale/70">0% hidden fees</span>
        </div>
      </motion.div>

    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(1,167,143,0.22),transparent_70%)] blur-3xl" />
        <div className="absolute -right-40 top-40 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(95,214,172,0.16),transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,214,172,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(95,214,172,0.06) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%,#000 40%,transparent 75%)",
          }}
        />
      </div>

      <div className="container-x grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow"
          >
            <span className="h-px w-7 bg-mint" />
            Decentralized P2P · Built on Stellar
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
            className="mt-6 text-[clamp(2.8rem,6.4vw,5.4rem)] font-black leading-[0.95] tracking-tightest text-mint-pale"
          >
            Swap crypto.
            <br />
            Receive fiat.
            <br />
            <span className="text-grad">Stay protected.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-mint-pale/60"
          >
            SafeSwap is the safe, transparent marketplace where you trade your
            crypto for real-world money — peer to peer, settled in seconds, and
            secured end-to-end by the Stellar blockchain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#swap" className="btn-primary">
              Start a swap
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
            </a>
            <a href="#how" className="btn-ghost">
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-mint/10 pt-7"
          >
            {[
              { icon: ShieldCheck, label: "Escrow-secured" },
              { icon: Zap, label: "~5s settlement" },
              { icon: Globe2, label: "180+ countries" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-sm font-semibold text-mint-pale/70"
              >
                <Icon className="h-5 w-5 text-mint" strokeWidth={2} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <SwapVisual />
      </div>
    </section>
  );
}
