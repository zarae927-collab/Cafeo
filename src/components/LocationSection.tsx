import React from "react";
import { NOIR_BUSINESS_INFO } from "../data/businessData";
import { MapPin, Navigation, ExternalLink, Clock, Phone } from "lucide-react";

export const LocationSection: React.FC = () => {
  return (
    <section
      id="location"
      className="relative bg-[#0c0c0e] py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              <span>Find Our Restaurant</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#FAF8F2] tracking-tight font-normal">
              Location & Hours
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F2EA]/60 max-w-md font-light leading-relaxed">
            Conveniently situated at Teen Meela Chowk in Attock, welcoming guests
            daily for afternoon dining, family dinners, and late-night cravings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 rounded-xl bg-white/[0.02] border border-white/[0.08] p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block mb-1">
                  Physical Address
                </span>
                <div className="flex items-start space-x-3 text-[#FAF8F2]">
                  <MapPin className="w-5 h-5 text-[#c5a059] flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base leading-relaxed font-light">
                    {NOIR_BUSINESS_INFO.fullAddress}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block mb-1">
                  Operating Hours
                </span>
                <div className="flex items-center space-x-3 text-[#FAF8F2]">
                  <Clock className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
                  <p className="text-sm font-light">
                    Every Day: {NOIR_BUSINESS_INFO.hours}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block mb-1">
                  Direct Line
                </span>
                <div className="flex items-center space-x-3 text-[#FAF8F2]">
                  <Phone className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
                  <a
                    href={`tel:${NOIR_BUSINESS_INFO.phone}`}
                    className="text-sm font-light hover:text-[#c5a059] transition-colors"
                  >
                    {NOIR_BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/[0.08]">
              <a
                href={NOIR_BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-lg bg-[#FAF8F2] hover:bg-white text-[#0c0c0e] text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href={NOIR_BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#FAF8F2] border border-white/10 text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>View Location</span>
              </a>
            </div>
          </div>

          {/* Right Map Preview Container */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/[0.08] bg-[#141418] relative min-h-[320px] sm:min-h-[380px]">
            <iframe
              title="Noir Cafe Attock Google Maps Location"
              src="https://maps.google.com/maps?q=Noir%20Cafe%20Teen%20Meela%20Chowk%20Attock%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[320px] sm:min-h-[380px] border-0 filter invert-[0.9] hue-rotate-180 contrast-125"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
