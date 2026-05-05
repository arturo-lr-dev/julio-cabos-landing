import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TextBlock from "@/components/TextBlock";
import GalleryGrid from "@/components/GalleryGrid";
import TrainingSection from "@/components/TrainingSection";
import WaitlistSection from "@/components/WaitlistSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TextBlock />
        <GalleryGrid />
        <TrainingSection />
        <WaitlistSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
