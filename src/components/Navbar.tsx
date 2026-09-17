import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Order", href: "#menu" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="noir-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-[#0c0c0e]/90 via-[#0c0c0e]/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo"
            href="#"
            className="flex flex-col tracking-tight group"
          >
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.22em] text-[#FAF8F2] font-semibold transition-colors duration-300 group-hover:text-[#c5a059]">
              NOIR
            </span>
            <span className="text-[9px] tracking-[0.38em] uppercase text-[#F5F2EA]/60 -mt-1 font-medium">
              CAFÉ ATTOCK
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs tracking-[0.2em] uppercase text-[#F5F2EA]/75 hover:text-[#FAF8F2] transition-colors duration-200 relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a059] after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Cart + Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Order Cart"
              className="relative p-2.5 rounded-full text-[#FAF8F2] hover:text-[#c5a059] transition-colors border border-white/10 hover:border-[#c5a059]/40 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 bg-[#c5a059] text-[#0c0c0e] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in fade-in zoom-in-75 duration-200"
                >
                  {totalCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-[#FAF8F2] hover:text-[#c5a059] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#0c0c0e] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="block w-full text-left py-2 text-sm uppercase tracking-[0.2em] text-[#F5F2EA]/85 hover:text-[#c5a059] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#F5F2EA]/60">
            <span>Attock, Pakistan</span>
            <span className="text-[#c5a059]">12:30 PM – 2:00 AM</span>
          </div>
        </div>
      )}
    </header>
  );
};
