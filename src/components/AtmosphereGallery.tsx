import React, { useState, useEffect } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "interior" | "entrees" | "mains" | "beverages";
  categoryLabel: string;
  image: string;
  description: string;
  location: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "interior-main",
    title: "Dining Hall & Architectural Curve",
    category: "interior",
    categoryLabel: "Interior & Atmosphere",
    image: "/assets/images/Screenshot_20260914-114946.png",
    description: "Curved mustard booths, dark slate accents, and warm geometric wooden architecture.",
    location: "Main Dining Hall",
  },
  {
    id: "interior-booths",
    title: "Bespoke Banquette Lounge",
    category: "interior",
    categoryLabel: "Interior & Atmosphere",
    image: "/assets/images/Screenshot_20260913-175240~2.jpg",
    description: "Intimate dining alcoves bathed in warm amber recessed lighting and contemporary textures.",
    location: "Private Banquette Wing",
  },
  {
    id: "interior-timber",
    title: "Warm Timber Acoustics & Lighting",
    category: "interior",
    categoryLabel: "Interior & Atmosphere",
    image: "/assets/images/Screenshot_20260913-175214~2.jpg",
    description: "Sculpted wooden paneling engineered for acoustic comfort and serene conversation.",
    location: "Mezzanine Seating",
  },
  {
    id: "interior-perspective",
    title: "Noir Atmospheric Perspective",
    category: "interior",
    categoryLabel: "Interior & Atmosphere",
    image: "/assets/images/Screenshot_20260913-175203~2.jpg",
    description: "The interplay of deep shadow and soft warm luminance defining the Noir experience.",
    location: "Center Hall",
  },
  {
    id: "culinary-steak",
    title: "Sizzling Prime Beef Steak",
    category: "entrees",
    categoryLabel: "Steaks & Entrees",
    image: "/assets/images/Screenshot_20260913-175819~2.jpg",
    description: "Charcoal-seared prime beef cut served on an artisan skillet with herb garlic butter.",
    location: "Chef's Cut Station",
  },
  {
    id: "culinary-pasta",
    title: "Artisanal Fettuccini Alfredo",
    category: "entrees",
    categoryLabel: "Steaks & Entrees",
    image: "/assets/images/Screenshot_20260913-175804~2.jpg",
    description: "Handcrafted pasta tossed in velvety parmesan cream, cracked pepper, and grilled chicken breast.",
    location: "Pasta Kitchen",
  },
  {
    id: "culinary-chicken",
    title: "Noir Special Supreme Chicken",
    category: "entrees",
    categoryLabel: "Steaks & Entrees",
    image: "/assets/images/Screenshot_20260913-175837~2.jpg",
    description: "Tender pan-seared chicken breast smothered in chef's rich mushroom peppercorn reduction.",
    location: "Hot Line",
  },
  {
    id: "culinary-burger",
    title: "Signature Gourmet Beef Burger",
    category: "mains",
    categoryLabel: "Gourmet Mains",
    image: "/assets/images/Screenshot_20260913-175825~2.jpg",
    description: "Double smashed beef patties with melted aged cheddar, caramelized onions, and house relish.",
    location: "Grill Station",
  },
  {
    id: "culinary-pizza",
    title: "Stone-Baked Artisanal Pizza",
    category: "mains",
    categoryLabel: "Gourmet Mains",
    image: "/assets/images/Screenshot_20260913-175742~2.jpg",
    description: "Fermented dough blistered in a high-temp stone oven with fresh mozzarella and herb ranch.",
    location: "Pizza Hearth",
  },
  {
    id: "culinary-fish",
    title: "Golden Crispy Fish & Tartar Platter",
    category: "mains",
    categoryLabel: "Gourmet Mains",
    image: "/assets/images/Screenshot_20260914-122634~2.jpg",
    description: "Fresh crumb-fried sea fish fillets served with rustic skin-on fries and caper tartar sauce.",
    location: "Crisp Fry Bar",
  },
  {
    id: "drinks-mojito",
    title: "Fresh Mint & Botanical Mojito",
    category: "beverages",
    categoryLabel: "Mocktails & Delights",
    image: "/assets/images/Screenshot_20260914-122249~2.jpg",
    description: "Chilled sparkling refresher with garden mint, muddled key lime, and botanical syrups.",
    location: "Bar & Mixology",
  },
  {
    id: "drinks-shakes",
    title: "Handcrafted Mocktails & Shakes",
    category: "beverages",
    categoryLabel: "Mocktails & Delights",
    image: "/assets/images/Screenshot_20260914-122307~2.jpg",
    description: "Silky premium dessert shakes and colorful coolers prepared fresh to order.",
    location: "Bar & Mixology",
  },
];

