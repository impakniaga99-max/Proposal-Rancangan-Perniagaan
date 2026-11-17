import { useEffect, useMemo, useState } from 'react';
import { EndorsementModal } from './components/EndorsementModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProposalSections } from './components/ProposalSections';
import { TableOfContents } from './components/TableOfContents';
import { UtilityToolbar } from './components/UtilityToolbar';
import {
  EstimatorSelection,
  Language,
  PROPOSAL_COPY,
  SECTION_META,
} from './data/proposalContent';

const STORAGE_KEY = 'proposal_language';

function buildInitialExpandedState(): Record<string, boolean> {
  return SECTION_META.reduce<Record<string, boolean>>((acc, sec) => {
    acc[sec.id] = true;
    return acc;
  }, {});
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'ms' || saved === 'en') return saved;
    }
    return 'ms';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    buildInitialExpandedState
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(SECTION_META[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estimatorPreset, setEstimatorPreset] = useState<EstimatorSelection | null>(null);

  const copy = PROPOSAL_COPY[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.meta.pageTitle;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage restrictions
    }
  }, [language, copy.meta.pageTitle]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
      setScrollProgress(ratio);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: 0.05 }
    );

    SECTION_META.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  const getSectionTitle = (id: string): string => {
    switch (id) {
      case 'ringkasan':
        return copy.sections.ringkasan.title;
      case 'pengenalan':
        return copy.sections.pengenalan.title;
      case 'masalah':
        return copy.sections.masalah.title;
      case 'penyelesaian':
        return copy.sections.penyelesaian.title;
      case 'objektif':
        return copy.sections.objektif.title;
      case 'sasaran':
        return copy.sections.sasaran.title;
      case 'impak':
        return copy.sections.impak.title;
      case 'agensi':
        return copy.sections.agensi.title;
      case 'kesimpulan':
        return copy.sections.kesimpulan.title;
      case 'penutup':
        return copy.sections.penutup.title;
      case 'jadual-kos':
        return copy.sections.jadualKos.title;
      case 'faq':
        return copy.sections.faq.title;
      default:
        return id;
    }
  };

  const getSectionSearchBlob = (id: string): string => {
    const meta = SECTION_META.find((s) => s.id === id);
    const baseKeywords = meta ? `${meta.number} ${meta.keywords}` : '';

    switch (id) {
      case 'ringkasan':
        return `${baseKeywords} ${JSON.stringify(copy.sections.ringkasan)}`.toLowerCase();
      case 'pengenalan':
        return `${baseKeywords} ${JSON.stringify(copy.sections.pengenalan)}`.toLowerCase();
      case 'masalah':
        return `${baseKeywords} ${JSON.stringify(copy.sections.masalah)}`.toLowerCase();
      case 'penyelesaian':
        return `${baseKeywords} ${JSON.stringify(copy.sections.penyelesaian)}`.toLowerCase();
      case 'objektif':
        return `${baseKeywords} ${JSON.stringify(copy.sections.objektif)}`.toLowerCase();
      case 'sasaran':
        return `${baseKeywords} ${JSON.stringify(copy.sections.sasaran)}`.toLowerCase();
      case 'impak':
        return `${baseKeywords} ${JSON.stringify(copy.sections.impak)}`.toLowerCase();
      case 'agensi':
        return `${baseKeywords} ${JSON.stringify(copy.sections.agensi)}`.toLowerCase();
      case 'kesimpulan':
        return `${baseKeywords} ${JSON.stringify(copy.sections.kesimpulan)}`.toLowerCase();
      case 'penutup':
        return `${baseKeywords} ${JSON.stringify(copy.sections.penutup)}`.toLowerCase();
      case 'jadual-kos':
        return `${baseKeywords} ${JSON.stringify(copy.sections.jadualKos)}`.toLowerCase();
      case 'faq':
        return `${baseKeywords} ${JSON.stringify(copy.sections.faq)}`.toLowerCase();
      default:
        return baseKeywords.toLowerCase();
    }
  };

  const visibleSectionIds = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return SECTION_META.map((s) => s.id);
    return SECTION_META.filter((sec) => getSectionSearchBlob(sec.id).includes(term)).map(
      (s) => s.id
    );
  }, [searchQuery, copy]);

  const allExpanded = useMemo(
    () => visibleSectionIds.every((id) => expandedSections[id] !== false),
    [visibleSectionIds, expandedSections]
  );

  const handleToggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  const handleToggleExpandAll = () => {
    const nextState = !allExpanded;
    setExpandedSections((prev) => {
      const updated = { ...prev };
      SECTION_META.forEach((sec) => {
        updated[sec.id] = nextState;
      });
      return updated;
    });
  };

  const handleOpenModal = (preset?: EstimatorSelection) => {
    setEstimatorPreset(preset ?? null);
    setIsModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        copy={copy}
        language={language}
        onLanguageChange={setLanguage}
        onPrint={handlePrint}
        scrollProgress={scrollProgress}
        getSectionTitle={getSectionTitle}
      />

      <HeroSection
        copy={copy}
        language={language}
        onLanguageChange={setLanguage}
      />

      <UtilityToolbar
        copy={copy}
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        matchedCount={visibleSectionIds.length}
        totalCount={SECTION_META.length}
        allExpanded={allExpanded}
        onToggleExpandAll={handleToggleExpandAll}
        getSectionTitle={getSectionTitle}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-start">
          <TableOfContents
            copy={copy}
            activeSectionId={activeSectionId}
            visibleSectionIds={visibleSectionIds}
            getSectionTitle={getSectionTitle}
          />

          <main className="min-w-0">
            <ProposalSections
              copy={copy}
              visibleSectionIds={visibleSectionIds}
              expandedSections={expandedSections}
              onToggleSection={handleToggleSection}
              onResetSearch={() => setSearchQuery('')}
              onOpenModal={handleOpenModal}
              onPrint={handlePrint}
            />
          </main>
        </div>
      </div>

      <Footer
        copy={copy}
        language={language}
        onLanguageChange={setLanguage}
      />

      <EndorsementModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        copy={copy}
        language={language}
        estimatorPreset={estimatorPreset}
      />
    </div>
  );
}
