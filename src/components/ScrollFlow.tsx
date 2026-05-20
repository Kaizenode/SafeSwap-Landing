import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import {
  Wallet,
  Lock,
  Network,
  Banknote,
  CheckCircle2,
  ArrowDownRight,
} from "lucide-react";
import { ShieldMark } from "./Logo";
import { Reveal } from "./Reveal";
import { useIsMobile } from "../lib/motion";

type Stage = {
  n: string;
  title: string;
  body: string;
  icon: typeof Lock;
  tx: string;
};

const STAGES: Stage[] = [
  {
    n: "01",
    title: "Buyer locks crypto in escrow",
    body: "Your crypto leaves your wallet only to enter a non-custodial Stellar smart-contract. Nobody — not SafeSwap, not the counterparty — can move it until conditions are met.",
    icon: Lock,
    tx: "lock_3a91e8f4…",
  },
  {
    n: "02",
    title: "Stellar matches a verified peer",
    body: "The network finds the best peer offering your fiat payout. Their reputation, escrow history and price are all visible on-chain before you ever shake hands.",
    icon: Network,
    tx: "match_82d7c1ab…",
  },
  {
    n: "03",
    title: "Peer confirms fiat payment",
    body: "Your counterparty sends fiat through their bank or local rail. SafeSwap watches for proof — receipt hash, signed confirmation — and updates the escrow status.",
    icon: Banknote,
    tx: "fiat_ack_91be20ff…",
  },
  {
    n: "04",
    title: "Escrow releases — settled on-chain",
    body: "The smart-contract releases. Crypto moves to the buyer, fiat lands with the seller, and the entire trade becomes a permanent, auditable Stellar entry.",
    icon: CheckCircle2,
    tx: "release_55ac9def…",
  },
];

/* ---------- subcomponents ---------- */

