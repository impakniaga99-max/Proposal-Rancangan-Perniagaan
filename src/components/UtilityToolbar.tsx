import { ChevronsDownUp, ChevronsUpDown, Search, X } from 'lucide-react';
import { Language, ProposalCopy, SECTION_META } from '../data/proposalContent';

interface UtilityToolbarProps {
  copy: ProposalCopy;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  matchedCount: number;
  totalCount: number;
  allExpanded: boolean;
  onToggleExpandAll: () => void;
  getSectionTitle: (id: string) => string;
}

export function UtilityToolbar({
  copy,
  language,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  matchedCount,
  totalCount,
  allExpanded,
  onToggleExpandAll,
  getSectionTitle,
}: UtilityToolbarProps) {
  const handleJump = (anchor: string) => {
    if (!anchor) return;
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input + Match Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={copy.toolbar.searchPlaceholder}
              aria-label={copy.toolbar.searchPlaceholder}
              className="w-full min-h-[42px] pl-10 pr-9 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#224463] focus:border-[#224463] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label={copy.toolbar.clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="text-xs text-slate-600 tabular-nums whitespace-nowrap shrink-0">
            {copy.toolbar.showingCount}{' '}
            <span className="font-semibold text-slate-900">{matchedCount}</span>{' '}
            {copy.toolbar.ofTotal}{' '}
            <span className="font-semibold text-slate-900">{totalCount}</span>{' '}
            {copy.toolbar.sectionsWord}
          </p>
        </div>

        {/* Right Controls: Jump Dropdown + Expand/Collapse + Compact Language Switch */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <label htmlFor="section-jump" className="sr-only">
              {copy.toolbar.jumpLabel}
            </label>
            <select
              id="section-jump"
              defaultValue=""
              onChange={(e) => {
                handleJump(e.target.value);
                e.target.value = '';
              }}
              className="min-h-[42px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#224463] cursor-pointer max-w-[220px]"
            >
              <option value="" disabled>
                {copy.toolbar.jumpLabel}
              </option>
              {SECTION_META.map((sec) => (
                <option key={sec.id} value={sec.anchor}>
                  {sec.number}. {getSectionTitle(sec.id)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onToggleExpandAll}
            className="min-h-[42px] inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224463]"
          >
            {allExpanded ? (
              <>
                <ChevronsDownUp className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{copy.toolbar.collapseAll}</span>
              </>
            ) : (
              <>
                <ChevronsUpDown className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{copy.toolbar.expandAll}</span>
              </>
            )}
          </button>

          <div
            role="group"
            aria-label={copy.hero.languageLabel}
            className="inline-flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('ms')}
              aria-pressed={language === 'ms'}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                language === 'ms'
                  ? 'bg-[#224463] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BM
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                language === 'en'
                  ? 'bg-[#224463] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
