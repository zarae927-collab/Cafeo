import React, { useRef, useEffect } from "react";
import { MENU_CATEGORIES } from "../data/menuData";

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view in the horizontal container
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector<HTMLButtonElement>(
        `[data-category="${activeCategory}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  return (
    <div
      id="category-navigation-bar"
      className="sticky top-[60px] z-30 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-1 sm:space-x-2 py-3 overflow-x-auto no-scrollbar"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                data-category={cat.id}
                id={`cat-nav-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#FAF8F2] text-[#0c0c0e] font-semibold shadow-md"
                    : "text-[#F5F2EA]/70 hover:text-[#FAF8F2] hover:bg-white/[0.05]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
