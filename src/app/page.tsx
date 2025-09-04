import Header from "@/components/HomePageComponents.tsx/Header";
import Hero from "@/components/HomePageComponents.tsx/Hero";
import About from "@/components/HomePageComponents.tsx/About";
import Plans from "@/components/HomePageComponents.tsx/Plans";
import WhyChooseUs from "@/components/HomePageComponents.tsx/WhyChooseUs";
import Footer from "@/components/HomePageComponents.tsx/Footer";
import Blog from "@/components/HomePageComponents.tsx/Blog";
import NewsLatter from "@/components/HomePageComponents.tsx/NewsLatter";
import Faq from "@/components/HomePageComponents.tsx/Faq";
import Generation from "@/components/HomePageComponents.tsx/Generation";
import Profit from "@/components/HomePageComponents.tsx/Profit";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Plans />
      <WhyChooseUs />
      <Profit />
      <Generation />
      <Faq />
      <NewsLatter />
      <Blog />
      <Footer />
    </div>
  );
}
