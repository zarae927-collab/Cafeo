import React from "react";
import { NOIR_BUSINESS_INFO } from "../data/businessData";

export const Footer: React.FC = () => {
  return (
    <footer id="noir-footer" className="bg-[#080809] text-[#F5F2EA]/70 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-editorial text-2xl tracking-[0.2em] text-[#FAF8F2] font-semibold block">
              NOIR CAFE
            </span>
            <p className="text-xs text-[#F5F2EA]/50 tracking-wider uppercase font-medium">
              Attock, Pakistan
            </p>
            <p className="text-xs text-[#F5F2EA]/60 font-light max-w-sm pt-2 leading-relaxed">
              A premium modern restaurant combining prime cuts, Italian classics,
              handcrafted burgers and artisanal beverages in an intimate atmosphere.
            </p>
          </div>

          {/* Quick Info & Hours */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block">
              Operating Hours & Service
            </span>
            <p className="text-xs text-[#FAF8F2] font-light">
              Daily: {NOIR_BUSINESS_INFO.hours}
            </p>
            <p className="text-xs text-[#F5F2EA]/60 font-light">
              Dine-In • Takeaway • Home Delivery throughout Attock
            </p>
            <p className="text-xs text-[#F5F2EA]/50 font-light pt-1">
              {NOIR_BUSINESS_INFO.fullAddress}
            </p>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block">
              Contact & Social
            </span>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[#F5F2EA]/40 mr-2">Phone:</span>
                <a
                  href={`tel:${NOIR_BUSINESS_INFO.phone}`}
                  className="text-[#FAF8F2] hover:text-[#c5a059] transition-colors"
                >
                  {NOIR_BUSINESS_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-[#F5F2EA]/40 mr-2">WhatsApp:</span>
                <a
                  href={NOIR_BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF8F2] hover:text-[#c5a059] transition-colors"
                >
                  0323 5646874
                </a>
              </div>
              <div>
                <span className="text-[#F5F2EA]/40 mr-2">Instagram:</span>
                <a
                  href={NOIR_BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF8F2] hover:text-[#c5a059] transition-colors"
                >
                  {NOIR_BUSINESS_INFO.instagramHandle}
                </a>
              </div>
              <div>
                <span className="text-[#F5F2EA]/40 mr-2">Facebook:</span>
                <a
                  href={NOIR_BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF8F2] hover:text-[#c5a059] transition-colors"
                >
                  Noir Café
                </a>
              </div>
              <div>
                <span className="text-[#F5F2EA]/40 mr-2">Location:</span>
                <a
                  href={NOIR_BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF8F2] hover:text-[#c5a059] transition-colors"
                >
                  Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Line */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F5F2EA]/40">
          <span>&copy; {new Date().getFullYear()} NOIR CAFÉ ATTOCK. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 font-light">
            Teen Meela Chowk, Attock, Pakistan
          </span>
        </div>
      </div>
    </footer>
  );
};
