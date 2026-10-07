export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <header className="mb-6 pt-2 text-center md:mb-8">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-1 font-serif text-[2rem] font-semibold leading-tight text-ink md:text-4xl">{title}</h1>
      {sub && <p className="mx-auto mt-2 max-w-md text-sm text-mute">{sub}</p>}
    </header>
  )
}
