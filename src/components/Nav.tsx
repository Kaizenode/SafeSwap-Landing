import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./Logo";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Why SafeSwap", href: "#features" },
  { label: "Try a swap", href: "#swap" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-mint/10 bg-ink-deep/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between">
          <a href="#top" className="shrink-0">
            <Wordmark />
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="link-nav">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#" className="link-nav">
              Log in
            </a>
            <a href="#swap" className="btn-primary !px-6 !py-2.5">
              Launch app
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-mint/15 text-mint-pale lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-mint/10 bg-ink-deep/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-lg font-medium text-mint-pale/80 transition-colors hover:bg-mint/5 hover:text-mint-pale"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#swap"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3"
              >
                Launch app
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
