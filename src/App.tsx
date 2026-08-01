import { Topbar } from "./components/Topbar";
import { Hero } from "./components/Hero";
import { ValuePanels } from "./components/ValuePanels";
import { Destinations } from "./components/Destinations";
import { Story } from "./components/Story";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";
import { CtaBar } from "./components/CtaBar";

export default function App() {
  return (
    <div className="pb-cta-bar md:pb-0">
      <Topbar />
      <main id="top">
        <Hero />
        <ValuePanels />
        <Destinations />
        <Story />
        <Waitlist />
      </main>
      <Footer />
      <CtaBar />
    </div>
  );
}
