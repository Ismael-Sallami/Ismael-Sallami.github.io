// The kicker, title and intro at the top of an inner page.
//
// The three pages had this markup copied out three times, and none of the copies had a
// backdrop: the blob is fixed behind the page, so /skills measured 1.46:1 on its intro.
// One component, on .glass-text, fixes all three and keeps them in step.
export default function PageHeader({ kicker, title, intro, children }) {
  return (
    <div className="glass-text rounded-3xl p-8 md:p-12">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        <span className="h-px w-8 bg-accent" /> {kicker}
      </p>
      <h1 className="font-display text-5xl tracking-tightest md:text-6xl">{title}</h1>
      {intro && <p className="mt-5 max-w-2xl text-lg text-cool">{intro}</p>}
      {children}
    </div>
  )
}
