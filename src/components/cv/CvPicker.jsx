import { useEffect, useRef } from 'react'

import { useI18n } from '../../i18n/LanguageContext.jsx'

// `indeterminate` is a DOM property, not an attribute, so React will not set it from JSX.
function TriCheckbox({ checked, indeterminate, onChange, label, id }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-[hsl(160,95%,55%)]"
      />
      <span>{label}</span>
    </label>
  )
}

// Native fieldsets and checkboxes rather than an ARIA tree. For two levels the built-in
// widgets already give keyboard handling, the label association, the click target and the
// forms mode of a screen reader; a role="tree" with checkboxes has to reimplement all of
// it and is read inconsistently.
export default function CvPicker({ sections, items, excluded, onToggleSection, onToggleItem, onAll }) {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      {sections.map((id) => {
        const list = items[id] ?? []
        const off = Boolean(excluded[id]?.off)
        const outIds = excluded[id]?.items ?? []
        const on = list.length - outIds.length
        const allOn = !off && outIds.length === 0
        const someOn = !off && on > 0 && outIds.length > 0

        return (
          <fieldset key={id} className="rounded-2xl border border-white/8 p-4">
            <legend className="px-1 text-sm font-semibold uppercase tracking-[0.18em] text-cool">
              {t(`cv.sections.${id}`)}{' '}
              <span className="font-body normal-case tracking-normal text-cool/70">
                {off ? 0 : on}/{list.length}
              </span>
            </legend>

            <div className="flex items-center justify-between gap-3">
              <TriCheckbox
                id={`cv-section-${id}`}
                checked={allOn}
                indeterminate={someOn}
                onChange={() => onToggleSection(id)}
                label={<span className="text-sm font-medium text-ivory">{t(`cv.sections.${id}`)}</span>}
              />
              <span className="flex shrink-0 gap-2 text-xs">
                <button type="button" onClick={() => onAll(id, true)} className="text-cool hover:text-accent">
                  {t('cv.all')}
                </button>
                <span className="text-cool/40">·</span>
                <button type="button" onClick={() => onAll(id, false)} className="text-cool hover:text-accent">
                  {t('cv.none')}
                </button>
              </span>
            </div>

            <ul className="mt-3 space-y-1.5 border-t border-white/8 pt-3 text-sm text-cool">
              {list.map((item) => {
                const key = item.__key
                return (
                  <li key={key}>
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={!off && !outIds.includes(key)}
                        onChange={() => onToggleItem(id, key)}
                        className="mt-1 h-3.5 w-3.5 shrink-0 accent-[hsl(160,95%,55%)]"
                      />
                      <span>{item.__label}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        )
      })}
    </div>
  )
}
