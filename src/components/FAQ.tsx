import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What exactly is SafeSwap?",
    a: "SafeSwap is a decentralized peer-to-peer marketplace where you swap cryptocurrency for fiat money. Trades are matched between real people and secured by non-custodial escrow contracts on the Stellar blockchain.",
  },
  {
    q: "Does SafeSwap ever hold my funds?",
    a: "No. Your crypto sits in an on-chain escrow contract that only you and the protocol logic can act on. SafeSwap has no withdrawal keys and cannot move your assets.",
  },
  {
    q: "How fast do I receive fiat?",
    a: "Once your counterparty's fiat payment is confirmed, the escrow releases automatically. On-chain settlement on Stellar completes in roughly five seconds.",
  },
  {
    q: "Which cryptocurrencies and currencies are supported?",
    a: "SafeSwap supports major assets including BTC, ETH, XLM and USDC, with fiat payouts in USD, EUR, GBP, NGN and more — expanding continuously across 180+ countries.",
  },
  {
    q: "What happens if a trade is disputed?",
    a: "Time-locked arbitration kicks in. The escrow stays frozen until evidence is reviewed, protecting the honest party. Reputation scores discourage bad actors before disputes ever happen.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal variant="left">
          <span className="eyebrow">005 / Questions</span>
          <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.02] tracking-tightest text-mint-pale">
            Everything you
            <br />
            <span className="text-grad">want to ask.</span>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mint-pale/55">
            Still curious? Reach the team any time — we answer in plain language,
            not legalese.
          </p>
        </Reveal>

        <div className="divide-y divide-mint/10 border-y border-mint/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`text-lg font-bold transition-colors ${
                      isOpen ? "text-mint" : "text-mint-pale group-hover:text-mint-pale"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mint/20 text-mint transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-mint text-ink" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.6} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[0.95rem] leading-relaxed text-mint-pale/55">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
