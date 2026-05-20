import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ShieldMark } from "./Logo";

export default function CTA() {
  return (
    <section className="relative px-6 py-20">
      <Reveal variant="scale">
        <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[36px] border border-mint/15 bg-gradient-to-br from-green/25 via-ink-700/60 to-ink-deep px-8 py-20 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 -z-0">
            <ShieldMark className="absolute -right-20 -top-24 h-96 w-96 opacity-[0.07]" />
            <ShieldMark className="absolute -bottom-28 -left-16 h-80 w-80 opacity-[0.05]" />
            <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,214,172,0.2),transparent_65%)] blur-3xl" />
          </div>
          <div className="relative">
            <span className="eyebrow justify-center">
              Your crypto, on your terms
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-black leading-[0.98] tracking-tightest text-mint-pale">
              Turn crypto into cash —
              <span className="text-grad"> safely.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mint-pale/60">
              Join hundreds of thousands of traders who swap with confidence on
              the most transparent P2P rails in Web3.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#swap" className="btn-primary">
                Launch SafeSwap
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </a>
              <a href="#how" className="btn-ghost">
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
