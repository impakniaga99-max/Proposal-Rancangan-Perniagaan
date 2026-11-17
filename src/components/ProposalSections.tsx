import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Printer,
  SearchX,
  Send,
} from 'lucide-react';
import { EstimatorSelection, ProposalCopy, SECTION_META } from '../data/proposalContent';

interface ProposalSectionsProps {
  copy: ProposalCopy;
  visibleSectionIds: string[];
  expandedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
  onResetSearch: () => void;
  onOpenModal: (preset?: EstimatorSelection) => void;
  onPrint: () => void;
}

const MENTORING_IMAGE_PATH = '/src/assets/images/workshop_financial_mentoring_1794883614693.jpg';

interface SectionShellProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  isExpanded: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
  dark?: boolean;
  children: React.ReactNode;
}

function SectionShell({
  id,
  number,
  title,
  subtitle,
  isExpanded,
  onToggle,
  expandLabel,
  collapseLabel,
  dark = false,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 rounded-2xl border transition-colors ${
        dark
          ? 'bg-[#162e43] border-white/15 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            <span
              className={`font-mono text-sm sm:text-base font-semibold tabular-nums pt-1 shrink-0 ${
                dark ? 'text-[#d3ac53]' : 'text-[#8c681c]'
              }`}
            >
              {number}
            </span>
            <div className="min-w-0">
              <h2
                id={`${id}-heading`}
                className={`text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight leading-snug ${
                  dark ? 'text-white' : 'text-[#162e43]'
                }`}
              >
                {title}
              </h2>
              <p
                className={`mt-1 text-sm leading-relaxed ${
                  dark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={`${id}-body`}
            aria-label={isExpanded ? collapseLabel : expandLabel}
            className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border transition-colors cursor-pointer shrink-0 no-print focus-visible:outline-none focus-visible:ring-2 ${
              dark
                ? 'border-white/15 text-slate-200 hover:bg-white/10 focus-visible:ring-[#d3ac53]'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-[#224463]'
            }`}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          id={`${id}-body`}
          className={`${isExpanded ? 'block' : 'hidden'} print-expand mt-8 pt-8 border-t ${
            dark ? 'border-white/15' : 'border-slate-200'
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export function ProposalSections({
  copy,
  visibleSectionIds,
  expandedSections,
  onToggleSection,
  onResetSearch,
  onOpenModal,
  onPrint,
}: ProposalSectionsProps) {
  const [mentoringImgError, setMentoringImgError] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<'day1' | 'day2' | 'followup'>('day1');

  // Interactive Investment Estimator state
  const [selectedMode, setSelectedMode] = useState('physical');
  const [selectedParticipants, setSelectedParticipants] = useState(30);
  const [includeCustomTemplate, setIncludeCustomTemplate] = useState(false);
  const [includeExtraClinic, setIncludeExtraClinic] = useState(false);

  const estimator = copy.sections.jadualKos.estimator;

  const calculatedEstimate = useMemo(() => {
    const modeObj =
      estimator.modes.find((m) => m.value === selectedMode) ?? estimator.modes[0];
    const baseAndPerHead = modeObj.baseCost + modeObj.perHeadCost * selectedParticipants;
    const addons =
      (includeCustomTemplate ? estimator.customTemplatePrice : 0) +
      (includeExtraClinic ? estimator.extraClinicPrice : 0);
    const totalAmountRm = baseAndPerHead + addons;
    const perParticipantRm = Math.round(totalAmountRm / selectedParticipants);
    return {
      modeObj,
      totalAmountRm,
      perParticipantRm,
    };
  }, [
    estimator,
    selectedMode,
    selectedParticipants,
    includeCustomTemplate,
    includeExtraClinic,
  ]);

  const activeCurriculum =
    copy.sections.penyelesaian.curriculumTabs.find((t) => t.id === activeCurriculumTab) ??
    copy.sections.penyelesaian.curriculumTabs[0];

  const isVisible = (id: string) => visibleSectionIds.includes(id);

  if (visibleSectionIds.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
          <SearchX className="w-6 h-6" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{copy.toolbar.noResultsTitle}</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">{copy.toolbar.noResultsDesc}</p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onResetSearch}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#224463] text-white text-sm font-semibold hover:bg-[#162e43] transition-colors cursor-pointer"
          >
            {copy.toolbar.resetFilter}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 01. Ringkasan Eksekutif / Executive Summary */}
      {isVisible('ringkasan') && (
        <SectionShell
          id="ringkasan"
          number={SECTION_META[0].number}
          title={copy.sections.ringkasan.title}
          subtitle={copy.sections.ringkasan.subtitle}
          isExpanded={expandedSections['ringkasan'] ?? true}
          onToggle={() => onToggleSection('ringkasan')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="space-y-8">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl font-serif">
              {copy.sections.ringkasan.leadParagraph}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.sections.ringkasan.cards.map((card, idx) => (
                <div
                  key={card.title}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8c681c] tabular-nums">
                      01.{idx + 1}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-[#162e43]">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <p className="mt-5 pt-4 border-t border-slate-200 text-xs font-semibold text-[#224463] tabular-nums">
                    {card.metric}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      )}

      {/* 02. Pengenalan / Introduction */}
      {isVisible('pengenalan') && (
        <SectionShell
          id="pengenalan"
          number={SECTION_META[1].number}
          title={copy.sections.pengenalan.title}
          subtitle={copy.sections.pengenalan.subtitle}
          isExpanded={expandedSections['pengenalan'] ?? true}
          onToggle={() => onToggleSection('pengenalan')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-prose">
              {copy.sections.pengenalan.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            <div className="lg:col-span-5 bg-[#162e43] text-white rounded-xl p-6">
              <h3 className="text-sm font-bold text-[#d3ac53] tracking-wide">
                {copy.sections.pengenalan.flowTitle}
              </h3>
              <ol className="mt-4 divide-y divide-white/10">
                {copy.sections.pengenalan.flowSteps.map((step, index) => (
                  <li
                    key={step.phase}
                    className="py-3.5 first:pt-1 last:pb-1 flex items-baseline justify-between gap-4"
                  >
                    <span className="text-sm font-semibold text-white">
                      <span className="font-mono text-xs text-[#d3ac53] mr-2.5 tabular-nums">
                        0{index + 1}
                      </span>
                      {step.phase}
                    </span>
                    <span className="text-xs text-slate-300 text-right">{step.focus}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </SectionShell>
      )}

      {/* 03. Penyataan Masalah / Problem Statement */}
      {isVisible('masalah') && (
        <SectionShell
          id="masalah"
          number={SECTION_META[2].number}
          title={copy.sections.masalah.title}
          subtitle={copy.sections.masalah.subtitle}
          isExpanded={expandedSections['masalah'] ?? true}
          onToggle={() => onToggleSection('masalah')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.sections.masalah.cards.map((item) => (
              <div
                key={item.title}
                className="bg-rose-50/60 border border-rose-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-rose-700 text-xs font-semibold mb-3">
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{item.consequenceLabel}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">{item.description}</p>
                </div>
                <p className="mt-5 pt-4 border-t border-rose-200 text-xs font-bold text-rose-800">
                  {item.consequence}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {/* 04. Penyelesaian & Kurikulum 10 Modul / Solution & 10-Module Curriculum */}
      {isVisible('penyelesaian') && (
        <SectionShell
          id="penyelesaian"
          number={SECTION_META[3].number}
          title={copy.sections.penyelesaian.title}
          subtitle={copy.sections.penyelesaian.subtitle}
          isExpanded={expandedSections['penyelesaian'] ?? true}
          onToggle={() => onToggleSection('penyelesaian')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-prose">
                    {copy.sections.penyelesaian.description}
                  </p>

                  <ul className="divide-y divide-slate-200 border-y border-slate-200">
                    {copy.sections.penyelesaian.points.map((point) => (
                      <li key={point.title} className="py-4 flex items-start gap-3.5">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-[#162e43]">
                            {point.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                            {point.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Module Completion Overview */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
                  <h3 className="text-sm font-bold text-[#162e43]">
                    {copy.sections.penyelesaian.progressTitle}
                  </h3>
                  <div className="space-y-3">
                    {copy.sections.penyelesaian.modules.map((mod) => (
                      <div key={mod.name}>
                        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                          <span>{mod.name}</span>
                          <span className="font-mono text-xs font-semibold text-emerald-700 tabular-nums">
                            {mod.completion}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full w-full rounded-full bg-emerald-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <figure className="h-full flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <div className="relative aspect-4/3 lg:aspect-auto lg:flex-1 overflow-hidden bg-slate-200">
                    {!mentoringImgError ? (
                      <img
                        src={MENTORING_IMAGE_PATH}
                        alt={copy.sections.penyelesaian.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() => setMentoringImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[240px] flex items-center justify-center p-6 text-center text-sm text-slate-600">
                        {copy.sections.penyelesaian.imageAlt}
                      </div>
                    )}
                  </div>
                  <figcaption className="px-4 py-3 text-xs font-serif italic text-slate-600 bg-slate-50 border-t border-slate-200">
                    {copy.sections.penyelesaian.imageCaption}
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Interactive 10-Module Curriculum Tabs */}
            <div className="pt-8 border-t border-slate-200 space-y-5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#162e43]">
                    {copy.sections.penyelesaian.curriculumTitle}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {copy.sections.penyelesaian.curriculumSubtitle}
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label={copy.sections.penyelesaian.curriculumTitle}
                  className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 no-print"
                >
                  {copy.sections.penyelesaian.curriculumTabs.map((tab) => {
                    const isSelected = tab.id === activeCurriculumTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveCurriculumTab(tab.id)}
                        className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#162e43] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
                <p className="text-xs sm:text-sm font-semibold text-[#8c681c] pb-4 border-b border-slate-200">
                  {activeCurriculum.theme}
                </p>

                <div className="divide-y divide-slate-200">
                  {activeCurriculum.sessions.map((session) => (
                    <div
                      key={session.code}
                      className="py-4 first:pt-4 last:pb-1 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start"
                    >
                      <div className="lg:col-span-3 flex items-baseline gap-3">
                        <span className="font-mono text-xs font-bold text-[#162e43] bg-white border border-slate-200 px-2 py-1 rounded-md tabular-nums shrink-0">
                          {session.code}
                        </span>
                        <span className="font-mono text-xs text-slate-600 tabular-nums">
                          {session.time}
                        </span>
                      </div>

                      <div className="lg:col-span-9 space-y-2">
                        <h4 className="text-sm sm:text-base font-bold text-[#162e43]">
                          {session.title}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                          <p>
                            <span className="font-semibold text-slate-800">
                              {copy.sections.penyelesaian.sessionOutputLabel}:{' '}
                            </span>
                            {session.output}
                          </p>
                          <p>
                            <span className="font-semibold text-[#8c681c]">
                              {copy.sections.penyelesaian.aiRoleLabel}:{' '}
                            </span>
                            {session.aiRole}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      )}

      {/* 05. Objektif Program / Program Objectives */}
      {isVisible('objektif') && (
        <SectionShell
          id="objektif"
          number={SECTION_META[4].number}
          title={copy.sections.objektif.title}
          subtitle={copy.sections.objektif.subtitle}
          isExpanded={expandedSections['objektif'] ?? true}
          onToggle={() => onToggleSection('objektif')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.sections.objektif.items.map((obj, idx) => (
              <div
                key={obj.title}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#8c681c] tabular-nums">
                    05.{idx + 1}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#162e43]">{obj.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{obj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {/* 06. Sasaran Peserta & Persediaan Awal / Target Participants & Readiness */}
      {isVisible('sasaran') && (
        <SectionShell
          id="sasaran"
          number={SECTION_META[5].number}
          title={copy.sections.sasaran.title}
          subtitle={copy.sections.sasaran.subtitle}
          isExpanded={expandedSections['sasaran'] ?? true}
          onToggle={() => onToggleSection('sasaran')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.sections.sasaran.groups.map((group) => (
                <div
                  key={group.title}
                  className="bg-amber-50/50 border border-amber-200 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#162e43]">{group.title}</h3>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                  <p className="mt-5 pt-3 border-t border-amber-200/80 text-xs font-semibold text-[#8c681c]">
                    {group.readiness}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-[#162e43] mb-4">
                <ClipboardCheck className="w-4 h-4 text-[#8c681c]" aria-hidden="true" />
                <h3>{copy.sections.sasaran.checklistTitle}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {copy.sections.sasaran.checklistItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionShell>
      )}

      {/* 07. Impak Kepada Peserta / Impact on Participants */}
      {isVisible('impak') && (
        <SectionShell
          id="impak"
          number={SECTION_META[6].number}
          title={copy.sections.impak.title}
          subtitle={copy.sections.impak.subtitle}
          isExpanded={expandedSections['impak'] ?? true}
          onToggle={() => onToggleSection('impak')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.sections.impak.outcomes.map((outcome, idx) => (
              <div
                key={outcome.title}
                className="border border-slate-200 rounded-xl p-6 flex items-start gap-4 bg-slate-50/70"
              >
                <span className="font-mono text-sm font-semibold text-[#224463] tabular-nums pt-0.5 shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#162e43]">{outcome.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {/* 08. Impak Kepada Agensi Pembimbing / Impact on Guiding Agencies */}
      {isVisible('agensi') && (
        <SectionShell
          id="agensi"
          number={SECTION_META[7].number}
          title={copy.sections.agensi.title}
          subtitle={copy.sections.agensi.subtitle}
          isExpanded={expandedSections['agensi'] ?? true}
          onToggle={() => onToggleSection('agensi')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.sections.agensi.benefits.map((benefit, idx) => (
                <div
                  key={benefit.title}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6"
                >
                  <span className="font-mono text-xs font-semibold text-[#224463] tabular-nums">
                    08.{idx + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[#162e43]">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Structured Before vs. After Benchmark Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h3 className="text-sm sm:text-base font-bold text-[#162e43]">
                  {copy.sections.agensi.comparisonTitle}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-white text-xs font-semibold text-slate-500">
                      <th className="py-3.5 px-5">{copy.sections.agensi.comparisonHeaders.dimension}</th>
                      <th className="py-3.5 px-5">{copy.sections.agensi.comparisonHeaders.before}</th>
                      <th className="py-3.5 px-5 text-[#162e43]">
                        {copy.sections.agensi.comparisonHeaders.after}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {copy.sections.agensi.comparisonRows.map((row) => (
                      <tr key={row.dimension} className="align-top">
                        <td className="py-4 px-5 font-semibold text-[#162e43] whitespace-nowrap sm:whitespace-normal">
                          {row.dimension}
                        </td>
                        <td className="py-4 px-5 text-slate-600">{row.before}</td>
                        <td className="py-4 px-5 text-slate-900 font-medium bg-emerald-50/40">
                          {row.after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionShell>
      )}

      {/* 09. Kesimpulan / Conclusion */}
      {isVisible('kesimpulan') && (
        <SectionShell
          id="kesimpulan"
          number={SECTION_META[8].number}
          title={copy.sections.kesimpulan.title}
          subtitle={copy.sections.kesimpulan.subtitle}
          isExpanded={expandedSections['kesimpulan'] ?? true}
          onToggle={() => onToggleSection('kesimpulan')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <p className="lg:col-span-7 text-sm sm:text-base text-slate-700 leading-relaxed max-w-prose">
              {copy.sections.kesimpulan.body}
            </p>
            <blockquote className="lg:col-span-5 py-6 border-y border-slate-200 font-serif italic text-lg sm:text-xl text-[#162e43] leading-relaxed">
              “{copy.sections.kesimpulan.pullQuote}”
            </blockquote>
          </div>
        </SectionShell>
      )}

      {/* 10. Penutup & Pengesahan / Closing & Endorsement */}
      {isVisible('penutup') && (
        <SectionShell
          id="penutup"
          number={SECTION_META[9].number}
          title={copy.sections.penutup.title}
          subtitle={copy.sections.penutup.subtitle}
          isExpanded={expandedSections['penutup'] ?? true}
          onToggle={() => onToggleSection('penutup')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
          dark
        >
          <div className="space-y-8">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              {copy.sections.penutup.body}
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/15 text-sm">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <dt className="text-xs font-medium text-[#d3ac53]">
                  {copy.sections.penutup.statusLabel}
                </dt>
                <dd className="mt-1 font-semibold text-white">
                  {copy.sections.penutup.statusValue}
                </dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <dt className="text-xs font-medium text-[#d3ac53]">
                  {copy.sections.penutup.formatLabel}
                </dt>
                <dd className="mt-1 font-semibold text-white">
                  {copy.sections.penutup.formatValue}
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center gap-4 no-print">
              <button
                type="button"
                onClick={() => onOpenModal()}
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#d3ac53] text-[#162e43] text-sm font-bold hover:bg-[#e0be6f] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{copy.sections.penutup.actionButton}</span>
              </button>

              <button
                type="button"
                onClick={onPrint}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-4 h-4 text-[#d3ac53]" aria-hidden="true" />
                <span>{copy.sections.penutup.printButton}</span>
              </button>
            </div>

            {/* Official Sign-Off Grid (Ideal for Printed / PDF Approval) */}
            <div className="pt-6 border-t border-white/15 space-y-4">
              <p className="text-xs font-semibold text-slate-300">
                {copy.sections.penutup.signoffTitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {copy.sections.penutup.signoffRoles.map((item) => (
                  <div
                    key={item.role}
                    className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-8"
                  >
                    <p className="text-xs font-semibold text-[#d3ac53]">{item.role}</p>
                    <div className="pt-4 border-t border-white/20 text-xs text-slate-300">
                      {item.placeholder}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      )}

      {/* 11. Jadual Pelaksanaan & Kalkulator Anggaran Kos */}
      {isVisible('jadual-kos') && (
        <SectionShell
          id="jadual-kos"
          number={SECTION_META[10].number}
          title={copy.sections.jadualKos.title}
          subtitle={copy.sections.jadualKos.subtitle}
          isExpanded={expandedSections['jadual-kos'] ?? true}
          onToggle={() => onToggleSection('jadual-kos')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                <div className="flex items-center gap-2 text-[#162e43] font-bold text-base mb-4">
                  <CalendarCheck className="w-4 h-4 text-[#8c681c]" aria-hidden="true" />
                  <h3>{copy.sections.jadualKos.timelineTitle}</h3>
                </div>
                <dl className="divide-y divide-slate-200 text-sm">
                  {copy.sections.jadualKos.timeline.map((row) => (
                    <div
                      key={row.period}
                      className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                    >
                      <dt className="font-mono text-xs font-semibold text-[#8c681c] tabular-nums shrink-0">
                        {row.period}
                      </dt>
                      <dd className="text-slate-700 sm:text-right">{row.activity}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                <h3 className="text-[#162e43] font-bold text-base mb-4">
                  {copy.sections.jadualKos.investmentTitle}
                </h3>
                <dl className="divide-y divide-slate-200 text-sm">
                  {copy.sections.jadualKos.investment.map((row) => (
                    <div
                      key={row.item}
                      className="py-3.5 first:pt-1 last:pb-1 flex items-baseline justify-between gap-4"
                    >
                      <dt className="text-slate-700">{row.item}</dt>
                      <dd className="font-semibold text-[#162e43] shrink-0">{row.status}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Interactive Program Investment Estimator */}
            <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#162e43]">{estimator.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{estimator.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Interactive Controls */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      {estimator.modeLabel}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {estimator.modes.map((m) => {
                        const active = m.value === selectedMode;
                        return (
                          <button
                            key={m.value}
                            type="button"
                            onClick={() => setSelectedMode(m.value)}
                            aria-pressed={active}
                            className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-left transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#162e43] border-[#162e43] text-white'
                                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                            }`}
                          >
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      {estimator.participantsLabel}
                    </p>
                    <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 gap-1">
                      {estimator.participantOptions.map((count) => {
                        const active = count === selectedParticipants;
                        return (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setSelectedParticipants(count)}
                            aria-pressed={active}
                            className={`min-h-[38px] px-4 py-1.5 rounded-lg font-mono text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#d3ac53] text-[#162e43]'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {count}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-700">{estimator.addonsLabel}</p>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                      <input
                        type="checkbox"
                        checked={includeCustomTemplate}
                        onChange={(e) => setIncludeCustomTemplate(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#224463] cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-semibold text-[#162e43]">
                            {estimator.customTemplateLabel}
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#8c681c] tabular-nums shrink-0">
                            +RM {estimator.customTemplatePrice.toLocaleString('en-MY')}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-600">
                          {estimator.customTemplateDesc}
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300">
                      <input
                        type="checkbox"
                        checked={includeExtraClinic}
                        onChange={(e) => setIncludeExtraClinic(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#224463] cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-semibold text-[#162e43]">
                            {estimator.extraClinicLabel}
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#8c681c] tabular-nums shrink-0">
                            +RM {estimator.extraClinicPrice.toLocaleString('en-MY')}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-600">{estimator.extraClinicDesc}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Right: Live Summary Panel */}
                <div className="lg:col-span-5 bg-[#162e43] text-white rounded-xl p-6 space-y-6">
                  <div>
                    <p className="text-xs font-medium text-slate-300">{estimator.totalLabel}</p>
                    <p className="mt-1 font-mono text-3xl sm:text-4xl font-bold text-[#d3ac53] tabular-nums">
                      RM {calculatedEstimate.totalAmountRm.toLocaleString('en-MY')}
                    </p>
                  </div>

                  <dl className="divide-y divide-white/10 text-sm border-y border-white/10">
                    <div className="py-3 flex items-baseline justify-between gap-4">
                      <dt className="text-slate-300 text-xs">{estimator.perParticipantLabel}</dt>
                      <dd className="font-mono font-semibold text-white tabular-nums">
                        RM {calculatedEstimate.perParticipantRm.toLocaleString('en-MY')}
                      </dd>
                    </div>
                    <div className="py-3 flex items-baseline justify-between gap-4">
                      <dt className="text-slate-300 text-xs">{estimator.deliverableLabel}</dt>
                      <dd className="font-mono font-semibold text-white tabular-nums">
                        {selectedParticipants} {estimator.deliverableUnit}
                      </dd>
                    </div>
                  </dl>

                  <p className="text-xs text-slate-300 leading-relaxed">{estimator.disclaimer}</p>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        modeValue: calculatedEstimate.modeObj.value,
                        modeLabel: calculatedEstimate.modeObj.label,
                        participants: selectedParticipants,
                        includeCustomTemplate,
                        includeExtraClinic,
                        totalAmountRm: calculatedEstimate.totalAmountRm,
                      })
                    }
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#d3ac53] text-[#162e43] text-sm font-bold hover:bg-[#e0be6f] transition-colors cursor-pointer no-print"
                  >
                    <span>{estimator.applyButton}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      )}

      {/* 12. Soalan Lazim / FAQ */}
      {isVisible('faq') && (
        <SectionShell
          id="faq"
          number={SECTION_META[11].number}
          title={copy.sections.faq.title}
          subtitle={copy.sections.faq.subtitle}
          isExpanded={expandedSections['faq'] ?? true}
          onToggle={() => onToggleSection('faq')}
          expandLabel={copy.sectionControls.expand}
          collapseLabel={copy.sectionControls.collapse}
        >
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {copy.sections.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.question} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full min-h-[48px] py-3 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224463] rounded-lg"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#162e43]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div className={`${isOpen ? 'block' : 'hidden'} print-expand pb-4 pr-8`}>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionShell>
      )}
    </div>
  );
}
