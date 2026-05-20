import { ShieldCheck, Eye, Sparkles, Handshake, MousePointerClick } from "lucide-react";
import { Reveal } from "./Reveal";
import { ShieldMark } from "./Logo";

export default function Features() {
  return (
    <section id="features" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(1,167,143,0.14),transparent_70%)] blur-3xl" />
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">002 / Why SafeSwap</span>
          <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.02] tracking-tightest text-mint-pale">
            Built on the values that{" "}
            <span className="text-grad">make trading feel safe.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-6 lg:grid-rows-2">
          {/* Safety — large feature */}
          <Reveal
            variant="left"
            className="md:col-span-4 lg:row-span-2"
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-mint/12 bg-gradient-to-br from-green/15 via-ink-deep/60 to-ink-deep/60 p-9">
              <div className="absolute -bottom-20 -right-16 opacity-[0.08]">
                <ShieldMark className="h-80 w-80" />
              </div>
              <div className="relative">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-mint/15 p-3 text-mint">
                  <ShieldCheck className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-7 text-2xl font-bold text-mint-pale">
                  Security at the core
                </h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mint-pale/60">
                  Every transaction runs through a non-custodial escrow contract
                  on Stellar. Your assets are safeguarded the entire way — no
                  trust required, only verifiable code.
                </p>
              </div>
              <div className="relative mt-10 flex flex-wrap gap-2.5">
                {["Non-custodial escrow", "On-chain proof", "Dispute resolution"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-mint/15 bg-ink-deep/60 px-3.5 py-1.5 text-xs font-semibold text-mint-pale/70"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          {/* Transparency */}
          <Reveal variant="right" delay={0.08} className="md:col-span-2">
            <div className="group flex h-full flex-col rounded-3xl border border-mint/10 bg-ink-deep/50 p-7 transition-colors hover:border-mint/30">
              <Eye className="h-6 w-6 text-mint" strokeWidth={2} />
              <h3 className="mt-6 text-lg font-bold text-mint-pale">
                Radical transparency
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-mint-pale/55">
                Rates, fees, and settlement are public on-chain. What you see is
                exactly what you get.
              </p>
            </div>
          </Reveal>

          {/* Innovation */}
          <Reveal variant="right" delay={0.16} className="md:col-span-2">
            <div className="group flex h-full flex-col rounded-3xl border border-mint/10 bg-ink-deep/50 p-7 transition-colors hover:border-mint/30">
              <Sparkles className="h-6 w-6 text-mint" strokeWidth={2} />
              <h3 className="mt-6 text-lg font-bold text-mint-pale">
                Stellar-fast
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-mint-pale/55">
                Sub-cent network fees and ~5 second finality. Modern rails,
                future-ready.
              </p>
            </div>
          </Reveal>

          {/* Trust + Simplicity row */}
          <Reveal variant="up" delay={0.1} className="md:col-span-3">
            <div className="flex h-full items-start gap-5 rounded-3xl border border-mint/10 bg-ink-deep/50 p-7 transition-colors hover:border-mint/30">
              <div className="shrink-0 rounded-2xl bg-mint/10 p-3 text-mint">
                <Handshake className="h-6 w-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-mint-pale">
                  Trust by design
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mint-pale/55">
                  Verified counterparties and reputation scoring create an
                  environment where you trade with confidence.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={0.18} className="md:col-span-3">
            <div className="flex h-full items-start gap-5 rounded-3xl border border-mint/10 bg-ink-deep/50 p-7 transition-colors hover:border-mint/30">
              <div className="shrink-0 rounded-2xl bg-mint/10 p-3 text-mint">
                <MousePointerClick className="h-6 w-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-mint-pale">
                  Refreshingly simple
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mint-pale/55">
                  Decentralized shouldn't mean complicated. Three taps and your
                  crypto becomes spendable cash.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
