import { useState } from 'react';
import { ArrowDown, CalendarClock, Globe } from 'lucide-react';
import { Language, ProposalCopy } from '../data/proposalContent';

interface HeroSectionProps {
  copy: ProposalCopy;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const HERO_IMAGE_PATH = '/src/assets/images/hero_workshop_executive_1794883614118.jpg';

export function HeroSection({ copy, language, onLanguageChange }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative bg-[#162e43] text-white overflow-hidden border-b border-slate-200/15"
    >
      {/* Background Photographic Layer with Measured Scrim */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2030] via-[#162e43] to-[#224463]">
        {!imgError && (
          <img
            src={HERO_IMAGE_PATH}
            alt={copy.hero.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0f2030]/90 via-[#162e43]/88 to-[#162e43]/98"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16">
        {/* Top Row: Clean Unboxed Metadata + Prominent Above-the-Fold Language Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/15">
          <p className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
            {copy.hero.kicker}
          </p>

          <div className="flex items-center gap-3 self-start sm:self-auto no-print">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 text-[#d3ac53]" aria-hidden="true" />
              <span>{copy.hero.languageLabel}:</span>
            </span>
            <div
              role="group"
              aria-label={copy.hero.languageLabel}
              className="inline-flex items-center p-1 rounded-lg bg-[#0f2030]/90 border border-white/15"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('ms')}
                aria-pressed={language === 'ms'}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ac53] ${
                  language === 'ms'
                    ? 'bg-[#d3ac53] text-[#162e43] shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Bahasa Melayu
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                aria-pressed={language === 'en'}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ac53] ${
                  language === 'en'
                    ? 'bg-[#d3ac53] text-[#162e43] shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Main Hero Split: Editorial Statement + Framed Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-8 sm:pt-10">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-[clamp(2rem,4vw,3.35rem)] font-extrabold tracking-tight leading-[1.12] text-white max-w-2xl">
              {copy.hero.headline}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {copy.hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 no-print">
              <a
                href="#ringkasan"
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#d3ac53] text-[#162e43] text-sm font-bold hover:bg-[#e0be6f] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{copy.hero.primaryCta}</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#jadual-kos"
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ac53]"
              >
                <CalendarClock className="w-4 h-4 text-[#d3ac53]" aria-hidden="true" />
                <span>{copy.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <figure className="h-full flex flex-col rounded-xl overflow-hidden border border-white/15 bg-[#0f2030]">
              <div className="relative aspect-16/10 lg:aspect-auto lg:flex-1 overflow-hidden bg-gradient-to-br from-[#224463] to-[#0f2030]">
                {!imgError ? (
                  <img
                    src={HERO_IMAGE_PATH}
                    alt={copy.hero.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[220px] flex items-center justify-center p-6 text-center text-slate-300 text-sm">
                    {copy.hero.imageAlt}
                  </div>
                )}
              </div>
              <figcaption className="px-4 py-3 text-xs text-slate-300 border-t border-white/10 bg-[#0f2030]/90">
                {copy.hero.imageCaption}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 3-Column Executive Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {copy.hero.highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-medium text-slate-300">{item.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-[#d3ac53] tracking-tight tabular-nums">
                {item.value}
              </p>
              <p className="text-sm text-slate-300 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
