import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { EstimatorSelection, Language, ProposalCopy } from '../data/proposalContent';

interface EndorsementModalProps {
  open: boolean;
  onClose: () => void;
  copy: ProposalCopy;
  language: Language;
  estimatorPreset: EstimatorSelection | null;
}

interface SubmittedData {
  name: string;
  organization: string;
  email: string;
  modeLabel: string;
  notes: string;
  estimateSummary?: string;
}

export function EndorsementModal({
  open,
  onClose,
  copy,
  language,
  estimatorPreset,
}: EndorsementModalProps) {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState(copy.modal.modes[0]?.value ?? 'physical');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState<SubmittedData | null>(null);

  useEffect(() => {
    if (estimatorPreset) {
      setMode(estimatorPreset.modeValue);
    }
  }, [estimatorPreset]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const formatPresetText = (preset: EstimatorSelection): string => {
    const formattedRm = `RM ${preset.totalAmountRm.toLocaleString('en-MY')}`;
    if (language === 'ms') {
      return `${preset.modeLabel} · ${preset.participants} Peserta · Anggaran ${formattedRm}`;
    }
    return `${preset.modeLabel} · ${preset.participants} Participants · Est. ${formattedRm}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !organization.trim() || !email.trim()) {
      setError(copy.modal.errorRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(copy.modal.errorEmail);
      return;
    }

    const selectedMode =
      copy.modal.modes.find((m) => m.value === mode)?.label ?? mode;

    setSubmitted({
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      modeLabel: selectedMode,
      notes: notes.trim(),
      estimateSummary: estimatorPreset ? formatPresetText(estimatorPreset) : undefined,
    });
  };

  const handleResetAndClose = () => {
    setError('');
    setSubmitted(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="endorsement-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#162e43] text-white border-b border-white/10 sticky top-0">
          <div>
            <h2 id="endorsement-modal-title" className="text-lg font-bold text-white">
              {submitted ? copy.modal.successTitle : copy.modal.title}
            </h2>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              {submitted ? copy.modal.successBody : copy.modal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label={copy.modal.closeButton}
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-emerald-700">
                <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold">{copy.modal.successSummaryLabel}</span>
              </div>

              <dl className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-slate-50 text-sm">
                <div className="px-4 py-3 flex justify-between gap-4">
                  <dt className="text-slate-500">{copy.modal.nameLabel}</dt>
                  <dd className="font-semibold text-slate-900 text-right">{submitted.name}</dd>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <dt className="text-slate-500">{copy.modal.orgLabel}</dt>
                  <dd className="font-semibold text-slate-900 text-right">{submitted.organization}</dd>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <dt className="text-slate-500">{copy.modal.emailLabel}</dt>
                  <dd className="font-semibold text-slate-900 text-right">{submitted.email}</dd>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <dt className="text-slate-500">{copy.modal.modeLabel}</dt>
                  <dd className="font-semibold text-slate-900 text-right">{submitted.modeLabel}</dd>
                </div>
                {submitted.estimateSummary && (
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <dt className="text-slate-500">{copy.modal.presetBannerLabel}</dt>
                    <dd className="font-mono text-xs font-semibold text-[#162e43] text-right tabular-nums">
                      {submitted.estimateSummary}
                    </dd>
                  </div>
                )}
                {submitted.notes && (
                  <div className="px-4 py-3 space-y-1">
                    <dt className="text-slate-500">{copy.modal.notesLabel}</dt>
                    <dd className="text-slate-800">{submitted.notes}</dd>
                  </div>
                )}
              </dl>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#224463] text-white text-sm font-semibold hover:bg-[#162e43] transition-colors cursor-pointer"
                >
                  {copy.modal.closeButton}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {estimatorPreset && (
                <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <p className="font-semibold text-[#8c681c]">{copy.modal.presetBannerLabel}</p>
                  <p className="mt-1 font-mono font-semibold text-[#162e43] tabular-nums">
                    {formatPresetText(estimatorPreset)}
                  </p>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="px-4 py-3 rounded-lg bg-rose-50 border border-rose-200 text-xs sm:text-sm font-medium text-rose-800"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="req-name"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {copy.modal.nameLabel}
                </label>
                <input
                  id="req-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.modal.namePlaceholder}
                  required
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#224463]"
                />
              </div>

              <div>
                <label
                  htmlFor="req-org"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {copy.modal.orgLabel}
                </label>
                <input
                  id="req-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder={copy.modal.orgPlaceholder}
                  required
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#224463]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="req-email"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    {copy.modal.emailLabel}
                  </label>
                  <input
                    id="req-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.modal.emailPlaceholder}
                    required
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#224463]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="req-mode"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    {copy.modal.modeLabel}
                  </label>
                  <select
                    id="req-mode"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full min-h-[42px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#224463]"
                  >
                    {copy.modal.modes.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="req-notes"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {copy.modal.notesLabel}
                </label>
                <textarea
                  id="req-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={copy.modal.notesPlaceholder}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#224463]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {copy.modal.cancelButton}
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 rounded-lg bg-[#224463] text-white text-sm font-semibold hover:bg-[#162e43] transition-colors cursor-pointer"
                >
                  {copy.modal.submitButton}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
