import React from "react";
import { NOIR_BUSINESS_INFO } from "../data/businessData";
import { Bike, MessageCircle, Phone, Clock } from "lucide-react";

export const DeliverySection: React.FC = () => {
  return (
    <section
      id="delivery"
      className="relative bg-[#0e0e11] py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle background accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
                <Bike className="w-4 h-4" />
                <span>Attock City Delivery</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF8F2] tracking-tight font-normal">
                Home Delivery Available
              </h3>
              <p className="text-sm text-[#F5F2EA]/70 leading-relaxed font-light max-w-lg">
                Freshly prepared restaurant-grade steaks, gourmet burgers, wood-fired
                pizzas, and authentic wok specialties delivered hot straight to your
                doorstep anywhere in Attock.
              </p>
              <div className="flex items-center space-x-2 text-xs text-[#F5F2EA]/60 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Operating hours: {NOIR_BUSINESS_INFO.hours}</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={NOIR_BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-all duration-200 shadow-lg text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {NOIR_BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`tel:${NOIR_BUSINESS_INFO.phone}`}
                className="flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#FAF8F2] border border-white/10 font-medium text-xs uppercase tracking-wider transition-all duration-200 text-center"
              >
                <Phone className="w-4 h-4 text-[#c5a059]" />
                <span>Call: {NOIR_BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
