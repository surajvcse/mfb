import { services } from '../content/site'

export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map(({ title, summary, points }) => (
        <article className="service-card" key={title}>
          <h3 className="border-l-4 border-gold pl-3 font-bold leading-tight text-ink">{title}</h3>
          <p>{summary}</p>
          <ul className="mt-4 list-disc space-y-2 border-t border-line pt-4 pl-5 marker:text-gold">
            {points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>
      ))}
    </div>
  )
}
