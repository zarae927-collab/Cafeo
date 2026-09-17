import React from "react";
import { NOIR_BUSINESS_INFO } from "../data/businessData";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";

export const SocialSection: React.FC = () => {
  return (
    <section
      id="social"
      className="relative bg-[#0c0c0e] py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
          <span>Connect With Noir</span>
        </div>

        <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF8F2] tracking-tight font-normal">
          Follow Our Journey
        </h3>

        <p className="text-sm text-[#F5F2EA]/65 max-w-md mx-auto font-light leading-relaxed">
          Stay connected for our daily kitchen specials, culinary highlights,
          and glimpses into the dining culture of Noir Café Attock.
        </p>

        {/* Real Social Cards Only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-4">
          <a
            href={NOIR_BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#c5a059]/40 transition-all duration-300 flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-purple-500/20 flex items-center justify-center text-[#FAF8F2] border border-white/10">
                <Instagram className="w-5 h-5 text-[#c5a059]" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#F5F2EA]/50 block">
                  Instagram
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#FAF8F2]">
                  {NOIR_BUSINESS_INFO.instagramHandle}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#F5F2EA]/40 group-hover:text-[#c5a059] transition-colors" />
          </a>

          <a
            href={NOIR_BUSINESS_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#c5a059]/40 transition-all duration-300 flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-[#FAF8F2] border border-white/10">
                <Facebook className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#F5F2EA]/50 block">
                  Facebook
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#FAF8F2]">
                  Noir Café
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#F5F2EA]/40 group-hover:text-[#c5a059] transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};
