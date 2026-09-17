import React from "react";
import { NOIR_BUSINESS_INFO } from "../data/businessData";
import { useCart } from "../context/CartContext";
import { ShoppingBag, MessageCircle, Phone, Navigation } from "lucide-react";

export const FinalCTA: React.FC = () => {
  const { setIsCartOpen } = useCart();

  const handleOrderNow = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#09090b] py-24 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
          <span>Noir Café Attock</span>
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#FAF8F2] tracking-tight font-normal">
          An Invitation to Taste
        </h2>

        <p className="text-sm sm:text-base text-[#F5F2EA]/70 max-w-xl mx-auto font-light leading-relaxed">
          Whether you are joining us for an intimate evening in our dining room,
          arranging a family dinner, or ordering directly to your home.
        </p>

        {/* Restrained Premium Functional Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <button
            onClick={handleOrderNow}
            className="px-7 py-3.5 rounded-lg bg-[#FAF8F2] hover:bg-white text-[#0c0c0e] font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center space-x-2 cursor-pointer active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Now</span>
          </button>

          <a
            href={NOIR_BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-xs uppercase tracking-widest transition-all duration-200 flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${NOIR_BUSINESS_INFO.phone}`}
            className="px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#FAF8F2] border border-white/10 font-medium text-xs uppercase tracking-widest transition-all duration-200 flex items-center space-x-2"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Call</span>
          </a>

          <a
            href={NOIR_BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#FAF8F2] border border-white/10 font-medium text-xs uppercase tracking-widest transition-all duration-200 flex items-center space-x-2"
          >
            <Navigation className="w-4 h-4 text-[#c5a059]" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </section>
  );
};
