import { useState } from 'react';
import { Menu, Printer, X } from 'lucide-react';
import { Language, ProposalCopy, SECTION_META } from '../data/proposalContent';

interface NavbarProps {
  copy: ProposalCopy;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onPrint: () => void;
  scrollProgress: number;
  getSectionTitle: (id: string) => string;
}

export function Navbar({
  copy,
  language,
  onLanguageChange,
  onPrint,
  scrollProgress,
  getSectionTitle,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#162e43]/95 backdrop-blur-md border-b border-white/10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ac53] rounded-sm"
        >
          {copy.meta.brandTitle}
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200"
        >
          {copy.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 border-b border-transparent hover:border-[#d3ac53] hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ac53] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action (+ Mobile Drawer Toggle on small viewports) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrint}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d3ac53] text-[#162e43] text-xs font-bold hover:bg-[#e0be6f] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.nav.printButton}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? copy.nav.closeMenuLabel : copy.nav.openMenuLabel}
            className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-slate-100 hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ac53]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Thin Reading Progress Indicator (Compositor-Only transform) */}
      <div className="h-[2px] w-full bg-white/10 overflow-hidden" aria-hidden="true">
        <div
          className="h-full w-full bg-[#d3ac53] origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#162e43] border-t border-white/10 max-h-[80vh] overflow-y-auto px-4 py-5 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
            <span className="text-xs font-semibold text-slate-300">{copy.hero.languageLabel}</span>
            <div
              role="group"
              aria-label={copy.hero.languageLabel}
              className="inline-flex items-center p-1 rounded-lg bg-[#0f2030] border border-white/10"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('ms')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  language === 'ms'
                    ? 'bg-[#d3ac53] text-[#162e43]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Bahasa Melayu
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  language === 'en'
                    ? 'bg-[#d3ac53] text-[#162e43]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">
              {copy.nav.mobileMenuHeading}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {SECTION_META.map((sec) => (
                <a
                  key={sec.id}
                  href={sec.anchor}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="font-mono text-xs text-[#d3ac53] tabular-nums shrink-0">
                    {sec.number}
                  </span>
                  <span className="truncate">{getSectionTitle(sec.id)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-2 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onPrint();
              }}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#d3ac53] text-[#162e43] text-sm font-bold cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>{copy.nav.printButton}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
