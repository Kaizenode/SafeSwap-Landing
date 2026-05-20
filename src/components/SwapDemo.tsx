import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { usePointerTilt } from "../lib/motion";

const CRYPTO: Record<string, { usd: number; label: string }> = {
  BTC: { usd: 64280, label: "Bitcoin" },
  ETH: { usd: 3410, label: "Ethereum" },
  XLM: { usd: 0.11, label: "Stellar Lumens" },
  USDC: { usd: 1, label: "USD Coin" },
};
const FIAT: Record<string, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: "$" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.79, symbol: "£" },
  NGN: { rate: 1480, symbol: "₦" },
};

type Phase = "idle" | "matching" | "matched";

function AnimatedAmount({ value, symbol }: { value: number; symbol: string }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0.00");

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = mv.on("change", (v) =>
      setDisplay(v.toLocaleString("en-US", { maximumFractionDigits: 2 })),
    );
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, mv]);

  return (
    <span className="w-full truncate text-3xl font-bold tracking-tight text-grad">
      {symbol}
      {display}
    </span>
  );
}

function ParticleTrail({ active }: { active: boolean }) {
  // 6 dots traveling from top (send box) to bottom (receive box) along the center axis
  const dots = [0, 1, 2, 3, 4, 5];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[112px] bottom-[112px] z-0"
    >
      <div className="relative mx-auto h-full w-1">
        <AnimatePresence>
          {active &&
            dots.map((i) => (
              <motion.span
                key={i}
                initial={{ top: "0%", opacity: 0, scale: 0.6 }}
                animate={{
                  top: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.6, 1, 1, 0.4],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.6,
                  delay: i * 0.18,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-mint shadow-[0_0_14px_rgba(95,214,172,0.85)]"
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SwapDemo() {
  const [amount, setAmount] = useState("0.5");
  const [crypto, setCrypto] = useState("BTC");
  const [fiat, setFiat] = useState("USD");
  const [phase, setPhase] = useState<Phase>("idle");
  const reduced = useReducedMotion();

  const { ref: tiltRef, rotateX, rotateY } = usePointerTilt({ max: 7 });
  // smooth subtle z-lift when matched
  const matchedZ = useMotionValue(0);
  const matchedZSpring = useSpring(matchedZ, { stiffness: 130, damping: 22 });
  useEffect(() => {
    matchedZ.set(phase === "matched" ? 24 : 0);
  }, [phase, matchedZ]);
  const matchedShadow = useTransform(matchedZSpring, [0, 24], [
    "0 50px 140px -40px rgba(0,0,0,0.85)",
    "0 80px 180px -40px rgba(1,167,143,0.5)",
  ]);

  const payout = useMemo(() => {
    const a = parseFloat(amount) || 0;
    const gross = a * CRYPTO[crypto].usd * FIAT[fiat].rate;
    const net = gross * 0.991;
    return { gross, net };
  }, [amount, crypto, fiat]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  const timerRef = useRef<number | null>(null);
  function findMatch() {
    setPhase("matching");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setPhase("matched"), 1900);
  }
  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  return (
    <section id="swap" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(1,167,143,0.16),transparent_68%)] blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
        <Reveal variant="left">
          <span className="eyebrow">003 / Try it</span>
          <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.02] tracking-tightest text-mint-pale">
            Feel the swap
            <br />
            <span className="text-grad">before you sign up.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mint-pale/55">
            This is a live preview of the SafeSwap engine. Pick an asset, set an
            amount, and watch the peer-to-peer matcher quote your fiat payout in
            real time — fees and all, nothing hidden.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Transparent 0.9% all-in spread",
              "Funds escrowed before any match",
              "Settles on Stellar in ~5 seconds",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 text-sm font-medium text-mint-pale/70"
              >
                <ShieldCheck className="h-5 w-5 text-mint" strokeWidth={2} />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="right" delay={0.12}>
          <div ref={tiltRef} className="perspective-1400">
            <motion.div
              style={{
                rotateX: reduced ? 0 : rotateX,
                rotateY: reduced ? 0 : rotateY,
                boxShadow: matchedShadow,
                transformStyle: "preserve-3d",
              }}
              className="glass relative mx-auto w-full max-w-[480px] rounded-[30px] p-6 will-change-transform"
            >
              <ParticleTrail active={phase === "matched" && !reduced} />

              {/* send */}
              <label
                className="relative z-10 block rounded-2xl border border-mint/10 bg-ink-deep/60 p-5"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-mint-pale/40">
                  You send
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setPhase("idle");
                    }}
                    className="w-full bg-transparent text-3xl font-bold tracking-tight text-mint-pale outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <select
                    value={crypto}
                    onChange={(e) => {
                      setCrypto(e.target.value);
                      setPhase("idle");
                    }}
                    className="shrink-0 cursor-pointer rounded-full border border-mint/15 bg-ink-700 px-4 py-2 text-sm font-bold text-mint-pale outline-none"
                  >
                    {Object.keys(CRYPTO).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="mt-1 block text-xs text-mint-pale/40">
                  {CRYPTO[crypto].label} · ${fmt(CRYPTO[crypto].usd)}
                </span>
              </label>

              <div
                className="relative z-10 flex justify-center"
                style={{ transform: "translateZ(36px)" }}
              >
                <div className="-my-3 flex h-11 w-11 items-center justify-center rounded-full border-4 border-ink-deep bg-mint text-ink">
                  <ArrowDown className="h-5 w-5" strokeWidth={2.6} />
                </div>
              </div>

              {/* receive */}
              <div
                className="relative z-10 rounded-2xl border border-mint/10 bg-ink-deep/60 p-5"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-mint-pale/40">
                  You receive
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <AnimatedAmount
                    value={payout.net}
                    symbol={FIAT[fiat].symbol}
                  />
                  <select
                    value={fiat}
                    onChange={(e) => {
                      setFiat(e.target.value);
                      setPhase("idle");
                    }}
                    className="shrink-0 cursor-pointer rounded-full border border-mint/15 bg-ink-700 px-4 py-2 text-sm font-bold text-mint-pale outline-none"
                  >
                    {Object.keys(FIAT).map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="mt-1 block text-xs text-mint-pale/40">
                  Gross {FIAT[fiat].symbol}
                  {fmt(payout.gross)} · spread −{FIAT[fiat].symbol}
                  {fmt(payout.gross - payout.net)}
                </span>
              </div>

              <button
                onClick={findMatch}
                disabled={phase === "matching"}
                className="btn-primary relative z-10 mt-5 w-full cursor-pointer disabled:opacity-70"
                style={{ transform: "translateZ(28px)" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {phase === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Find my peer match
                    </motion.span>
                  )}
                  {phase === "matching" && (
                    <motion.span
                      key="matching"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Matching on Stellar…
                    </motion.span>
                  )}
                  {phase === "matched" && (
                    <motion.span
                      key="matched"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Match found — escrow ready
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {phase === "matched" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative z-10 overflow-hidden"
                  >
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-mint/20 bg-mint/[0.06] p-4 text-sm text-mint-pale/80">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
                      Peer <span className="font-bold text-mint">@stellarpay_94</span>{" "}
                      · 4.98★ · 2,310 trades — funds will release on confirmation.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="relative z-10 mt-4 text-center text-[0.7rem] text-mint-pale/35">
                Indicative preview · rates illustrative, not financial advice
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
