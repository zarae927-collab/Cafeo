import React, { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { RestaurantIntro } from "./components/RestaurantIntro";
import { ExperienceNoir } from "./components/ExperienceNoir";
import { AtmosphereGallery } from "./components/AtmosphereGallery";
import { CategoryNav } from "./components/CategoryNav";
import { DualMenuSection } from "./components/DualMenuSection";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { DeliverySection } from "./components/DeliverySection";
import { LocationSection } from "./components/LocationSection";
import { SocialSection } from "./components/SocialSection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { MENU_CATEGORIES, MENU_ITEMS } from "./data/menuData";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_CATEGORIES[0].id);

  // Scroll spy to update active category tab while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = MENU_CATEGORIES.length - 1; i >= 0; i--) {
        const cat = MENU_CATEGORIES[i];
        const el = document.getElementById(`menu-category-${cat.id}`);
        if (el && el.offsetTop <= scrollPos) {
          setActiveCategory(cat.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`menu-category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0c0c0e] text-[#F5F2EA] flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-[#FAF8F2]">
        {/* 1. Minimal Navigation */}
        <Navbar />

        <main className="flex-grow">
          {/* 2. Full-Screen Original Hero Video */}
          <Hero />

          {/* 3. Restaurant Introduction / Identity */}
          <RestaurantIntro />

          {/* 4. Experience Noir Authentic Walkthrough Video */}
          <ExperienceNoir />

          {/* 5. Authentic Photo Gallery showcasing original interior and food photography */}
          <AtmosphereGallery />

          {/* 6. Interactive Menu Section with Sticky Category Navigation */}
          <div id="menu" className="relative bg-[#0c0c0e]">
            {/* Sticky Category Tabs Bar */}
            <CategoryNav
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* Render Each Approved Category in Exact Order */}
            <div className="space-y-0">
              {MENU_CATEGORIES.map((category) => {
                const categoryItems = MENU_ITEMS.filter(
                  (item) => item.category === category.id
                );
                return (
                  <DualMenuSection
                    key={category.id}
                    category={category}
                    items={categoryItems}
                  />
                );
              })}
            </div>
          </div>

          {/* 9. Delivery Information */}
          <DeliverySection />

          {/* 10. Location Section with Real Google Maps */}
          <LocationSection />

          {/* 11. Social Links (Real Instagram & Facebook only) */}
          <SocialSection />

          {/* 12. Final Restrained CTA */}
          <FinalCTA />
        </main>

        {/* 13. Minimal Luxury Footer */}
        <Footer />

        {/* 7 & 8. Cart Drawer & Checkout Flow */}
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