function PeerCard({
  side,
  label,
  sublabel,
  active,
  reduced,
  isMobile,
}: {
  side: "left" | "right";
  label: string;
  sublabel: string;
  active: MotionValue<number>;
  reduced: boolean | null;
  isMobile: boolean;
}) {
  const glow = useTransform(active, [0, 1], [0.2, 1]);
  const scale = useTransform(active, [0, 1], [0.98, 1.02]);
  // Tilt inward on desktop only — looks weird in a vertical stack.
  const rotY = useTransform(active, [0, 1], [side === "left" ? 12 : -12, 0]);

  return (
    <motion.div
      style={{
        rotateY: reduced || isMobile ? 0 : rotY,
        scale: reduced ? 1 : scale,
        transformStyle: "preserve-3d",
      }}
      className="glass relative w-full max-w-[260px] rounded-2xl p-3.5 sm:rounded-3xl sm:p-5 md:w-[clamp(170px,22vw,260px)] will-change-transform"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-[radial-gradient(circle,rgba(95,214,172,0.35),transparent_70%)] blur-2xl"
      />
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-mint/15 text-mint sm:h-9 sm:w-9">
          <Wallet className="h-4 w-4" strokeWidth={2.4} />
        </div>
        <div>
          <div className="text-[0.62rem] font-bold uppercase tracking-wider text-mint-pale/45 sm:text-[0.7rem]">
            {sublabel}
          </div>
          <div className="text-sm font-bold text-mint-pale">{label}</div>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-mint/10 bg-ink-deep/60 p-2.5 sm:mt-4 sm:rounded-xl sm:p-3">
        <div className="text-[0.6rem] font-mono uppercase tracking-wider text-mint-pale/35 sm:text-[0.65rem]">
          {side === "left" ? "G…SAFE7QX…BUY" : "G…SAFE2KP…SLR"}
        </div>
        <div className="mt-1 flex items-baseline justify-between sm:mt-1.5">
          <span className="text-base font-bold text-mint-pale sm:text-lg">
            {side === "left" ? "0.50 BTC" : "$32,140.00"}
          </span>
          <span className="hidden text-[0.65rem] font-semibold text-mint-pale/40 sm:inline">
            {side === "left" ? "≈ $32,140" : "≈ 0.50 BTC"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CenterShield({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const rotY = useTransform(progress, [0, 1], [0, reduced ? 0 : 360]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.9, 1.1, 0.95]);
  const ringScale = useTransform(progress, [0, 1], [1, 1.3]);
  const ringOpacity = useTransform(progress, [0, 0.5, 1], [0.4, 0.8, 0.3]);
  const nodeRotate = useTransform(progress, [0, 1], [0, reduced ? 0 : 720]);

  return (
    <div className="perspective-1400 relative h-[clamp(140px,28vw,300px)] w-[clamp(140px,28vw,300px)]">
      <motion.div
        aria-hidden
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(1,167,143,0.45),transparent_60%)] blur-3xl"
      />
      <div className="absolute inset-2 animate-spin-slow rounded-full border border-dashed border-mint/15" />
      <div className="absolute inset-8 animate-spin-slow rounded-full border border-mint/10 [animation-direction:reverse] sm:inset-10" />
      <motion.div
        style={{
          rotateY: rotY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <ShieldMark className="h-[68%] w-[68%] drop-shadow-[0_30px_70px_rgba(1,167,143,0.55)]" />
      </motion.div>
      <motion.div style={{ rotate: nodeRotate }} className="absolute inset-0">
        <span className="absolute left-1/2 top-0 -ml-1.5 h-2.5 w-2.5 rounded-full bg-mint shadow-[0_0_18px_rgba(95,214,172,0.9)] sm:h-3 sm:w-3" />
      </motion.div>
    </div>
  );
}

function HorizontalPacket({
  leftPct,
  y,
  progress,
  reduced,
}: {
  leftPct: MotionValue<number>;
  y: MotionValue<number>;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const labelOpacityA = useTransform(progress, [0, 0.25, 0.35], [1, 1, 0]);
  const labelOpacityB = useTransform(
    progress,
    [0.3, 0.45, 0.65, 0.75],
    [0, 1, 1, 0],
  );
  const labelOpacityC = useTransform(progress, [0.7, 0.85, 1], [0, 1, 1]);
  const hueShift = useTransform(progress, [0, 1], [0, reduced ? 0 : 40]);
  const left = useMotionTemplate`calc(${leftPct}% - 24px)`;
  const filter = useMotionTemplate`drop-shadow(0 0 18px rgba(95,214,172,0.7)) hue-rotate(${hueShift}deg)`;

  return (
    <motion.div
      style={{ left, y }}
      className="absolute top-1/2 -mt-6 will-change-transform"
    >
      <motion.div style={{ filter }} className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border border-mint/40 bg-gradient-to-br from-mint to-green shadow-[0_10px_40px_rgba(1,167,143,0.55)]" />
        <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-mint-soft/80 to-mint/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            style={{ opacity: labelOpacityA }}
            className="absolute text-[0.6rem] font-black tracking-tight text-ink"
          >
            BTC
          </motion.span>
          <motion.span
            style={{ opacity: labelOpacityB }}
            className="absolute text-[0.6rem] font-black tracking-tight text-ink"
          >
            ESC
          </motion.span>
          <motion.span
            style={{ opacity: labelOpacityC }}
            className="absolute text-[0.6rem] font-black tracking-tight text-ink"
          >
            USD
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VerticalPacket({
  topPct,
  x,
  progress,
  reduced,
}: {
  topPct: MotionValue<number>;
  x: MotionValue<number>;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const labelOpacityA = useTransform(progress, [0, 0.25, 0.35], [1, 1, 0]);
  const labelOpacityB = useTransform(
    progress,
    [0.3, 0.45, 0.65, 0.75],
    [0, 1, 1, 0],
  );
  const labelOpacityC = useTransform(progress, [0.7, 0.85, 1], [0, 1, 1]);
  const hueShift = useTransform(progress, [0, 1], [0, reduced ? 0 : 40]);
  const top = useMotionTemplate`calc(${topPct}% - 22px)`;
  const filter = useMotionTemplate`drop-shadow(0 0 16px rgba(95,214,172,0.7)) hue-rotate(${hueShift}deg)`;

  return (
    <motion.div
      style={{ top, x }}
      className="absolute left-1/2 -ml-5 will-change-transform"
    >
      <motion.div style={{ filter }} className="relative h-11 w-11">
        <div className="absolute inset-0 rounded-full border border-mint/40 bg-gradient-to-br from-mint to-green shadow-[0_10px_40px_rgba(1,167,143,0.55)]" />
        <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-mint-soft/80 to-mint/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            style={{ opacity: labelOpacityA }}
            className="absolute text-[0.58rem] font-black tracking-tight text-ink"
          >
            BTC
          </motion.span>
          <motion.span
            style={{ opacity: labelOpacityB }}
            className="absolute text-[0.58rem] font-black tracking-tight text-ink"
          >
            ESC
          </motion.span>
          <motion.span
            style={{ opacity: labelOpacityC }}
            className="absolute text-[0.58rem] font-black tracking-tight text-ink"
          >
            USD
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StageCard({
  index,
  stage,
  progress,
  reduced,
}: {
  index: number;
  stage: Stage;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const start = index / STAGES.length;
  const end = (index + 1) / STAGES.length;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    progress,
    [start - 0.06, start + 0.04, end - 0.04, end + 0.06],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start - 0.06, mid, end + 0.06],
    [reduced ? 0 : 24, 0, reduced ? 0 : -24],
  );

  const Icon = stage.icon;
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-0 will-change-transform"
    >
      <div className="mx-auto max-w-xl px-1 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-ink-deep/60 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-mint sm:text-[0.65rem]">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
          Stage {stage.n} of 04
        </div>
        <h3 className="mt-3 text-[clamp(1.25rem,3.4vw,2.6rem)] font-black leading-[1.1] tracking-tightest text-mint-pale sm:mt-4">
          {stage.title}
        </h3>
        <p className="mt-2.5 text-[0.85rem] leading-relaxed text-mint-pale/60 sm:mt-4 sm:text-base">
          {stage.body}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-mint/15 bg-ink-deep/70 px-3 py-1.5 font-mono text-[0.65rem] text-mint/80 sm:mt-5 sm:text-[0.7rem]">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
          stellar.tx/{stage.tx}
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalFlowLine({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const dashOffset = useTransform(progress, [0, 1], [0, reduced ? 0 : -200]);
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-1/2 -mt-px h-20 w-full -translate-y-1/2"
    >
      <defs>
        <linearGradient id="flowgrad-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#01a78f" stopOpacity="0" />
          <stop offset="20%" stopColor="#01a78f" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#5fd6ac" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#01a78f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#01a78f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 40 Q 200 10 400 40 T 800 40"
        fill="none"
        stroke="rgba(95,214,172,0.18)"
        strokeWidth="1.5"
      />
      <motion.path
        d="M 0 40 Q 200 10 400 40 T 800 40"
        fill="none"
        stroke="url(#flowgrad-h)"
        strokeWidth="2"
        strokeDasharray="14 18"
        style={{ strokeDashoffset: dashOffset }}
      />
    </svg>
  );
}

function VerticalFlowLine({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const dashOffset = useTransform(progress, [0, 1], [0, reduced ? 0 : -160]);
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 400"
      preserveAspectRatio="none"
      className="absolute inset-y-0 left-1/2 -ml-10 h-full w-20"
    >
      <defs>
        <linearGradient id="flowgrad-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#01a78f" stopOpacity="0" />
          <stop offset="20%" stopColor="#01a78f" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#5fd6ac" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#01a78f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#01a78f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 40 0 Q 10 100 40 200 T 40 400"
        fill="none"
        stroke="rgba(95,214,172,0.18)"
        strokeWidth="1.5"
      />
      <motion.path
        d="M 40 0 Q 10 100 40 200 T 40 400"
        fill="none"
        stroke="url(#flowgrad-v)"
        strokeWidth="2"
        strokeDasharray="12 16"
        style={{ strokeDashoffset: dashOffset }}
      />
    </svg>
  );
}

/* ---------- main ---------- */

export default function ScrollFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  // Horizontal packet — used on md+
  const packetLeftPct = useTransform(progress, [0, 1], [0, 100]);
  const packetArcY = useTransform(progress, [0, 0.5, 1], [0, -22, 0]);

  // Vertical packet — used on mobile
  const packetTopPct = useTransform(progress, [0, 1], [0, 100]);
  const packetArcX = useTransform(progress, [0, 0.5, 1], [0, 18, 0]);

  // Buyer / Seller activation lifecycles
  const buyerActive = useTransform(progress, [0, 0.15, 0.4, 1], [1, 1, 0.3, 0.2]);
  const sellerActive = useTransform(progress, [0, 0.6, 0.85, 1], [0.2, 0.3, 1, 1]);

  // Step indicator
  const stepFloat = useTransform(progress, (p) => Math.min(3, Math.floor(p * 4)));

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative h-[360vh] md:h-[420vh]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        {/* ambient backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(1,167,143,0.18),transparent_65%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(95,214,172,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(95,214,172,0.05) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%,#000 40%,transparent 80%)",
            }}
          />
        </div>

        <div className="container-x w-full">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow justify-center">
                <span className="h-px w-7 bg-mint" />
                002 / The flow of value
              </span>
              <h2 className="mt-4 text-[clamp(1.6rem,4.4vw,3.4rem)] font-black leading-[1.05] tracking-tightest text-mint-pale sm:mt-5">
                Watch your money move
                <br />
                <span className="text-grad">peer to peer.</span>
              </h2>
            </div>
          </Reveal>

          {/* stage area */}
          <div className="relative mt-6 h-[210px] sm:mt-12 sm:h-[200px] md:h-[180px]">
            {STAGES.map((stage, i) => (
              <StageCard
                key={stage.n}
                index={i}
                stage={stage}
                progress={progress}
                reduced={reduced}
              />
            ))}
          </div>

          {/* visual canvas */}
          {isMobile ? (
            /* MOBILE: vertical stack, packet rides top→bottom */
            <div className="perspective-2000 relative mx-auto mt-4 flex h-[360px] max-w-xs flex-col items-center justify-between">
              <PeerCard
                side="left"
                label="@you"
                sublabel="Buyer wallet"
                active={buyerActive}
                reduced={reduced}
                isMobile
              />
              <div className="relative flex flex-1 items-center justify-center self-stretch">
                <VerticalFlowLine progress={progress} reduced={reduced} />
                <CenterShield progress={progress} reduced={reduced} />
              </div>
              <PeerCard
                side="right"
                label="@stellarpay_94"
                sublabel="Seller wallet"
                active={sellerActive}
                reduced={reduced}
                isMobile
              />
              {/* vertical packet overlay covers the whole canvas */}
              <div className="pointer-events-none absolute inset-0">
                <VerticalPacket
                  topPct={packetTopPct}
                  x={packetArcX}
                  progress={progress}
                  reduced={reduced}
                />
              </div>
            </div>
          ) : (
            /* DESKTOP: horizontal track */
            <div className="perspective-2000 relative mt-2 flex items-center justify-between gap-4 sm:gap-8 lg:gap-16">
              <PeerCard
                side="left"
                label="@you"
                sublabel="Buyer wallet"
                active={buyerActive}
                reduced={reduced}
                isMobile={false}
              />
              <div className="relative flex flex-1 items-center justify-center">
                <HorizontalFlowLine progress={progress} reduced={reduced} />
                <CenterShield progress={progress} reduced={reduced} />
                <div className="pointer-events-none absolute inset-0">
                  <HorizontalPacket
                    leftPct={packetLeftPct}
                    y={packetArcY}
                    progress={progress}
                    reduced={reduced}
                  />
                </div>
              </div>
              <PeerCard
                side="right"
                label="@stellarpay_94"
                sublabel="Seller wallet"
                active={sellerActive}
                reduced={reduced}
                isMobile={false}
              />
            </div>
          )}

          {/* progress bar */}
          <div className="mx-auto mt-6 flex max-w-2xl items-center gap-2 sm:mt-10 sm:gap-3">
            {STAGES.map((s, i) => (
              <StepDot key={s.n} index={i} active={stepFloat} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-mint-pale/40 sm:mt-6 sm:text-[0.7rem] sm:tracking-[0.24em]">
            <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            Scroll to advance the trade
          </div>
        </div>
      </div>
    </section>
  );
}

function StepDot({
  index,
  active,
}: {
  index: number;
  active: MotionValue<number>;
}) {
  const isOn = useTransform(active, (v): number => (v >= index ? 1 : 0));
  const bg = useTransform(isOn, [0, 1], [
    "rgba(95,214,172,0.15)",
    "rgba(95,214,172,1)",
  ]);
  const w = useTransform(isOn, [0, 1], ["28px", "56px"]);
  return (
    <motion.span
      style={{ backgroundColor: bg, width: w }}
      className="block h-1.5 flex-1 rounded-full"
    />
  );
}
