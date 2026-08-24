import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/homeData';
import { Menu, X, Shield, ArrowRight, Wallet } from 'lucide-react';
import { BAIZEARN_LOGO } from '../assets/logo';

interface HeaderProps {
  onOpenExportModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExportModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071A35]/95 backdrop-blur-md shadow-xl border-b border-white/10 py-3'
          : 'bg-[#071A35] py-3.5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="header-logo-link"
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 text-white group"
          >
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-[#1769E0]/40 border border-[#FFC107]/40 group-hover:scale-105 transition-transform bg-[#071A35] flex items-center justify-center p-0.5">
              <img
                src={BAIZEARN_LOGO}
                alt="BaizEarn Logo"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Baiz<span className="text-[#00C853]">Earn</span></span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors hover:text-[#FFC107] relative py-1 ${
                  activeHash === link.href ? 'text-white font-semibold' : 'text-slate-300/80'
                }`}
              >
                {link.label}
                {activeHash === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC107] rounded-full shadow-sm" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenExportModal && (
              <button
                type="button"
                id="header-wp-code-btn"
                onClick={onOpenExportModal}
                className="text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#FFC107] border border-[#FFC107]/40 flex items-center gap-1.5 transition-all"
                title="View clean HTML/CSS/JS ready for WordPress"
              >
                <span>WordPress Code</span>
              </button>
            )}

            <a
              href="#login"
              id="header-login-btn"
              className="text-sm font-semibold text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 hover:border-white/35 transition-all"
            >
              Login
            </a>

            <a
              href="#register"
              id="header-register-btn"
              className="text-sm font-semibold bg-[#1769E0] hover:bg-[#1255b8] text-white px-4 py-2 rounded-lg shadow-[0_4px_15px_rgba(23,105,224,0.3)] hover:shadow-[0_6px_20px_rgba(23,105,224,0.45)] transition-all flex items-center gap-1.5 hover:-translate-y-0.5"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenExportModal && (
              <button
                type="button"
                id="header-mobile-wp-btn"
                onClick={onOpenExportModal}
                className="text-xs font-semibold px-2.5 py-1.5 rounded bg-white/10 text-[#FFC107] border border-[#FFC107]/40"
              >
                WP Code
              </button>
            )}
            <button
              type="button"
              id="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeHash === link.href
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#login"
                id="mobile-login-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-slate-200 font-semibold border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                Login
              </a>
              <a
                href="#register"
                id="mobile-register-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-[#1769E0] text-white font-semibold rounded-lg shadow-md hover:bg-[#1255b8] transition-colors"
              >
                Create Account
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
