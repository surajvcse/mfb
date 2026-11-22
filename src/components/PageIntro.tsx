export function PageIntro({ label, title, description }: {
  label: string
  title: string
  description: string
}) {
  return (
    <section className="page-intro">
      <div className="site-shell">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
      </div>
    </section>
  )
}
