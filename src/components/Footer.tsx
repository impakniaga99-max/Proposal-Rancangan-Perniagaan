import { ArrowUp } from 'lucide-react';
import { Language, ProposalCopy } from '../data/proposalContent';

interface FooterProps {
  copy: ProposalCopy;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Footer({ copy, language, onLanguageChange }: FooterProps) {
  return (
    <footer className="bg-[#162e43] text-slate-300 border-t border-white/10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <p className="text-sm font-bold text-white">{copy.footer.title}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{copy.footer.description}</p>
          <p className="text-xs text-slate-400 pt-1">{copy.footer.copyright}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div
            role="group"
            aria-label={copy.hero.languageLabel}
            className="inline-flex items-center p-1 rounded-lg bg-[#0f2030] border border-white/10"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('ms')}
              className={`min-h-[34px] px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
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
              className={`min-h-[34px] px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                language === 'en'
                  ? 'bg-[#d3ac53] text-[#162e43]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <a
            href="#top"
            className="min-h-[40px] inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#d3ac53]" aria-hidden="true" />
            <span>{copy.footer.backToTop}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
