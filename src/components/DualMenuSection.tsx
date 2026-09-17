import React, { useState, useEffect } from "react";
import { Category, MenuItem, PriceVariant } from "../types";
import { useCart } from "../context/CartContext";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";

interface DualMenuSectionProps {
  category: Category;
  items: MenuItem[];
}

export const DualMenuSection: React.FC<DualMenuSectionProps> = ({
  category,
  items,
}) => {
  const { addToCart } = useCart();

  // Selected item within this category (default to first item)
  const [selectedItem, setSelectedItem] = useState<MenuItem>(items[0] || null);

  // Selected variant for the active item (if it has variants)
  const [selectedVariant, setSelectedVariant] = useState<PriceVariant | undefined>(
    items[0]?.variants ? items[0].variants[0] : undefined
  );

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // When items change or category mounts, reset selected item if needed
  useEffect(() => {
    if (items.length > 0) {
      setSelectedItem(items[0]);
      setSelectedVariant(items[0].variants ? items[0].variants[0] : undefined);
      setQuantity(1);
    }
  }, [items]);

  // When selectedItem changes, default to its first variant
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedVariant(item.variants ? item.variants[0] : undefined);
    setQuantity(1);
  };

  const handleVariantChange = (variant: PriceVariant) => {
    setSelectedVariant(variant);
  };

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : selectedItem?.price || 0;

  const handleAddToCart = () => {
    if (!selectedItem) return;
    addToCart(selectedItem, selectedVariant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (!selectedItem) return null;

  return (
    <section
      id={`menu-category-${category.id}`}
      className="py-16 sm:py-20 border-b border-white/[0.06] scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Title Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-1">
              Category
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF8F2] tracking-tight font-normal">
              {category.displayName}
            </h3>
          </div>
          <span className="text-xs text-[#F5F2EA]/40 font-mono tracking-wider">
            {items.length} {items.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {/* Desktop Split Layout / Mobile Stacked Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: LARGE FEATURED IMAGE & SELECTION DETAILS (Dominates hierarchy) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#151518] border border-white/[0.08] shadow-2xl">
              <img
                key={selectedItem.id}
                src={selectedItem.image}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (selectedItem.fallbackImage && target.src !== selectedItem.fallbackImage) {
                    target.src = selectedItem.fallbackImage;
                  }
                }}
                className="w-full h-full object-cover transition-opacity duration-300 animate-in fade-in zoom-in-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h4 className="font-editorial text-2xl sm:text-3xl text-[#FAF8F2] tracking-tight font-normal">
                  {selectedItem.name}
                </h4>
                {/* Price in soft ivory / warm white */}
                <div className="text-xl sm:text-2xl font-light text-[#F5F2EA] tracking-tight whitespace-nowrap">
                  Rs {currentPrice.toLocaleString()}
                </div>
              </div>

              {selectedItem.description && (
                <p className="text-sm text-[#F5F2EA]/70 leading-relaxed font-light max-w-xl">
                  {selectedItem.description}
                </p>
              )}

              {/* Real Menu Variants (Beef R/T, Burger Single/Double, Pizza Medium/Large) */}
              {selectedItem.variants && selectedItem.variants.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#F5F2EA]/60 block mb-2 font-medium">
                    Select Option
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.variants.map((v) => {
                      const isSelected = selectedVariant?.label === v.label;
                      return (
                        <button
                          key={v.label}
                          type="button"
                          onClick={() => handleVariantChange(v)}
                          className={`px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? "bg-white/[0.12] border-[#c5a059] text-[#FAF8F2] font-medium shadow-sm"
                              : "bg-white/[0.02] border-white/[0.08] text-[#F5F2EA]/70 hover:border-white/20"
                          }`}
                        >
                          <span className="mr-2">{v.label}</span>
                          <span className="text-[#FAF8F2]/90 font-mono">Rs {v.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Controls & Add to Cart Action */}
              <div className="pt-4 flex items-center space-x-4">
                {/* Quantity adjuster */}
                <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-1.5 text-[#F5F2EA]/60 hover:text-[#FAF8F2] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-medium text-[#FAF8F2] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-1.5 text-[#F5F2EA]/60 hover:text-[#FAF8F2] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  id={`add-to-cart-${selectedItem.id}`}
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none sm:px-8 py-3 rounded-lg bg-[#FAF8F2] hover:bg-white text-[#0c0c0e] font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Added to Order</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Order — Rs {(currentPrice * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT / MOBILE BOTTOM: CLEAN SECONDARY ITEM SELECTOR */}
          <div className="lg:col-span-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F5F2EA]/60 font-medium">
                  Select Dish
                </span>
                <span className="text-[11px] text-[#F5F2EA]/40">
                  Click to feature
                </span>
              </div>

              {/* On Desktop: Clean scannable vertical list of secondary selectors.
                  On Mobile: Seamless horizontal swipeable thumbnail slider (Part 17 requirement!) */}
              <div className="lg:max-h-[560px] lg:overflow-y-auto lg:pr-2 space-y-2 flex lg:block overflow-x-auto no-scrollbar gap-3 lg:gap-0 py-2 lg:py-0">
                {items.map((item) => {
                  const isCurrent = selectedItem.id === item.id;
                  const displayPrice = item.variants
                    ? `From Rs ${item.variants[0].price}`
                    : `Rs ${item.price}`;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectItem(item)}
                      className={`w-44 sm:w-52 lg:w-full flex-shrink-0 text-left p-2.5 rounded-lg transition-all duration-200 flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 cursor-pointer border ${
                        isCurrent
                          ? "bg-white/[0.08] border-[#c5a059]/80 shadow-md"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15"
                      }`}
                    >
                      {/* Secondary item thumbnail */}
                      <div className="w-full lg:w-16 h-28 lg:h-14 rounded overflow-hidden bg-[#151518] flex-shrink-0 border border-white/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (item.fallbackImage && target.src !== item.fallbackImage) {
                              target.src = item.fallbackImage;
                            }
                          }}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Secondary item Name & Price (Clean editorial selector, not large card) */}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-medium truncate ${
                            isCurrent ? "text-[#FAF8F2]" : "text-[#F5F2EA]/85"
                          }`}
                        >
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#F5F2EA]/60 font-light mt-0.5 font-mono">
                          {displayPrice}
                        </div>
                      </div>

                      {/* Minimal selection indicator */}
                      {isCurrent && (
                        <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#c5a059] flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
