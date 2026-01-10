import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import MenuSection from '@/components/MenuSection';
import SuccessSection from '@/components/SuccessSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import KakaoFloatingButton from '@/components/KakaoFloatingButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MenuSection />
      <SuccessSection />
      <ContactSection />
      <Footer />
      <KakaoFloatingButton />
    </main>
  );
}
