import { ShieldMark } from "./Logo";

const words = [
  "Peer to peer",
  "Non-custodial",
  "Stellar-secured",
  "Zero hidden fees",
  "Transparent",
  "Settled in seconds",
  "Trust by design",
];

export default function Marquee() {
  return (
    <section className="relative border-y border-mint/10 bg-ink-deep/40 py-6">
      <div className="flex select-none overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap text-2xl font-bold tracking-tight text-mint-pale/30">
                {w}
              </span>
              <ShieldMark className="h-5 w-5 opacity-40" />
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-10 pr-10"
        >
          {[...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap text-2xl font-bold tracking-tight text-mint-pale/30">
                {w}
              </span>
              <ShieldMark className="h-5 w-5 opacity-40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
