import { Twitter, Github, MessageCircle, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Logo";

const cols = [
  {
    title: "Product",
    links: ["How it works", "Try a swap", "Security", "Supported assets"],
  },
  {
    title: "Company",
    links: ["About", "Brand", "Careers", "Press kit"],
  },
  {
    title: "Resources",
    links: ["Docs", "Stellar explorer", "Status", "Support"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-mint/10 bg-ink-deep">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mint-pale/45">
              A safe, decentralized marketplace for fast, secure and transparent
              asset swaps — built on the Stellar blockchain.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-mint/15 text-mint-pale/60 transition-all hover:border-mint/50 hover:text-mint"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-mint-pale/40">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-mint-pale/60 transition-colors hover:text-mint-pale"
                    >
                      {l}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-mint/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mint-pale/35">
            © {new Date().getFullYear()} SafeSwap. Decentralized P2P for Stellar
            users.
          </p>
          <div className="flex gap-6 text-xs text-mint-pale/35">
            <a href="#" className="transition-colors hover:text-mint-pale/70">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-mint-pale/70">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-mint-pale/70">
              Risk disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
