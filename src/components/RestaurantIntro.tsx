import React from "react";
import { NOIR_BUSINESS_INFO } from "../data/businessData";
import { Clock, MapPin, Sparkles } from "lucide-react";

export const RestaurantIntro: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-[#0c0c0e] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/[0.05]"
    >
      <div className="max-w-5xl mx-auto text-center space-y-10">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
          <span className="w-6 h-[1px] bg-[#c5a059]/40" />
          <span>Attock, Pakistan</span>
          <span className="w-6 h-[1px] bg-[#c5a059]/40" />
        </div>

        {/* Editorial Heading */}
        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#FAF8F2] tracking-tight leading-[1.15] max-w-3xl mx-auto font-normal">
          A Culinary Sanctuary of Modern Taste & Craft
        </h2>

        {/* Narrative Paragraph */}
        <p className="text-base sm:text-lg text-[#F5F2EA]/70 leading-relaxed max-w-2xl mx-auto font-light">
          Welcome to <span className="text-[#FAF8F2] font-medium">NOIR CAFÉ</span>.
          Born from a passion for culinary excellence, we bring premium steaks,
          artisanal Italian pastas, stone-baked pizzas, signature burgers, and
          handcrafted mocktails into a refined, cinematic dining atmosphere.
        </p>

        {/* Architectural Highlights / Key Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 max-w-3xl mx-auto text-left">
          <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center space-x-2 text-[#c5a059] text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cuisine</span>
            </div>
            <p className="text-xs text-[#F5F2EA]/80 leading-relaxed">
              Steaks, Italian Pastas, Gourmet Burgers, Handcrafted Wok & Mocktails
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center space-x-2 text-[#c5a059] text-xs uppercase tracking-wider font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Service Hours</span>
            </div>
            <p className="text-xs text-[#F5F2EA]/80 leading-relaxed">
              {NOIR_BUSINESS_INFO.hours} • Daily Dining & Takeaway
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center space-x-2 text-[#c5a059] text-xs uppercase tracking-wider font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location</span>
            </div>
            <p className="text-xs text-[#F5F2EA]/80 leading-relaxed">
              Teen Meela Chowk, near Total Parco Fuel Station, Attock
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
