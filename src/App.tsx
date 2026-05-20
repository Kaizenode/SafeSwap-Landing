import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ScrollFlow from "./components/ScrollFlow";
import Features from "./components/Features";
import SwapDemo from "./components/SwapDemo";
import Stats from "./components/Stats";
import Security from "./components/Security";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <ScrollFlow />
        <Features />
        <SwapDemo />
        <Stats />
        <Security />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
