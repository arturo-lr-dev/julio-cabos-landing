import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AuthorityStrip from "@/components/AuthorityStrip";
import PathwaysSection from "@/components/PathwaysSection";
import TextBlock from "@/components/TextBlock";
import GalleryGrid from "@/components/GalleryGrid";
import TrainingSection from "@/components/TrainingSection";
import CommissionsSection from "@/components/CommissionsSection";
import WaitlistSection from "@/components/WaitlistSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getActiveCoursesFromContent } from "@/lib/course-content";
import { getSelectedGalleryWorksFromContent } from "@/lib/work-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const galleryWorks = await getSelectedGalleryWorksFromContent();
  const activeCourses = await getActiveCoursesFromContent();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AuthorityStrip />
        <PathwaysSection />
        <TrainingSection courses={activeCourses} />
        <CommissionsSection />
        <GalleryGrid works={galleryWorks} />
        <TextBlock />
        <WaitlistSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
