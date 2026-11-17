import { ProposalCopy, SECTION_META } from '../data/proposalContent';

interface TableOfContentsProps {
  copy: ProposalCopy;
  activeSectionId: string;
  visibleSectionIds: string[];
  getSectionTitle: (id: string) => string;
}

export function TableOfContents({
  copy,
  activeSectionId,
  visibleSectionIds,
  getSectionTitle,
}: TableOfContentsProps) {
  return (
    <aside
      aria-label={copy.nav.tocHeading}
      className="hidden xl:block sticky top-24 self-start no-print"
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-bold text-[#162e43] pb-3 border-b border-slate-200">
          {copy.nav.tocHeading}
        </p>

        <nav className="mt-3 space-y-1">
          {SECTION_META.map((sec) => {
            const isVisible = visibleSectionIds.includes(sec.id);
            const isActive = activeSectionId === sec.id;

            return (
              <a
                key={sec.id}
                href={sec.anchor}
                aria-current={isActive ? 'location' : undefined}
                className={`flex items-baseline gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors duration-150 ${
                  !isVisible
                    ? 'opacity-35 pointer-events-none'
                    : isActive
                      ? 'bg-[#162e43] text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`font-mono tabular-nums shrink-0 ${
                    isActive ? 'text-[#d3ac53]' : 'text-[#8c681c]'
                  }`}
                >
                  {sec.number}
                </span>
                <span className="truncate">{getSectionTitle(sec.id)}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