type CategoryFilter = "all" | "interior" | "entrees" | "mains" | "beverages";

export const AtmosphereGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedFilter === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <section
      id="gallery"
      className="relative bg-[#0c0c0e] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              <Camera className="w-3.5 h-3.5" />
              <span>Original Photography</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#FAF8F2] tracking-tight font-normal">
              The Noir Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F2EA]/60 max-w-xl font-light leading-relaxed">
              Genuine imagery captured inside Noir Café Attock. Explore our real architectural space, intimate dining booths, and authentic dishes prepared by our culinary team.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Photos" },
              { id: "interior", label: "Interior & Atmosphere" },
              { id: "entrees", label: "Steaks & Entrees" },
              { id: "mains", label: "Gourmet Mains" },
              { id: "beverages", label: "Mocktails & Delights" },
            ].map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id as CategoryFilter);
                    setActivePhotoIndex(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-light tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#c5a059] text-[#0c0c0e] font-medium shadow-md shadow-[#c5a059]/10"
                      : "bg-white/[0.03] border border-white/[0.08] text-[#F5F2EA]/70 hover:text-[#FAF8F2] hover:bg-white/[0.06]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative rounded-xl overflow-hidden bg-[#151518] border border-white/[0.08] hover:border-[#c5a059]/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col"
            >
              {/* Photo Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-[#FAF8F2] font-medium tracking-wider uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                  <span>{photo.location}</span>
                </div>

                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#FAF8F2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-2 bg-[#121214]/60">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] block font-medium">
                    {photo.categoryLabel}
                  </span>
                  <h3 className="font-editorial text-lg text-[#FAF8F2] group-hover:text-[#c5a059] transition-colors mt-0.5">
                    {photo.title}
                  </h3>
                </div>
                <p className="text-xs text-[#F5F2EA]/60 font-light leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Photography Guarantee Note */}
        <div className="flex items-center justify-center space-x-2 text-center text-xs text-[#F5F2EA]/50 pt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          <span>100% Original photography from the official Noir Café Attock archives.</span>
        </div>
      </div>

      {/* High-Resolution Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F2] border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null
                  ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                  : 0
              );
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 text-[#FAF8F2] border border-white/10 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null ? (prev + 1) % filteredPhotos.length : 0
              );
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 text-[#FAF8F2] border border-white/10 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-[#121214] border border-white/10 shadow-2xl"
          >
            {/* Image Viewer */}
            <div className="relative flex-grow min-h-[300px] max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filteredPhotos[activePhotoIndex].image}
                alt={filteredPhotos[activePhotoIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Lightbox Footer Info */}
            <div className="p-6 bg-[#0e0e11] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#c5a059] font-medium mb-1">
                  <span>{filteredPhotos[activePhotoIndex].categoryLabel}</span>
                  <span>•</span>
                  <span>{filteredPhotos[activePhotoIndex].location}</span>
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl text-[#FAF8F2]">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F2EA]/70 mt-1 max-w-2xl font-light">
                  {filteredPhotos[activePhotoIndex].description}
                </p>
              </div>

              <div className="text-xs text-[#F5F2EA]/50 sm:text-right shrink-0">
                Photo {activePhotoIndex + 1} of {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
