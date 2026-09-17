import React from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="absolute inset-0 flex justify-end pointer-events-none">
        <div
          id="cart-drawer-panel"
          className="w-full max-w-md bg-[#0e0e11] border-l border-white/10 shadow-2xl h-full flex flex-col pointer-events-auto animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h3 className="font-editorial text-2xl text-[#FAF8F2] font-normal">
                Your Order
              </h3>
              <span className="text-xs text-[#F5F2EA]/50 font-mono">
                ({totalCount})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 rounded-full hover:bg-white/10 text-[#F5F2EA]/60 hover:text-[#FAF8F2] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#F5F2EA]/40">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-sm text-[#F5F2EA]/60 font-light">
                  Your order bag is currently empty
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs uppercase tracking-wider text-[#c5a059] hover:underline pt-2 cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-start space-x-3.5"
                >
                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded object-cover bg-[#18181c] border border-white/10 flex-shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-medium text-[#FAF8F2] truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#F5F2EA]/40 hover:text-rose-400 transition-colors cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <span className="inline-block mt-0.5 text-[10px] text-[#c5a059] font-mono uppercase tracking-wider">
                        Option: {item.selectedVariant.label}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity control */}
                      <div className="flex items-center rounded border border-white/10 bg-white/[0.02] px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-[#F5F2EA]/60 hover:text-[#FAF8F2] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-[#FAF8F2]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[#F5F2EA]/60 hover:text-[#FAF8F2] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-xs font-mono text-[#F5F2EA] font-medium">
                        Rs {(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/[0.08] bg-[#0c0c0e] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#F5F2EA]/70 font-light">Subtotal</span>
                <span className="font-editorial text-2xl text-[#FAF8F2] font-normal">
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-[#F5F2EA]/50 font-light">
                Direct handoff to Noir Café via WhatsApp. Ready for delivery or takeaway.
              </p>
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-lg bg-[#FAF8F2] hover:bg-white text-[#0c0c0e] font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
