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
import DocumentLanguage from "@/components/DocumentLanguage";
import LibraryTeaser from "@/components/LibraryTeaser";
import { getActiveCoursesFromContent } from "@/lib/course-content";
import { getSelectedGalleryWorksFromContent } from "@/lib/work-content";
import type { Locale } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function PublicHome({ locale = "es" }: { locale?: Locale }) {
  const galleryWorks = await getSelectedGalleryWorksFromContent();
  const activeCourses = await getActiveCoursesFromContent();

  return (
    <>
      <DocumentLanguage locale={locale} />
      <Header locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <AuthorityStrip locale={locale} />
        <PathwaysSection locale={locale} />
        <TrainingSection courses={activeCourses} locale={locale} />
        <CommissionsSection locale={locale} />
        <GalleryGrid works={galleryWorks} locale={locale} />
        <TextBlock locale={locale} />
        <LibraryTeaser locale={locale} />
        <WaitlistSection locale={locale} />
        <AboutSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

export default async function Home() {
  return <PublicHome locale="es" />;
}
