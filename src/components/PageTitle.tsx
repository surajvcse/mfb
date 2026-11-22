import { site } from '../content/site'

export function PageTitle({ title }: { title: string }) {
  return <title>{title + ' | ' + site.name}</title>
}
