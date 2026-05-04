import CTA from "@/components/web/cta";
import FeaturedPosts from "@/components/web/featured-posts";
import Features from "@/components/web/features";
import Hero from "@/components/web/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedPosts />
      <Features />
      <CTA />
    </main>
  );
}
