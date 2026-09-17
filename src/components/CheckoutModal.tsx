import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { NOIR_BUSINESS_INFO } from "../data/businessData";
import { X, Send, PhoneCall } from "lucide-react";

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<"Delivery" | "Takeaway" | "Dine-In">("Delivery");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isCheckoutOpen) return null;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorMsg("Please provide your name.");
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg("Please provide your contact phone number.");
      return;
    }
    if (orderType === "Delivery" && !address.trim()) {
      setErrorMsg("Please provide your delivery address in Attock.");
      return;
    }

    // Generate verified structured order message according to Part 23
    const itemsText = cart
      .map((item) => {
        const variantText = item.selectedVariant ? ` (${item.selectedVariant.label})` : "";
        const lineTotal = item.unitPrice * item.quantity;
        return `• ${item.quantity}x ${item.name}${variantText} — Rs ${lineTotal.toLocaleString()}`;
      })
      .join("\n");

    const message = `*NOIR CAFE ORDER*

*Customer Name:* ${customerName.trim()}
*Phone:* ${customerPhone.trim()}
*Order Type:* ${orderType}
${orderType === "Delivery" ? `*Delivery Address:* ${address.trim()}\n` : ""}
*ORDERED ITEMS:*
${itemsText}

*SUBTOTAL:* Rs ${subtotal.toLocaleString()}
${notes.trim() ? `\n*Customer Note:* ${notes.trim()}\n` : ""}
_Order submitted via Noir Café Digital Menu_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923235646874?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Optional: Clear cart and close modal
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        id="checkout-modal-card"
        className="w-full max-w-lg bg-[#0e0e11] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
              Order Handoff
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#FAF8F2] font-normal">
              Confirm & Send Order
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout modal"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#F5F2EA]/60 hover:text-[#FAF8F2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Recap */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 space-y-2">
          <div className="text-xs uppercase tracking-wider text-[#F5F2EA]/50 font-medium">
            Order Summary ({cart.length} items)
          </div>
          <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs text-[#F5F2EA]/80 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="truncate pr-2">
                  {item.quantity}x {item.name}
                  {item.selectedVariant ? ` (${item.selectedVariant.label})` : ""}
                </span>
                <span className="font-mono text-[#FAF8F2]">
                  Rs {(item.unitPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/[0.08] flex justify-between text-sm font-medium">
            <span className="text-[#F5F2EA]/80">Total Subtotal</span>
            <span className="font-editorial text-lg text-[#FAF8F2]">
              Rs {subtotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSendWhatsAppOrder} className="space-y-4">
          {errorMsg && (
            <div className="text-xs text-rose-400 bg-rose-950/30 border border-rose-900/50 p-2.5 rounded">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F2EA]/70 mb-1.5 font-medium">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="e.g. Tariq Ahmed"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-[#FAF8F2] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F2EA]/70 mb-1.5 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="03XX XXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-[#FAF8F2] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F5F2EA]/70 mb-1.5 font-medium">
              Order Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Delivery", "Takeaway", "Dine-In"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-2 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                    orderType === type
                      ? "bg-[#FAF8F2] text-[#0c0c0e] border-[#FAF8F2]"
                      : "bg-white/[0.02] border-white/10 text-[#F5F2EA]/70 hover:border-white/20"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {orderType === "Delivery" && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F5F2EA]/70 mb-1.5 font-medium">
                Delivery Address in Attock *
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="House / Street / Sector, Attock"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-[#FAF8F2] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F5F2EA]/70 mb-1.5 font-medium">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Mild spice, extra napkins, table number"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-[#FAF8F2] placeholder-[#F5F2EA]/30 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-widest transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Send Order to WhatsApp ({NOIR_BUSINESS_INFO.phone})</span>
            </button>
          </div>
        </form>

        {/* Alternative Direct Call */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#F5F2EA]/60">
          <span>Prefer ordering by phone?</span>
          <a
            href={`tel:${NOIR_BUSINESS_INFO.phone}`}
            className="flex items-center space-x-1.5 text-[#c5a059] hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call {NOIR_BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
